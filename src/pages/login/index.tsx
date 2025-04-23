import { Layout } from "../../components/layout";
import { AppBar } from "../../components/app-bar";
import { Container } from "./index.styled";
import { Logo } from "../../assets/svg";
import { Text } from "../../components/text";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routes";
import axios from "axios";
import { useState } from "react";
import {PatchAuthLogin} from "../../types/user";
import { useStore } from "../../store/store";

export function Login() {
    const setUser = useStore((state) => state.setUser);
    const navigate = useNavigate();
    const handleSignup = () => { 
        navigate(ROUTE_PATHS.ONBOARDING)
    }

    const [formData, setFormData] = useState({
        email: "",  
        password: "",
    });

    const handleLocalLogin = async () => {
        try {
            const response = await axios.post(`${process.env.BASE_URLREACT_APP_API_BASE_URL}/auth/login`, {
                email: formData.email,
                password: formData.password,
            });
    
            if (response.status === 200) {
                // ✅ 토큰 저장
                const { accessToken, refreshToken, ...userData } = response.data;
    
                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("refreshToken", refreshToken);
    
                // ✅ 유저 상태 저장
                setUser(userData);
    
                alert("로그인이 완료되었습니다!");
                navigate(ROUTE_PATHS.MAIN);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('로그인에 실패했습니다.');
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PatchAuthLogin) => {
        console.log('Input Change:', field, e.target.value);
        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: e.target.value
            };
            console.log('Updated formData:', newData);
            return newData;
        });
    };

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
                    <Button fullWidth onClick={handleLocalLogin}>로그인</Button>
                    <div style={{display:'flex',width:'100%', justifyContent:'right', marginRight:'20px', cursor:'pointer'}}>
                        <Text typo="body100" onClick={handleSignup}>회원가입</Text>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

