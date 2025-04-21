import { useState, useEffect } from "react";
import { ImageResponse, imagesApi } from "../../api/images";
import { AppBar } from "../../components/app-bar";
import { Layout } from "../../components/layout";

export default function Album() {
  const ImageList = () => {
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
        <h1>Album</h1>
        <p>Welcome to the album page!</p>

        <div style={styles.imageGrid}>
          {images.map((image) => (
            <div key={image.id} style={styles.imageItem}>
              <div style={styles.imageWrapper}>
                <img
                  src={image.image_url}
                  alt={image.title}
                  style={styles.image}
                />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  };

  return <ImageList />;
}

const styles = {
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  },
  imageItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: "1 / 1",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain" as const,
  },
};
