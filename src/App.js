
import logoMS from './logoMS.svg';
import './App.css';
import WebcamCapture from './WebcamCapture';
import { useState } from 'react';

function App() {
  const [webcam, setWebcam] = useState(false);
  const handleWebcam = (value) => () => setWebcam(value);
  return (
    <div className='App'>
      <header className='App-header'>
      <img src={logoMS} alt="Marks & Spencer logo" />
     
        {webcam ? <WebcamCapture /> :
           <button onClick={handleWebcam(true)}>Snap to Shop</button> 
      }
      </header>
    </div>
  );
}

export default App;
