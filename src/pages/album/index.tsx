import { useState, useEffect } from "react";
import { ImageResponse, imagesApi } from "../../api/images";
import { AppBar } from "../../components/app-bar";
import { Layout } from "../../components/layout";
import { InteractiveCard } from "./components";
import styled from "styled-components";
import FloatingButton from "../../components/fab";
import { Text } from "../../components/text";

export default function Album() {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (error) return <div>{error}</div>;
  if (loading) return <div>로딩 중...</div>;

  return (
    <Layout>
      <AppBar type="default" />
      <Container>
        {images.length === 0 ? (
          <EmptyState>
            <Text typo="subtitle100">
              아직 만든 카드가 없어요!
            </Text>
            <Text typo="body100" >
              하단의 + 버튼을 눌러 첫 번째 카드를 만들어보세요
            </Text>
          </EmptyState>
        ) : (
          images.map((image) => (
            <InteractiveCard key={image.id} image={image} />
          ))
        )}
        <FloatingButton />
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