import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/store';
import styled from 'styled-components';
import axios from 'axios';

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
    const checkUserAndRedirect = async (token: string) => {
      try {
        // 토큰을 localStorage에 저장
        localStorage.setItem('token', token);

        // 사용자 정보 확인 요청
        const response = await axios.get('http://localhost:5001/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.nickname) {
          // 닉네임이 있으면 로그인 완료 처리
          setUser(response.data);
          navigate('/login');
        } else {
          // 닉네임이 없으면 온보딩으로
          navigate('/onboarding?social=kakao');
        }
      } catch (error) {
        console.error('사용자 확인 중 오류 발생:', error);
        navigate('/login');
      }
    };

    const token = searchParams.get('token');
    if (token) {
      checkUserAndRedirect(token);
    }
  }, [navigate, searchParams, setUser]);

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