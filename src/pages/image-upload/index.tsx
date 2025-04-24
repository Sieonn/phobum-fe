import { useState } from "react";
import { PlusIcon } from "./index.styled";
import { AppBar } from "../../components/app-bar";
import { Button } from "../../components/button";
import { Layout } from "../../components/layout";
import { Text } from "../../components/text";
import Form from "./componets/form";
import { Container, ImgaeUpload, UploadContainer } from "./index.styled";
import { useStore } from "../../store/store";
import { imagesApi } from "../../api/images";
import { ImageUploadRequest } from "../../api/images/types";
import { useNavigate } from "react-router-dom";
import Gnb from "../../components/gnb";
import { Image2 } from "../../assets/svg";

export default function ImageUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: ""
    });

    const user = useStore();
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;

        if (selectedFile) {
            setFile(selectedFile);
            const preview = URL.createObjectURL(selectedFile);
            setPreviewUrl(preview);
        } else {
            setFile(null);
            setPreviewUrl(null);
        }
    };

    const handleFormChange = (data: { title: string; description: string; author: string }) => {
        setFormData(data);
    };
    const isFormValid = formData.title !== '' && formData.description !== '';

    const handleSubmit = async () => {
        if (!file) {
            alert('이미지를 선택해주세요.');
            return;
        }
    
        if (!formData.title || !formData.description) {
            alert('제목과 설명을 입력해주세요.');
            return;
        }
    
        try {
            const imageData: ImageUploadRequest = {
                image: file,
                title: formData.title,
                description: formData.description
            };
    
            const response = await imagesApi.upload(imageData);
            
            // 성공 후 초기화
            setFile(null);
            setPreviewUrl(null);
            setFormData({
                title: "",
                description: "",
                author: ""
            });
            
            alert('이미지가 성공적으로 업로드되었습니다.');
            navigate('/album');
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <Layout>
            <AppBar type="default" />
            <Container>
                <Text typo="subtitle100">나만의 카드 만들기</Text>
                <section style={{width: '100%'}}>
                    <UploadContainer>
                        <ImgaeUpload>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="file-input"
                                accept="image/*"
                            />
                            <label 
                                htmlFor="file-input"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="미리보기 이미지"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                        }}
                                    />
                                ) : (
                                    <Image2 width={65} />
                                )}
                            </label>
                        </ImgaeUpload>
                    </UploadContainer>
                </section>
                <section style={{width: '100%'}}>
                    <Form onChange={handleFormChange} initialData={formData} />
                </section>
            </Container>
                <Gnb onClick={handleSubmit} name="제작하기" status={isFormValid?'active':'default'}/>
        </Layout>
    );
}