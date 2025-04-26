import { Layout } from '../../components/layout';
import { KakaoLogo,Logo2,Picture } from '../../assets/svg';
import { KakaoBtn, PicktureWrapper,Container, TextStyled, TextStyled2 } from './Intro.styled';
import { useNavigate } from 'react-router-dom';
export default function Intro() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/kakao`;
  };

  const handleLocalLogin = () => {
    navigate('/login')
  }
  return (
    <Layout>
      <Container>
        <Logo2  width={170}/>
        <PicktureWrapper>
          <Picture width={150} style={{ marginTop: '30px' }} />
        </PicktureWrapper>
        <KakaoBtn onClick={handleKakaoLogin}>
          <KakaoLogo width={25} />
          <TextStyled style={{color: '#392020', fontSize:'1rem', fontWeight:'600'}}>
          카카오로 시작하기
          </TextStyled>
        </KakaoBtn>
        <TextStyled2 onClick={handleLocalLogin} style={{cursor:'pointer'}}>
        이미 아이디가 있으신가요?
        </TextStyled2>
      </Container>
    </Layout>
  );
}
