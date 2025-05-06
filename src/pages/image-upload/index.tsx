import { useState } from "react";
import { PlusIcon } from "./index.styled";
import { AppBar } from "../../components/app-bar";
import { Layout } from "../../components/layout";
import Form from "./componets/form";
import { Container, ImgaeUpload, UploadContainer } from "./index.styled";
import { useStore } from "../../store/store";
import { imagesApi } from "../../api/images";
import { ImageUploadRequest } from "../../api/images/types";
import { useNavigate } from "react-router-dom";
import Gnb from "../../components/gnb";
import { TextStyled } from "../intro/Intro.styled";
import { colors } from "../../styles/colors";
import { useImageUpload } from "../../hooks/useImageUpload";

export default function ImageUpload() {
  const user = useStore();
  const navigate = useNavigate();

  const {
    file,
    previewUrl,
    handleFileSelect,
    convertToWebP,
    reset,
  } = useImageUpload({ onBeforeUnload: true }); // ✅ 훅 사용

  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: user?.user?.nickname || "",
  });

  const isFormValid = formData.title !== '' && formData.description !== '';

  const handleFormChange = (data: typeof formData) => {
    setFormData(data);
  };

  const handleSubmit = async () => {
    if (isUploading) return;
    if (!file) return alert('이미지를 선택해주세요.');
    if (!isFormValid) return alert('제목과 설명을 입력해주세요.');

    try {
      setIsUploading(true);
      const webpFile = await convertToWebP(file);

      const imageData: ImageUploadRequest = {
        image: webpFile,
        title: formData.title,
        description: formData.description,
      };

      await imagesApi.upload(imageData);
      alert("이미지가 성공적으로 업로드되었습니다.");
      reset(); // ✅ 초기화
      setFormData({
        title: "",
        description: "",
        author: user?.user?.nickname || "",
      });
      navigate("/album");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <AppBar type="back" />
      <Container>
        <TextStyled style={{ fontSize: '1.25rem', fontWeight: '500' }}>
          나만의 <span style={{ color: colors.neon100 }}>카드</span> 만들기
        </TextStyled>
        <section style={{ width: '100%' }}>
          <UploadContainer>
            <ImgaeUpload>
              <input
                type="file"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                id="file-input"
                accept="image/*,.webp"
              />
              <label htmlFor="file-input" style={{
                width: '100%', height: '100%', display: 'flex',
                justifyContent: 'center', alignItems: 'center', cursor: "pointer"
              }}>
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
                  <PlusIcon width={65} />
                )}
              </label>
            </ImgaeUpload>
          </UploadContainer>
        </section>
        <section style={{ width: '100%' }}>
          <Form onChange={handleFormChange} initialData={formData} />
        </section>
      </Container>
      <Gnb
        onClick={handleSubmit}
        name={isUploading ? "업로드 중..." : "제작하기"}
        status={isFormValid && !isUploading ? 'active' : 'default'}
      />
    </Layout>
  );
}
