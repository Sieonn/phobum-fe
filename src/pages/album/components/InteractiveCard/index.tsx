import { useRef, useEffect, useState, useCallback, memo } from "react";
import { ImageResponse } from "../../../../api/images";
import { colors } from "../../../../styles/colors";
import styled, { keyframes, css } from 'styled-components';

interface Props {
  image: ImageResponse;
  onClick?: () => void;
  isSelected?: boolean;
  isLoaded?: boolean;
}

const neonPulse = keyframes`
  0% { box-shadow: 0 0 10px 2px rgba(0, 255, 128, 0.4); }
  50% { box-shadow: 0 0 25px 8px rgba(0, 255, 128, 0.8); }
  100% { box-shadow: 0 0 10px 2px rgba(0, 255, 128, 0.4); }
`;

const spin = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 4px solid ${colors.gray300};
  border-top: 4px solid ${colors.neon100};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const CardImage = styled.img<{ $isLoading: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: ${({ $isLoading }) => $isLoading ? 'none' : 'block'};
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
  contain: content;
`;

const Shine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: 3px;
  z-index: 1;
`;

const Prism = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: 8px;
  opacity: 0;
  mix-blend-mode: screen;
  z-index: 2;
`;

const CardWrapper = styled.div<{ $isSelected: boolean; $transform: string }>`
  width: 100%;
  max-width: 214px;
  min-width: 50%;
  aspect-ratio: 1 / 1.2;
  background-color: ${colors.gray400};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  will-change: transform;
  transform: ${({ $transform }) => $transform};
  box-shadow: ${({ $isSelected }) => $isSelected ? '0 0 20px 5px rgba(0, 255, 128, 0.7)' : 'none'};
  animation: ${({ $isSelected }) => $isSelected ? css`${neonPulse} 2s infinite alternate` : 'none'};
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  backface-visibility: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  contain: content;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  touch-action: pan-y;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

export const InteractiveCard = memo(function InteractiveCard({ 
  image, 
  onClick, 
  isSelected = false, 
  isLoaded = false 
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [imageUrl, setImageUrl] = useState(image.image_url);
  const [isLoading, setIsLoading] = useState(!isLoaded);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkSizes = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };
    
    checkSizes();
    window.addEventListener('resize', checkSizes);
    const timer = setTimeout(checkSizes, 500);
    
    return () => {
      window.removeEventListener('resize', checkSizes);
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (image.image_url !== imageUrl) {
      setImageUrl(image.image_url);
      setIsLoading(!isLoaded);
    }
  }, [image.image_url, isLoaded]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageUrl('/images/default-image.png');
    setIsLoading(false);
  }, []);

  const clamp = useCallback((value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  }, []);

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const isSmallCard = cardWidth < 150;
    const sizeMultiplier = isSmallCard || isMobile 
      ? Math.min(2.5, rect.width / 120) 
      : Math.min(1, rect.width / 200);

    // const rotateY = clamp((x - centerX) / centerX * (isSmallCard || isMobile ? 20 : 15) * sizeMultiplier, -20, 20);
    // const rotateX = clamp((centerY - y) / centerY * (isSmallCard || isMobile ? 20 : 15) * sizeMultiplier, -20, 20);
 // 모바일에서는 반응성을 더 높이고 회전 각도 범위도 확장
 const baseRotation = isMobile ? 25 : 15;
 const maxRotation = isMobile ? 30 : 20;
 
 // 작은 움직임에도 더 민감하게 반응하도록 변환
 const rotateY = clamp((x - centerX) / centerX * baseRotation * sizeMultiplier, -maxRotation, maxRotation);
 const rotateX = clamp((centerY - y) / centerY * baseRotation * sizeMultiplier, -maxRotation, maxRotation);

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isSmallCard || isMobile ? 'scale(1.02)' : ''}`);
      
      if (shineRef.current) {
        shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, 
          rgba(255,255,255,${isSmallCard || isMobile ? '0.4' : '0.3'}), 
          transparent ${isSmallCard || isMobile ? '90%' : '80%'})`;
      }

      if (prismRef.current && !isSmallCard && !isMobile) {
        prismRef.current.style.background = `conic-gradient(from ${x + y}deg at ${x}px ${y}px,
          rgba(255, 0, 150, 0.2),
          rgba(0, 255, 255, 0.2),
          rgba(255, 255, 0, 0.2),
          rgba(255, 0, 150, 0.2))`;
        prismRef.current.style.opacity = "1";
      }
    });
  }, [cardWidth, isMobile, isHovered, clamp]);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    if (shineRef.current) shineRef.current.style.background = 'none';
    if (prismRef.current) prismRef.current.style.opacity = '0';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  }, [handleInteraction]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    if (deltaY > deltaX * 1.2) {
      resetStyles();
      return;
    }

    if (deltaX > 2) {
      e.preventDefault();
      handleInteraction(touch.clientX, touch.clientY);
    }
  }, [handleInteraction]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    resetStyles();
  }, []);

  const resetStyles = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    if (shineRef.current) shineRef.current.style.background = 'none';
    if (prismRef.current) prismRef.current.style.opacity = '0';
  }, []);

  return (
    <CardContainer onClick={onClick}>
      <CardWrapper
        ref={cardRef}
        $isSelected={isSelected}
        $transform={transform}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Shine ref={shineRef} />
        <Prism ref={prismRef} />
        {isLoading && <LoadingSpinner />}
        <CardImage
          src={imageUrl}
          alt={image.title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          $isLoading={isLoading}
        />
      </CardWrapper>
    </CardContainer>
  );
});
