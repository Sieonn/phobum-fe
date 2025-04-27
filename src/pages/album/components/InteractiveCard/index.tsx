import { useRef, useEffect, useState } from "react";
import { ImageResponse } from "../../../../api/images";
import { colors } from "../../../../styles/colors";

interface Props {
  image: ImageResponse;
  onClick?: () => void;
  isSelected?: boolean
}

export function InteractiveCard({ image, onClick, isSelected = false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  
  // 모바일 기기 감지 및 카드 너비 측정
  useEffect(() => {
    const checkSizes = () => {
      // 기기 타입 감지 (터치 기기인지 여부 확인)
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
      
      // 카드 실제 너비 측정
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };
    
    checkSizes();
    window.addEventListener('resize', checkSizes);
    
    // 초기 로드 후 약간의 지연을 두고 한 번 더 측정 (DOM 렌더링 완료 후)
    const timer = setTimeout(checkSizes, 500);
    
    return () => {
      window.removeEventListener('resize', checkSizes);
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timer);
    };
  }, []);

  // 카드 크기가 변경되면 다시 측정
  useEffect(() => {
    if (cardRef.current) {
      const observer = new ResizeObserver(() => {
        if (cardRef.current) {
          setCardWidth(cardRef.current.offsetWidth);
        }
      });
      
      observer.observe(cardRef.current);
      return () => observer.disconnect();
    }
  }, []);

  // 절대적으로 좌표를 직접 계산하는 것보다 변화량을 제한
  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const handleInteraction = (clientX: number, clientY: number) => {
    // 카드 크기에 따라 효과 적용 방식 결정
    const isSmallCard = cardWidth < 150;
    
    if (isSmallCard || isMobile) {
      // 작은 카드나 모바일에서는 단순화된 이펙트 적용
      applySimplifiedEffect(clientX, clientY);
    } else {
      // 충분히 큰 카드에서는 풀 이펙트 적용
      applyFullEffect(clientX, clientY);
    }
  };

  const applySimplifiedEffect = (clientX: number, clientY: number) => {
    cancelAnimationFrame(frameRef.current);
    
    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const shine = shineRef.current;
      
      if (!card || !shine) return;

      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // 모바일에서의 회전 각도와 효과 강화
      const sizeMultiplier = Math.min(2, rect.width / 150); // 회전 각도 증가
      const rotateY = clamp((x - centerX) / centerX * 20 * sizeMultiplier, -20, 20);
      const rotateX = clamp((centerY - y) / centerY * 20 * sizeMultiplier, -20, 20);

      // 부드러운 움직임을 위한 트랜지션
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      
      // 강화된 하이라이트 효과
      shine.style.background = `
        radial-gradient(circle at ${x}px ${y}px, 
        rgba(255,255,255,0.5), 
        transparent 80%
      )`;
    });
  };

  const applyFullEffect = (clientX: number, clientY: number) => {
    cancelAnimationFrame(frameRef.current);
    
    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const shine = shineRef.current;
      const prism = prismRef.current;

      if (!card || !shine || !prism) return;

      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // 카드 크기에 비례하게 회전 각도 조정
      const sizeMultiplier = Math.min(1, rect.width / 200); // 카드 크기 비례 계수
      const rotateY = clamp((x - centerX) / centerX * 15 * sizeMultiplier, -15, 15);
      const rotateX = clamp((centerY - y) / centerY * 15 * sizeMultiplier, -15, 15);

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

  // 이동 감지 임계값 설정
  const MOVE_THRESHOLD = 5;

  const handleMouseMove = (e: React.MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  };

  // 터치 이벤트 핸들러 수정
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // 수직 스크롤 감도 조정
    if (deltaY > deltaX * 1.2) {
      resetStyles();
      return;
    }

    // 즉각적인 효과 적용을 위해 임계값 낮춤
    if (deltaX > 2) {
      e.preventDefault(); // 스크롤 방지
      handleInteraction(touch.clientX, touch.clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    resetStyles();
  };

  const resetStyles = () => {
    cancelAnimationFrame(frameRef.current);
    
    const card = cardRef.current;
    const shine = shineRef.current;
    const prism = prismRef.current;

    if (card) {
      // 부드러운 복원 효과
      card.style.transition = "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      
      setTimeout(() => {
        if (card) card.style.transition = "";
      }, 300);
    }
    
    if (shine) shine.style.background = "none";
    if (prism) prism.style.opacity = "0";
  };

  return (
    <div 
      style={{
        ...styles.imageItem,
        touchAction: 'pan-y',  // 수직 스크롤만 허용
      }} 
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <style>{neonAnimation}</style>
      <div
        ref={cardRef}
        style={styles.imageWrapper(isSelected)}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetStyles}
      >
        <img 
          src={image.image_url} 
          alt={image.title ?? "이미지"} 
          style={styles.image} 
          loading="lazy"
        />
        <div ref={shineRef} style={styles.shine}></div>
        <div ref={prismRef} style={styles.prism}></div>
      </div>
    </div>
  );
}

const styles = {
  imageItem: {
    display: "flex",
    alignItems: "center",
    touchAction: 'pan-y',  // 수직 스크롤 허용
    userSelect: 'none' as const,
    WebkitTapHighlightColor: 'transparent',
  },
  imageWrapper: (isSelected: boolean) => ({
    width: "100%",
    maxWidth: "214px",
    minWidth: '50%',
    aspectRatio: "1 / 1.15",
    backgroundColor: `${colors.gray400}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative" as const,
    willChange: "transform",
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    boxShadow: isSelected
      ? "0 0 20px 5px rgba(0, 255, 128, 0.7)"
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