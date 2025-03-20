import { useState } from "react";
import { Layout } from "../../components/layout";
import { AppBar } from "../../components/app-bar";
import { Text } from "../../components/text";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Wrapper, Container } from "./index.styled";
import { PatchAuthOnboardingBody } from "../../types/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// STEP 정의
const STEPS = {
    EMAIL: 1,
    PASSWORD: 2,
    NICKNAME: 3,
    COMPLETE: 4,
};

export default function Onboarding() {
    const [step, setStep] = useState(STEPS.EMAIL); // 현재 스텝 상태 관리
    const [formData, setFormData] = useState<PatchAuthOnboardingBody>({
        email: "",
        password: "",
        nickname: "",
    }); // 입력 데이터를 관리
    const [emailError, setEmailError] = useState<string>(""); // 이메일 중복 에러
    const [nicknameError, setNicknameError] = useState<string>(""); // 닉네임 중복 에러
    const [emailAvailable, setEmailAvailable] = useState<boolean>(true); // 이메일 사용 가능 여부
    const [nicknameAvailable, setNicknameAvailable] = useState<boolean>(true); // 닉네임 사용 가능 여부

    const navigate = useNavigate();
    const handleNextStep = async () => {
        console.log("Form Data Before Next Step:", formData); // formData 상태 확인
        if (step === STEPS.COMPLETE) {
            try {
                // 마지막 단계에서 회원가입 요청 보내기
                const response = await axios.post("http://localhost:5001/auth/signup", formData);
                if (response.status === 201) {
                    // 회원가입 성공 시, 리다이렉트 또는 추가 처리
                    alert("회원가입이 완료되었습니다!");
                    navigate("/login"); // 로그인 페이지로 이동
                }
            } catch (error) {
                console.error("회원가입 오류:", error);
                alert("회원가입 중 오류가 발생했습니다.");
            }
        } else {
            setStep(step + 1); // 다음 스텝으로 이동
        }
    };

    // 이메일 중복 체크
    const handleIdCheck = async () => {
        console.log("이메일 중복 체크", formData.email);
        try {
            const response = await axios.post("http://localhost:5001/auth/check-email", {
                email: formData.email,
            });
            if (response.data.isAvailable) {
                setEmailError(""); // 중복되지 않으면 에러 메시지 초기화
                setEmailAvailable(true);
                setEmailError("사용가능한 아이디예요")
            } else {
                setEmailError("이미 존재하는 이메일입니다.");
                setEmailAvailable(false);
            }
        } catch (error) {
            setEmailError("중복된 아이디예요ㅠ_ㅠ");
            setEmailAvailable(false);
        }
    };

    // 닉네임 중복 체크
    const handleNicknameCheck = async () => {
        try {
            const response = await axios.post("http://localhost:5001/auth/check-nickname", {
                nickname: formData.nickname,
            });

            if (response.data.isAvailable) {
                setNicknameError("사용가능한 닉네임이에요"); // 중복되지 않으면 에러 메시지 초기화
                setNicknameAvailable(true);
            } else {
                setNicknameError("이미 존재하는 닉네임입니다.");
                setNicknameAvailable(false);
            }
        } catch (error) {
            console.error("닉네임 중복 확인 오류:", error);
            alert("닉네임 중복 확인 오류가 발생했습니다.");
            setNicknameAvailable(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PatchAuthOnboardingBody) => {
        console.log('Input Change:', field, e.target.value); // 디버깅용 로그 추가
        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: e.target.value
            };
            console.log('Updated formData:', newData); // 디버깅용 로그 추가
            return newData;
        });
    };

    // 각 스텝별 메시지를 설정
    const getMessageForStep = () => {
        if (step === STEPS.EMAIL) {
            return emailError || "아이디를 입력하세요."; // 이메일 오류 또는 기본 메시지
        }
        if (step === STEPS.PASSWORD) {
            return "비밀번호를 입력하세요."; // 비밀번호 기본 메시지
        }
        if (step === STEPS.NICKNAME) {
            return nicknameError || "닉네임을 입력하세요."; // 닉네임 오류 또는 기본 메시지
        }
        return ""; // 마지막 단계는 메시지가 없으므로 빈 문자열
    };

    return (
        <Layout>
            <AppBar type="back" />
            <Wrapper>
                <Container>
                    {/* 현재 스텝에 따라 다르게 렌더링 */}
                    {step === STEPS.EMAIL && (
                        <>
                            <Text typo="title200">아이디를 입력해주세요</Text>
                            <Input
                                label="아이디"
                                state={emailError && !emailAvailable ? "error" : "default"}
                                value={formData.email}
                               onChange={(e) => {
        console.log('Email Change:', e.target.value); // 디버깅용 로그 추가
        handleInputChange(e, "email");
      }}
                                message={getMessageForStep()}
                                suffix={
                                    <Button
                                        size="s"
                                        state={emailError && !emailAvailable ? "error" : "default"}
                                        onClick={handleIdCheck}
                                        disabled={!formData.email} // 이메일이 비어있으면 버튼 비활성화
                                    >
                                        중복검사
                                    </Button>
                                }
                            />
                        </>
                    )}
                    {step === STEPS.PASSWORD && (
                        <>
                            <Text typo="title200">비밀번호를 입력해주세요</Text>
                            <Input
                                label="비밀번호"
                                state="default"
                                type="password"
                                value={formData.password} // formData의 값이 제대로 연결되는지 확인
                                onChange={(e) => handleInputChange(e, "password")} // handleInputChange 호출
                                message={getMessageForStep()}
                            />
                        </>
                    )}
                    {step === STEPS.NICKNAME && (
                        <>
                            <Text typo="title200">닉네임을 입력해주세요</Text>
                            <Input
                                label="닉네임"
                                state={nicknameError && !nicknameAvailable ? "error" : "default"}
                                value={formData.nickname} // formData의 값이 제대로 연결되는지 확인
                                onChange={(e) => handleInputChange(e, "nickname")} // handleInputChange 호출
                                message={getMessageForStep()}
                                suffix={
                                    <Button
                                        size="s"
                                        state="default"
                                        onClick={handleNicknameCheck}
                                        disabled={!formData.nickname} // 닉네임이 비어있으면 버튼 비활성화
                                    >
                                        중복검사
                                    </Button>
                                }
                            />
                        </>
                    )}
                    {step === STEPS.COMPLETE && (
                        <>
                            <Text typo="title200">회원가입이 완료되었습니다!</Text>
                            <Text typo="body100">아이디: {formData.email}</Text>
                            <Text typo="body100">닉네임: {formData.nickname}</Text>
                        </>
                    )}
                </Container>
                <Button
                    state={emailError && !emailAvailable ? "error" : "default"}
                    onClick={handleNextStep}
                    disabled={
                        (step === STEPS.EMAIL && !emailAvailable) ||
                        (step === STEPS.NICKNAME && !nicknameAvailable)
                    }
                >
                    {step === STEPS.COMPLETE ? "확인" : "다음"} {/* 마지막 스텝에서는 확인 버튼 */}
                </Button>
            </Wrapper>
        </Layout>
    );
}