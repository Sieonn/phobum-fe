import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const user = useStore((state) => state.user);
  const isLoggedIn = !!user;
  const currentUserId = user?.id ? String(user.id) : undefined;

  // 이미지 목록 가져오기 최적화
  useEffect(() => {
    let isMounted = true;
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await imagesApi.getList();
        if (isMounted) {
          setImages(response.data);
          setError(null);
          
          // 이미지 데이터 프리로드
          const preloadPromises = response.data.map(async (image) => {
            try {
              const img = new Image();
              img.src = image.image_url;
              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
              });
              return image.image_url;
            } catch (error) {
              console.error('이미지 프리로드 실패:', error);
              return null;
            }
          });

          const loadedUrls = await Promise.all(preloadPromises);
          setLoadedImages(new Set(loadedUrls.filter(Boolean) as string[]));
          setLoading(false);
        }
      } catch (err: any) {
        console.error("이미지 로딩 실패:", err);
        if (isMounted) {
          setError("이미지 목록을 가져오는 데 실패했습니다.");
          setImages([]);
          setLoadedImages(new Set());
          setLoading(false);
        }
      }
    };

    fetchImages();
    return () => {
      isMounted = false;
    };
  }, []);

  // 이미지 프리로딩 최적화
  const preloadImage = useCallback((url: string) => {
    if (loadedImages.has(url)) return;
    
    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, url]));
    };
    img.src = url;
  }, [loadedImages]);

  // Intersection Observer를 사용한 가시성 기반 이미지 로딩
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-image-url');
            if (url) {
              setVisibleImages(prev => new Set([...prev, url]));
              preloadImage(url);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [preloadImage]);

  // 이미지 목록 업데이트 시 프리로딩
  useEffect(() => {
    if (images.length > 0) {
      // 첫 3개 이미지는 즉시 프리로드
      images.slice(0, 3).forEach(img => preloadImage(img.image_url));
      
      // 나머지 이미지는 가시성 기반으로 로드
      const imageElements = document.querySelectorAll('[data-image-url]');
      imageElements.forEach(el => {
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }
  }, [images, preloadImage]);

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

  if (error) {
    return (
      <Layout>
       <AppBar type="default" type2={isLoggedIn ? 'user' : 'album'} />
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>다시 시도</RetryButton>
        </ErrorContainer>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
    <AppBar type="default" type2={isLoggedIn ? "user" : "album"} />
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </Layout>
    );
  }

  return (
    <Layout>
   <AppBar type="default" type2={isLoggedIn ? "user" : "album"} />
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
            <div
              key={image.id}
              data-image-url={image.image_url}
              onClick={() => handleCardClick(image)}
            >
              <InteractiveCard
                image={image}
                isSelected={selectedImage?.id === image.id}
                isLoaded={loadedImages.has(image.image_url) && visibleImages.has(image.image_url)}
                onClick={() => handleCardClick(image)}
              />
            </div>
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

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 16px;
`;

const ErrorMessage = styled.div`
  color: ${colors.red100};
  font-size: 1rem;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: ${colors.neon100};
  color: ${colors.black};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background-color: ${colors.neon200};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${colors.neon100};
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;