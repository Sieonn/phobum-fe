import { AppBar } from "../../components/app-bar";
import { Button } from "../../components/button";
import { Layout } from "../../components/layout";
import { Container } from "../intro/Intro.styled";
import axios from 'axios';
import { authApi } from "../../api/auth";

export function Main() {

  // 회원 탈퇴 처리
  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
    if (!token) {
      alert('로그인이 필요합니다!');
      return;
    }

    try {
      // 탈퇴 요청을 보낼 때 Authorization 헤더에 Bearer 토큰 추가
      const response = await axios.delete('http://localhost:5001/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // 탈퇴 성공 시 로컬 스토리지에서 토큰 삭제하고, 로그인 페이지로 리다이렉트
        localStorage.removeItem('token');
        alert('회원 탈퇴가 완료되었습니다.');
      }
    } catch (error) {
      console.error('회원 탈퇴 오류:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
    alert('로그아웃 되었습니다.');
  };

  return (
    <Layout>
      <AppBar type="default" />
      <Container>
        {/* <h1>Main</h1> */}
        <Button onClick={handleLogout}>로그아웃</Button>
        <Button onClick={handleDelete}>회원 탈퇴</Button>
      </Container>
    </Layout>
  );
}
