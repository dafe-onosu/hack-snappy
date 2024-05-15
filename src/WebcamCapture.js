import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Buffer } from 'buffer';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const aiUrl =
    'https://snapproducts-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/6a466acc-1ce5-4c04-ba56-f3308baa23de/classify/iterations/Iteration3/image';

  const mnsUrl = 'https://www.marksandspencer.com/';

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    facingMode: { exact: 'environment' },
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64String2 = imageSrc.split(',')[1];
    const imageData = Buffer.from(base64String2, 'base64');
    try {
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
        console.log('probability', probability);
        console.log('tagName', tagName);
        if (probability > 0.5) {
          window.location.href = `${mnsUrl}${tagName}`;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setImageSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={640}
        height={480}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {imageSrc && (
        <div>
          <h2>Captured Image:</h2>
          <img src={imageSrc} alt='Captured' />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
