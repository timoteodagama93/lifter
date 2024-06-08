import { GoogleLogin } from '@react-oauth/google';
import React from 'react';

const GoogleLoginButton = () => {
  const handleSuccess = response => {
    fetch('/auth/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.tokenId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = '/avaliacoes';
        } else {
          console.error('Login failed');
        }
      });
  };

  const handleFailure = response => {
    console.error('Google login failed', response);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
