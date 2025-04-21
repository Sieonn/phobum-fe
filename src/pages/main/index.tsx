import { AppBar } from "../../components/app-bar";
import { Button } from "../../components/button";
import { Layout } from "../../components/layout";
import { Container } from "../intro/Intro.styled";
import axios from 'axios';
import { useStore } from "../../store/store";


export function Main() {
  const user = useStore((state) => state.user);
  console.log('현재 유저 상태:', user);
  // 회원 탈퇴 처리
  const handleDelete = async () => {
    const token = sessionStorage.getItem('refreshToken'); // 로컬 스토리지에서 토큰 가져오기
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
        sessionStorage.removeItem('refreshToken');
        alert('회원 탈퇴가 완료되었습니다.');
      }
    } catch (error) {
      console.error('회원 탈퇴 오류:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');

    alert('로그아웃 되었습니다.');
  };

  return (
    <Layout>
      <AppBar type="default" />
      <Container>
        {/* <h1>Main</h1> */}
        <h1>{user?.nickname}어서오세요</h1>
        <Button onClick={handleLogout}>로그아웃</Button>
        <Button onClick={handleDelete}>회원 탈퇴</Button>
      </Container>
    </Layout>
  );
}
