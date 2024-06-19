import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false });

const QRScanner = () => {
  const [facingMode, setFacingMode] = useState('environment');

  const handleScan = (data) => {
    if (data) {
      console.log(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const flipCamera = () => {
    setFacingMode((prevFacingMode) => (prevFacingMode === 'environment' ? 'user' : 'environment'));
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <button onClick={flipCamera}>Flip Camera</button>
      <QrReader
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        constraints={{
          video: {
            facingMode: facingMode,
          },
        }}
      />
    </div>
  );
};

export default QRScanner;
