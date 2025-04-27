import { useRef } from "react";
import { ImageResponse } from "../../../../api/images";
import { colors } from "../../../../styles/colors";

interface Props {
  image: ImageResponse;
  onClick?: () => void;
  isSelected?: boolean
}

export function InteractiveCard({ image, onClick, isSelected=false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const frame = useRef<number>(0);

  const handleInteraction = (clientX: number, clientY: number) => {
    cancelAnimationFrame(frame.current!);
    frame.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const shine = shineRef.current;
      const prism = prismRef.current;

      if (!card || !shine || !prism) return;

      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (x - centerX) / centerX * 15; // -15deg ~ 15deg
      const rotateX = (centerY - y) / centerY * 15; // -15deg ~ 15deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4), transparent 70%)`;
      prism.style.background = `conic-gradient(from ${x + y}deg at ${x}px ${y}px,
        rgba(255, 0, 150, 0.2),
        rgba(0, 255, 255, 0.2),
        rgba(255, 255, 0, 0.2),
        rgba(255, 0, 150, 0.2))`;
      prism.style.opacity = "1";
    });
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
    cancelAnimationFrame(frame.current!);
    const card = cardRef.current;
    const shine = shineRef.current;
    const prism = prismRef.current;

    if (card) card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    if (shine) shine.style.background = "none";
    if (prism) prism.style.opacity = "0";
  };

  return (
    <div style={styles.imageItem} onClick={onClick}>
      <style>{neonAnimation}</style>
      <div
        ref={cardRef}
        style={styles.imageWrapper(isSelected)}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetStyles}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <img src={image.image_url} alt={image.title ?? "이미지"} style={styles.image} />
        <div ref={shineRef} style={styles.shine}></div>
        <div ref={prismRef} style={styles.prism}></div>
      </div>
    </div>
  );
}

const styles = {
  imageItem: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: (isSelected: boolean)=> ({
    width: "100%",
    maxWidth: "214px",
    minWidth:'50%',
    aspectRatio: "1 / 1.15",
    backgroundColor: `${colors.gray400}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    position: "relative" as const,
    willChange: "transform",
    boxShadow: isSelected
    ? "0 0 20px 5px rgba(0, 255, 128, 0.7)" // 처음 기본 네온
    : "none",
  animation: isSelected ? "neonPulse 2s infinite alternate" : "none",
}),
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    pointerEvents: "none" as const,
  },
  shine: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none" as const,
    transition: "background 0.4s ease",
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
    transition: "opacity 0.5s ease",
    mixBlendMode: "screen" as const,
    zIndex: 2,
  },
  
};
export const neonAnimation = `
@keyframes neonPulse {
  0% {
    box-shadow: 0 0 10px 2px rgba(0, 255, 128, 0.4);
  }
  50% {
    box-shadow: 0 0 25px 8px rgba(0, 255, 128, 0.8);
  }
  100% {
    box-shadow: 0 0 10px 2px rgba(0, 255, 128, 0.4);
  }
}
`;