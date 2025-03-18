import { Layout } from "../../components/layout";
import { AppBar } from "../../components/app-bar";
import { Container } from "./index.styled";
import { Logo } from "../../assets/svg";
import { Text } from "../../components/text";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routes";
export function Login() {
    const navigate = useNavigate();
    const handleSignup = () =>{ 
        navigate(ROUTE_PATHS.ONBOARDING)
    }
  return (
    <Layout>
      <AppBar type="back" />
      <Container>
        <div style={{display:'flex',flexDirection:'column', alignItems:'center', gap:'10px'}}>
        <Logo width={150} />
        <Text typo="title300">
          포범에서 나만의 포토카드 만들고 기록해보세요.
        </Text>
        </div>
        <div style={{display:'flex',width:'100%',flexDirection:'column',gap:'10px'}}>
        <Input label="아이디" />
        <Input label="비밀번호" />
        </div>
        <div style={{display:'flex',width:'100%', flexDirection:'column', alignItems:'center', gap:'5px'}}>
        <Button fullWidth>로그인</Button>
        <div style={{display:'flex',width:'100%', justifyContent:'right', marginRight:'20px', cursor:'pointer'}}>
            <Text typo="body100" onClick={handleSignup} >회원가입</Text>
            </div>
        </div>
      </Container>
    </Layout>
  );
}
