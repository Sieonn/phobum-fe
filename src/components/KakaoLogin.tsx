import React from 'react';
import styled from 'styled-components';

const LoginButton = styled.button`
  background-color: #FEE500;
  color: black;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #E6CF00;
  }
`;

const KakaoLogin = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/kakao`;
  };

  return (
    <LoginButton onClick={handleLogin}>
      카카오 로그인
    </LoginButton>
  );
};

export default KakaoLogin; 