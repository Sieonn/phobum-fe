import { useState, useEffect, useCallback, useMemo } from "react";
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

// 이미지 프리로더
const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};

export default function Album() {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageResponse | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const user = useStore((state) => state.user);
  const currentUserId = user?.id ? String(user.id) : undefined;

  // 이미지 프리로딩
  useEffect(() => {
    const preloadImages = async () => {
      const newLoadedImages = new Set(loadedImages);
      for (const image of images) {
        if (!newLoadedImages.has(image.image_url)) {
          try {
            await preloadImage(image.image_url);
            newLoadedImages.add(image.image_url);
          } catch (error) {
            console.error('이미지 프리로드 실패:', error);
          }
        }
      }
      setLoadedImages(newLoadedImages);
    };

    if (images.length > 0) {
      preloadImages();
    }
  }, [images]);

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

  const handleCardClick = useCallback((image: ImageResponse) => {
    setSelectedImage(image);
    setIsDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedImage(null);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await imagesApi.delete(id);
      alert("삭제되었습니다.");
      setImages(prev => prev.filter(img => img.id !== id));
      closeDetail();
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  }, [closeDetail]);
  
  const handleImageEdit = useCallback((updatedImage: ImageResponse) => {
    setImages(prevImages => 
      prevImages.map(img => 
        img.id === updatedImage.id ? updatedImage : img
      )
    );
    
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
              onClick={() => handleCardClick(image)}
              isSelected={selectedImage?.id === image.id}
              isLoaded={loadedImages.has(image.image_url)}
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