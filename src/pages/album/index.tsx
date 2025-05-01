import { useState, useEffect, useCallback } from "react";
import { ImageResponse, imagesApi } from "../../api/images";
import { AppBar } from "../../components/app-bar";
import { Layout } from "../../components/layout";
import { InteractiveCard } from "./components/InteractiveCard";
import styled from "styled-components";
import FloatingButton from "../../components/fab";
import { TextStyled } from "../intro/Intro.styled";
import { colors } from "../../styles/colors";
import CardDetail from "./components/card-detail";
import { useStore } from "../../store/store";


export default function Album() {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageResponse | null>(null); // ⭐ 선택된 이미지
  const [isDetailOpen, setIsDetailOpen] = useState(false); // ⭐ 모달 열림 여부

  const user = useStore((state) => state.user);

  const currentUserId = user?.id ? String(user.id) : undefined;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await imagesApi.getList();
        setImages(response.data);
      } catch (err: any) {
        setError("이미지 목록을 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleCardClick = (image: ImageResponse) => {
    setSelectedImage(image);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);   // 모달 닫기
    setSelectedImage(null);   // 선택된 이미지 초기화
  };

  const handleDelete = useCallback(async (id: string) => {
    try {
      await imagesApi.delete(id);
      alert("삭제되었습니다.");
      // 이미지 목록 새로고침
      setImages(prev => prev.filter(img => img.id !== id))
      // 모달 닫기
      closeDetail();
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  }, []);
  
  const handleImageEdit = useCallback((updatedImage: ImageResponse) => {
    setImages(prevImages => 
      prevImages.map(img => 
        img.id === updatedImage.id ? updatedImage : img
      )
    );
    
    // 선택된 이미지도 업데이트
    if (selectedImage?.id === updatedImage.id) {
      setSelectedImage(updatedImage);
    }
  }, [selectedImage]);

  if (error) return <div>{error}</div>;
  if (loading) return <div>로딩 중...</div>;

  return (
    <Layout>
      <AppBar type="default" />
      <Container>
        {images.length === 0 ? (
          <EmptyState>
            <TextStyled style={{fontSize:'1.25rem', fontWeight:'600'}}>
              아직 만든 <span style={{color:`${colors.neon100}`}}>카드</span>가 없어요!
            </TextStyled>
            <TextStyled >
              하단의 <span style={{color:`${colors.neon100}`}}>+</span> 버튼을 눌러 첫 번째 카드를 만들어보세요
            </TextStyled>
          </EmptyState>
        ) : (
          images.map((image) => (
            <InteractiveCard 
              key={image.id} 
              image={image} 
              onClick={() => handleCardClick(image)}  // 클릭 핸들러 전달
              isSelected={selectedImage?.id === image.id}
            />
          ))
        )}
        <FloatingButton />
        {isDetailOpen && selectedImage && (
          <CardDetail 
            currentUserId={currentUserId}
            image={selectedImage}
            onClose={closeDetail}
            onDelete={() => handleDelete(selectedImage.id)}
            onEdit={handleImageEdit} 
          />
        )}
      </Container>
    </Layout>
  );
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 20px;
  padding: 0px 20px;
  overflow-y: scroll;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 12px;
  text-align: center;
  width: 100%;
  grid-column: 1 / -1;  // grid 전체 너비를 차지하도록
`;