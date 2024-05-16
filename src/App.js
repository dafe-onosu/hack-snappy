import logoMS from "./logoMS.svg";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import { useState } from "react";

function App() {
  const [webcam, setWebcam] = useState(false);
  const handleWebcam = (value) => () => setWebcam(value);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoMS} alt="Marks & Spencer logo" />
      </header>
      <div>
        {webcam ? (
          <WebcamCapture />
        ) : (
          <div>
            <p
              style={{
                fontSize: "1.2em",
                fontFamily: "Georgia, serif",
              }}
            >
              Seen something you like? <br />
              Search for it with snap
            </p>
            <button onClick={handleWebcam(true)} className="SnapButton" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
