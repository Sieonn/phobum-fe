import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/store';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // 토큰을 localStorage에 저장
      localStorage.setItem('token', token);
      // 메인 페이지로 리다이렉트
      navigate('/signup');
      console.log(setUser)
    }
  }, [navigate, searchParams]);

  return (
    <Container>
      <Content>
        <Title>로그인 성공!</Title>
        <p>잠시만 기다려주세요...</p>

      </Content>
    </Container>
  );
};

export default LoginSuccess; 