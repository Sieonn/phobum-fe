import { Layout } from '../../components/layout';
import { Text } from "../../components/text";
// import { Button } from '@/components/button';
import { KakaoLogo,Logo,Picture } from '../../assets/svg';
import { KakaoBtn, PicktureWrapper,Container } from './Intro.styled';
import { useNavigate } from 'react-router-dom';
export default function Intro() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:5001/auth/kakao';
  };

  const handleLocalLogin = () => {
    navigate('/login')
  }
  return (
    <Layout>
      <Container>
        <Text typo='title300'>나만의 포토카드 앨범⭐</Text>
        <Logo width={170} />
        <PicktureWrapper>
          <Picture width={150} style={{ marginTop: '30px' }} />
        </PicktureWrapper>
        <KakaoBtn onClick={handleKakaoLogin}>
          <KakaoLogo width={25} />
          <Text typo='subtitle200' color='black'>
          카카오로 시작하기
          </Text>
        </KakaoBtn>
        <Text typo='body100' onClick={handleLocalLogin}>
        이미 아이디가 있으신가요?
        </Text>
      </Container>
    </Layout>
  );
}
