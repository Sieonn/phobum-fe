import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/store';
import styled from 'styled-components';
import axios from 'axios';
import {ROUTE_PATHS} from '../constants/routes';
import {TokenResponse} from '../types/token/index';
import { User } from '../store/store';
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

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    const checkUserAndRedirect = async (accessToken: string, refreshToken: string) => {
      try {
        console.log('Received tokens:', { accessToken, refreshToken }); // 디버깅

        // 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 사용자 정보 확인 요청
        const response = await axios.get<TokenResponse>('http://localhost:5001/auth/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.data.nickname) {

          const userData: User = {
            id: response.data.id,
            nickname: response.data.nickname, 
            email: response.data.email,
            provider: response.data.provider
          };

          setUser(userData);
          navigate(ROUTE_PATHS.MAIN, { replace: true });
        } else {
          navigate(ROUTE_PATHS.ONBOARDING, {
            replace: true,
            state: { social: 'kakao' }
          });
        }
      } catch (error) {
        console.error('사용자 확인 중 오류 발생:', error);
        navigate(ROUTE_PATHS.LOGIN);
      }
    };

    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      checkUserAndRedirect(accessToken, refreshToken);
    } else {
      console.error('토큰이 전달되지 않았습니다.');
      navigate(ROUTE_PATHS.LOGIN);
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