import React from "react";

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingOverlay;
