import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={textStyle}>&copy; 2024 Car Rental System</p>
        <div style={infoStyle}>
          <p style={infoTextStyle}>Harsh Srivastava</p>
          <p style={infoTextStyle}>Email: harshideal2002@gmail.com</p>
          <p style={infoTextStyle}>Phone: 9696585355</p>
          <p style={infoTextStyle}>MERN Developer</p>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#20232a', // React's default dark background
  color: '#61dafb', // React's default light text color
  padding: '20px',
  textAlign: 'center',
  position: 'absolute',
  bottom: '0',
  borderRadius:'3px 3px ',
  width: '100%',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const textStyle = {
  margin: '0',
  fontSize: '16px',
};

const infoStyle = {
  marginTop: '10px',
};

const infoTextStyle = {
  margin: '5px 0',
  fontSize: '14px',
};

export default Footer;
