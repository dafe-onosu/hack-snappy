import logo from './logo.svg';
import './App.css';
import WebcamCapture from './WebcamCapture';
import { useState } from 'react';

function App() {
  const [webcam, setWebcam] = useState(false);
  const handleWebcam = (value) => () => setWebcam(value);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <button onClick={handleWebcam(true)}>Snap to Shop</button>
        {webcam && <WebcamCapture />}
      </header>
    </div>
  );
}

export default App;
