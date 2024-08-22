import React from 'react';
// Common loader component for the app
const Spinner: React.FC = () => {
  return (
    <>
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Spinner;