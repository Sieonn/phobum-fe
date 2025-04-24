import { useRef } from "react";
import { ImageResponse } from "../../../api/images";
import { colors } from "../../../styles/colors";

interface Props {
  image: ImageResponse;
}

export function InteractiveCard({ image }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleInteraction = (clientX: number, clientY: number) => {
    const card = cardRef.current;
    const shine = shineRef.current;
    const prism = prismRef.current;

    if (!card || !shine || !prism) return;

    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rotateY = -1 / 10 * x + 20;
    const rotateX = 4 / 40 * y - 20;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25), rgba(255,255,255,0.05) 30%, transparent 60%)`;
    prism.style.background = `conic-gradient(from ${x + y}deg at ${x}px ${y}px, rgba(255, 0, 150, 0.2), rgba(0, 255, 255, 0.2), rgba(255, 255, 0, 0.2), rgba(255, 0, 150, 0.2))`;
    prism.style.opacity = "1";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // 수직 스크롤이 더 큰 경우 카드 효과를 적용하지 않음
    if (deltaY > deltaX) {
      return;
    }

    // 수평 움직임이 더 큰 경우에만 카드 효과 적용
    e.preventDefault();
    handleInteraction(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    resetStyles();
  };

  const resetStyles = () => {
    const card = cardRef.current;
    const shine = shineRef.current;
    const prism = prismRef.current;

    if (card) card.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (shine) shine.style.background = "none";
    if (prism) prism.style.opacity = "0";
  };

  return (
    <div style={styles.imageItem}>
      <div
        ref={cardRef}
        style={styles.imageWrapper}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetStyles}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <img src={image.image_url} alt={image.title} style={styles.image} />
        <div ref={shineRef} style={styles.shine}></div>
        <div ref={prismRef} style={styles.prism}></div>
      </div>
    </div>
  );
}

const styles = {
  imageItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: "1 / 1.15",
    backgroundColor: `${colors.gray400}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "transform 0.1s ease",
    position: "relative" as const,
    willChange: "transform",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain" as const,
    pointerEvents: "none" as const,
  },
  shine: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none" as const,
    transition: "background 0.3s ease",
    borderRadius: "8px",
    zIndex: 1,
  },
  prism: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none" as const,
    borderRadius: "8px",
    opacity: 0,
    transition: "opacity 0.4s ease",
    mixBlendMode: "screen" as const,
    zIndex: 2,
  },
};
