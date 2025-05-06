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
import Modal from "../../components/modal";  // 모달 컴포넌트 가져오기

export default function ImageUpload() {
  const user = useStore();
  const navigate = useNavigate();

  const {
    file,
    previewUrl,
    handleFileSelect,
    convertToWebP,
    reset,
  } = useImageUpload({ onBeforeUnload: true });

  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: user?.user?.nickname || "",
  });
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const [isFormDirty, setIsFormDirty] = useState(false); // 작성 중인지 여부 체크

  const isFormValid = formData.title !== '' && formData.description !== '';

  const handleFormChange = (data: typeof formData) => {
    setFormData(data);
    setIsFormDirty(data.title !== '' || data.description !== '' || file !== null); // 작성 중이면 true
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
      reset(); // 초기화
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

  // 뒤로가기 처리 함수 (작성 중이면 모달 띄우기)
  const handleBackWithConfirm = () => {
    if (isFormDirty) {
      setModalOpen(true);  // 작성 중일 때 모달 열기
    } else {
      navigate(-1); // 아무것도 작성 안했으면 그냥 뒤로가기
    }
  };

  const handleConfirmLeave = () => {
    setModalOpen(false);
    navigate(-1); // 뒤로가기
  };

  const handleCancelLeave = () => {
    setModalOpen(false); // 모달 닫기
  };

  return (
    <Layout>
      <AppBar type="back" onBack={handleBackWithConfirm} />
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
      {/* 모달 렌더링 */}
      {modalOpen && (
        <Modal
          title="작성 중인 내용이 사라집니다"
          description="정말 나가시겠습니까?"
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
        />
      )}
    </Layout>
  );
}
