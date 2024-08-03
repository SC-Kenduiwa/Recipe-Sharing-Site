import React from 'react';

const ServerError = ({ message }) => {
  return (
    <div className="server-error">
      <h2>Server Error</h2>
      <p>{message || 'An unexpected error occurred. Please try again later.'}</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  );
};

export default ServerError;