import { useState, useEffect } from "react";
import { ImageResponse, imagesApi } from "../../api/images";
import { AppBar } from "../../components/app-bar";
import { Layout } from "../../components/layout";
import { InteractiveCard } from "./components";
import styled from "styled-components";
import FloatingButton from "../../components/fab";

export default function Album() {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await imagesApi.getList();
        setImages(response.data);
      } catch (err: any) {
        setError("이미지 목록을 가져오는 데 실패했습니다.");
      }
    };

    fetchImages();
  }, []);

  if (error) return <div>{error}</div>;
  if (!images.length) return <div>로딩 중...</div>;

  return (
    <Layout>
      <AppBar type="default" />
      {/* <h1>Album</h1>
      <p>Welcome to the album page!</p> */}
      <Container>
        {images.map((image) => (
          <InteractiveCard key={image.id} image={image} />
        ))}
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