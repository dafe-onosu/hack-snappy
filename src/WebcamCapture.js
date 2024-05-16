import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Buffer } from 'buffer';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [redirectResult, setRedirectResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const aiUrl =
    'https://snapproducts-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/6a466acc-1ce5-4c04-ba56-f3308baa23de/classify/iterations/Iteration2/image';

  const mnsUrl = 'https://www.marksandspencer.com/';

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    facingMode: 'user',
  };

  const captureImage = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64String2 = imageSrc.split(',')[1];
    const imageData = Buffer.from(base64String2, 'base64');
    try {
      setIsLoading(true);
      const response = await fetch(aiUrl, {
        method: 'POST',
        headers: {
          'Prediction-Key': '1e28d38b71864d9d916683623be7aea6',
          'Content-Type': 'application/octet-stream',
        },
        body: imageData,
      });
      const data = await response.json();
      console.log('Success:', data);

      if (data.predictions.length > 0) {
        const prediction = data.predictions[0];
        const probability = prediction.probability;
        const tagName = prediction.tagName;
        console.log('tagName', tagName);
        console.log('probability', probability);

        setIsLoading(false);
        if (probability < 0.9) {
          setRedirectResult(true);
        } else {
          window.location.href = `${mnsUrl}${tagName}`;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [webcamRef]);

  return (
    <>
      {isLoading ? (
        <div style={{ color: '#000', marginLeft: '30px', marginRight: '30px' }}>
          <p>Loading...</p>
        </div>
      ) : redirectResult ? (
        <div style={{ color: '#000', marginLeft: '30px', marginRight: '30px' }}>
          <p>
            We don't have the perfect match for you, kindly check{' '}
            <a href={mnsUrl}>www.marksandspencer.com</a> for more options.
          </p>
        </div>
      ) : (
        <div style={{ margin: '0px auto' }}>
          <div style={{ margin: '0px auto' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              width={640}
              height={480}
              videoConstraints={videoConstraints}
              className='WebcamCapture'
            />
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ margin: '0px auto' }}>
              <button onClick={captureImage} className='SearchButton' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebcamCapture;
