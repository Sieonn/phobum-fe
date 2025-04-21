import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/store';
import styled from 'styled-components';
import axios from 'axios';
import {ROUTE_PATHS} from '../constants/routes';
import {TokenResponse} from '../types/token/index';
import { User } from '../store/store';
import { tokenStorage } from '../utils/tokenStorage';
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
  // useEffect(() => {
  //   const checkUserAndRedirect = async () => {
  //       try {
  //           // Get tokens from URL params
  //           const accessToken = searchParams.get('accessToken');
  //           const refreshToken = searchParams.get('refreshToken');

  //           if (!accessToken || !refreshToken) {
  //               throw new Error('토큰이 없습니다');
  //           }

  //           // Store tokens
  //           tokenStorage.setAccessToken(accessToken);
  //           tokenStorage.setRefreshToken(refreshToken);

  //                   // Navigate to onboarding with tokens
  //       navigate(ROUTE_PATHS.ONBOARDING, {
  //         replace: true,
  //         state: { 
  //           social: 'kakao',
  //           accessToken,
  //           refreshToken
  //         }
  //       });
  //     } catch (error) {
  //       console.error('사용자 확인 중 오류 발생:', error);
  //       navigate(ROUTE_PATHS.LOGIN);
  //     }
  //   };

  //   checkUserAndRedirect();
  // }, [navigate, searchParams, setUser]);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      try {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const isNewUser = searchParams.get('isNewUser') === 'true';
  
        if (!accessToken || !refreshToken) {
          throw new Error('토큰이 없습니다');
        }
  
        tokenStorage.setAccessToken(accessToken);
        tokenStorage.setRefreshToken(refreshToken);
        // ✅ 유저 정보 불러오기
        const { data } = await axios.get<User>(
          `http://localhost:5001/auth/me`, // 👈 유저 정보 API 필요
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        // ✅ Zustand에 유저 정보 저장
        setUser(data);
        if (isNewUser) {
          navigate(ROUTE_PATHS.ONBOARDING, {
            replace: true,
            state: {
              social: 'kakao',
              accessToken,
              refreshToken,
            },
          });
        } else {
          // 이미 회원인 경우 -> 홈이나 원하는 메인 페이지로 이동
          navigate(ROUTE_PATHS.MAIN, { replace: true });
        }
      } catch (error) {
        console.error('사용자 확인 중 오류 발생:', error);
        navigate(ROUTE_PATHS.LOGIN);
      }
    };
  
    checkUserAndRedirect();
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