import { Layout } from "../../components/layout";
import { AppBar } from "../../components/app-bar";
import { Container } from "./index.styled";
import {  Logo2 } from "../../assets/svg";
import { Text } from "../../components/text";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routes";
import axios from "axios";
import { useState } from "react";
import {PatchAuthLogin} from "../../types/user";
import { User, useStore } from "../../store/store";
import { tokenStorage } from "../../utils/tokenStorage";
import { TextStyled } from "../intro/Intro.styled";

export function Login() {
    const setUser = useStore((state) => state.setUser);
    const navigate = useNavigate();
    const handleSignup = () => { 
        navigate(ROUTE_PATHS.ONBOARDING)
    }

    const [loginerr, setLoginErr] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: "",  
        password: "",
    });

    const handleLocalLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
                email: formData.email,
                password: formData.password,
            });
    
            if (response.status === 200) {
                // ✅ 토큰 저장
                const { accessToken, refreshToken } = response.data;
                tokenStorage.setAccessToken(accessToken);
                tokenStorage.setRefreshToken(refreshToken);
    
                try {
                    // ✅ 유저 정보 불러오기
                    const { data: userData } = await axios.get<User>(
                        `${process.env.REACT_APP_API_BASE_URL}/auth/me`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
    
                    // ✅ Zustand에 유저 정보 저장
                    setUser(userData);
                    console.log("로그인 성공", userData);
    
                    alert("로그인이 완료되었습니다!");
                    navigate(ROUTE_PATHS.MAIN, { replace: true });
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    setLoginErr(true);
                    alert('사용자 정보를 가져오는데 실패했습니다.');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            setLoginErr(true)
            alert('로그인에 실패했습니다.');
        }
    };
    const isFormValid = formData.email !== '' && formData.password !== '';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PatchAuthLogin) => {

        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: e.target.value
            };

            return newData;
        });
    };

    return (
        <Layout>
            <AppBar type="back" />
            <Container>
                <div style={{display:'flex',flexDirection:'column', alignItems:'center', gap:'10px'}}>
                    <Logo2 width={150} />
                    <TextStyled>
                        포범에서 나만의 포토카드 만들고 기록해보세요.
                    </TextStyled>
                </div>
                <div style={{display:'flex',width:'100%',flexDirection:'column',gap:'10px'}}>
                    <Input 
                        label="아이디" 
                        value={formData.email}
                        onChange={(e) => handleInputChange(e, "email")}
                    />
                    <Input 
                        label="비밀번호"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange(e, "password")}
                    />
                </div>
                <div style={{display:'flex',width:'100%', flexDirection:'column', alignItems:'center', gap:'5px'}}>
                    <Button fullWidth onClick={handleLocalLogin} status={isFormValid ? 'active' : 'default'}
                     state={loginerr ? 'error' : 'default'}>로그인</Button>
                    <div style={{display:'flex',width:'100%', justifyContent:'right', marginRight:'20px', cursor:'pointer', marginTop:'7px'}}>
                        <TextStyled onClick={handleSignup}>회원가입</TextStyled>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

