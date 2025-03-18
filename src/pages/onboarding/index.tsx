import { useState } from "react";
import { Layout } from "../../components/layout";
import { AppBar } from "../../components/app-bar";
import { Text } from "../../components/text";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Wrapper, Container } from "./index.styled";
import { PatchAuthOnboardingBody } from "../../types/user";

// STEP 정의
const STEPS = {
    ID: 1,
    PASSWORD: 2,
    NICKNAME: 3,
    COMPLETE: 4,
};

export default function Onboarding() {
    const [step, setStep] = useState(STEPS.ID); // 현재 스텝 상태 관리
    const [formData, setFormData] = useState<PatchAuthOnboardingBody>({
        id: "",
        password: "",
        nickname: "",
    }); // 입력 데이터를 관리

    const handleNextStep = () => {
        if (step < STEPS.COMPLETE) {
            setStep(step + 1); // 다음 스텝으로 이동
        }
    };

    const handleInputChange = (field: keyof PatchAuthOnboardingBody) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value, // 입력된 값을 업데이트
        }));
    };

    return (
        <Layout>
            <AppBar type="back" />
            <Wrapper>
                <Container>
                    {/* 현재 스텝에 따라 다르게 렌더링 */}
                    {step === STEPS.ID && (
                        <>
                            <Text typo="title200">아이디를 입력해주세요</Text>
                            <Input
                                label="아이디"
                                btn
                                btnName="중복검사"
                                state="default"
                                value={formData.id}
                                onChange={(e) => handleInputChange("id")(e.target.value)}
                                message="아이디를 입력하세요."
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
                                value={formData.password}
                                onChange={(e) => handleInputChange("password")(e.target.value)}
                                message="비밀번호를 입력하세요."
                            />
                        </>
                    )}
                    {step === STEPS.NICKNAME && (
                        <>
                            <Text typo="title200">닉네임을 입력해주세요</Text>
                            <Input
                                label="닉네임"
                                btn
                                btnName="중복검사"
                                state="default"
                                value={formData.nickname}
                                onChange={(e) => handleInputChange("nickname")(e.target.value)}
                                message="닉네임을 입력하세요."
                            />
                        </>
                    )}
                    {step === STEPS.COMPLETE && (
                        <>
                            <Text typo="title200">회원가입이 완료되었습니다!</Text>
                            <Text typo="body100">아이디: {formData.id}</Text>
                            <Text typo="body100">닉네임: {formData.nickname}</Text>
                        </>
                    )}
                </Container>
                <Button state="default" onClick={handleNextStep}>
                    {step === STEPS.COMPLETE ? "확인" : "다음"} {/* 마지막 스텝에서는 확인 버튼 */}
                </Button>
            </Wrapper>
        </Layout>
    );
}
