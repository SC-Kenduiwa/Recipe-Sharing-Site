import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back
      </button>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.errorMessage}>NOT FOUND</h2>
      <p style={styles.errorDescription}>The resource requested could not be found</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '490px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    position: 'relative',
  },
  errorCode: {
    fontSize: '120px',
    fontWeight: 'bold',
    margin: '0',
    color: '#ff5733', 
  },
  errorMessage: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0',
    marginTop: '10px',
  },
  errorDescription: {
    fontSize: '18px',
    margin: '0',
    marginTop: '20px',
  },
};

export default NotFound;