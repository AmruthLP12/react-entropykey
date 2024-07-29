// src/components/EntropyKey.js
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import '../Styles/EntropyKey.css';

const EntropyKey = () => {
  const [token, setToken] = useState('');
  const videoRef = useRef(null);
  const tokenOutputRef = useRef(null);

  const generateTokenFromVideo = async (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:",.<>?/~`';
    let token = '';

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = videoRef.current;
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    for (let i = 0; i < length; i++) {
      const randomIndex = imageData[i % imageData.length];
      token += characters[randomIndex % characters.length];
    }

    stream.getTracks().forEach(track => track.stop());

    return token;
  };

  const handleGenerateToken = async () => {
    const tokenLength = 16;
    const newToken = await generateTokenFromVideo(tokenLength);
    setToken(newToken);
  };

  const handleCopyToken = () => {
    tokenOutputRef.current.select();
    document.execCommand('copy');
    alert('Token copied to clipboard');
  };

  return (
    <>
    <style>{`
       body {
    background-color: #f8f9fa;
    font-family: Arial, sans-serif;
}

.container {
    max-width: 600px;
}

.card {
    border-radius: 8px;
}

.card-title {
    margin-bottom: 20px;
}

#generateTokenBtn {
    font-size: 16px;
}

#tokenContainer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-group {
    width: 100%;
}

#tokenOutput {
    font-size: 16px;
}

#copyIcon {
    cursor: pointer;
}

.description {
    text-align: left;
}

.description h2 {
    margin-bottom: 15px;
}

      `}</style>
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body text-center">
          <h1 className="card-title text-primary">EntropyKey</h1>
          <video id="video" ref={videoRef} autoPlay className="d-none"></video>
          <button id="generateTokenBtn" className="btn btn-primary mt-3" onClick={handleGenerateToken}>
            Generate Token
          </button>
          <div id="tokenContainer" className={`mt-3 ${token ? '' : 'd-none'}`}>
            <div className="input-group">
              <input type="text" id="tokenOutput" className="form-control" value={token} readOnly ref={tokenOutputRef} />
              <div className="input-group-append">
                <button id="copyIcon" className="btn btn-outline-secondary" title="Copy Token" onClick={handleCopyToken}>
                  <i className="bi bi-clipboard"></i>
                </button>
              </div>
            </div>
          </div>
          {/* <div className="description mt-4">
            <h2 className="text-primary">How It Works</h2>
            <p>
              This tool generates a unique token by using the camera on your device. The randomness in the video feed helps create a secure and unpredictable token. This makes it great for creating passwords or other secure identifiers.
            </p>
          </div> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default EntropyKey;
