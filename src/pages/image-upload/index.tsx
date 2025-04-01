import { useState } from "react";
import { PlusIcon } from "./index.styled";  // Plus 아이콘 import
import { AppBar } from "../../components/app-bar";
import { Button } from "../../components/button";
import { Layout } from "../../components/layout";
import { Text } from "../../components/text";
import Form from "./componets/form";
import { Container, ImgaeUpload, UploadContainer } from "./index.styled";

export default function ImageUpload() {
    const [file, setFile] = useState<File | null>(null);  // 상태 타입을 File | null로 설정
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);  // 미리보기 URL 상태 타입 설정

    // e의 타입을 React.ChangeEvent<HTMLInputElement>로 명시
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;  // 파일이 없으면 null로 처리

        if (selectedFile) {
            setFile(selectedFile);  // 파일이 있을 때만 상태를 업데이트
            const preview = URL.createObjectURL(selectedFile);  // 미리보기 URL 생성
            setPreviewUrl(preview);
        } else {
            setFile(null);  // 파일이 없으면 상태를 null로 초기화
            setPreviewUrl(null);  // 미리보기도 초기화
        }
    };

    return (
        <Layout>
            <AppBar type="default" />
            <Container>
                <Text typo="title200">나만의 카드 만들기</Text>
                <section>
                    <UploadContainer>
                        <ImgaeUpload>
                            {/* input을 숨기고, label을 클릭하면 파일 선택 창이 열리게 함 */}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}  // 기본 input 숨기기
                                id="file-input"  // 파일 선택 input의 id
                            />
                            {/* label을 클릭하면 input의 파일 선택 창이 열리게 처리 */}
                            <label htmlFor="file-input">
                                {/* 이미지가 있으면 이미지 표시, 없으면 Plus 아이콘 표시 */}
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="미리보기 이미지"
                                        style={{
                                            width: '100%',  // 이미지를 ImgaeUpload 크기만큼 맞추기
                                            height: '100%',
                                            objectFit: 'cover',  // 비율 유지하며 잘림 방지
                                            cursor:'pointer',
                                        }}
                                    />
                                ) : (
                                    <PlusIcon width={90} />
                                )}
                            </label>
                        </ImgaeUpload>
                    </UploadContainer>
                </section>
                <section>
                    <Form />
                </section>
                <Button>제작하기</Button>
            </Container>
        </Layout>
    );
}
