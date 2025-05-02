// import { useRef, useEffect, useState, useCallback, memo } from "react";
// import { ImageResponse } from "../../../../api/images";
// import { colors } from "../../../../styles/colors";
// import styled, { keyframes, css } from 'styled-components';

// interface Props {
//   image: ImageResponse;
//   onClick?: () => void;
//   isSelected?: boolean;
//   isLoaded?: boolean;
// }

// const neonPulse = keyframes`
//   0% { box-shadow: 0 0 10px 2px rgba(0, 255, 128, 0.4); }
//   50% { box-shadow: 0 0 25px 8px rgba(0, 255, 128, 0.8); }
//   100% { box-shadow: 0 0 10px 2px rgba(0, 255, 128, 0.4); }
// `;

// const spin = keyframes`
//   0% { transform: translate(-50%, -50%) rotate(0deg); }
//   100% { transform: translate(-50%, -50%) rotate(360deg); }
// `;

// const LoadingSpinner = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 40px;
//   height: 40px;
//   border: 4px solid ${colors.gray300};
//   border-top: 4px solid ${colors.neon100};
//   border-radius: 50%;
//   animation: ${spin} 1s linear infinite;
// `;

// const CardImage = styled.img<{ $isLoading: boolean }>`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border-radius: 8px;
//   display: ${({ $isLoading }) => $isLoading ? 'none' : 'block'};
//   will-change: transform;
//   backface-visibility: hidden;
//   transform: translateZ(0);
//   contain: content;
// `;

// const Shine = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   pointer-events: none;
//   border-radius: 3px;
//   z-index: 1;
// `;

// const Prism = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   pointer-events: none;
//   border-radius: 8px;
//   opacity: 0;
//   mix-blend-mode: screen;
//   z-index: 2;
// `;

// const CardWrapper = styled.div<{ $isSelected: boolean; $transform: string }>`
//   width: 100%;
//   max-width: 214px;
//   min-width: 50%;
//   aspect-ratio: 1 / 1.15;
//   background-color: ${colors.gray400};
//   border-radius: 8px;
//   overflow: hidden;
//   position: relative;
//   will-change: transform;
//   transform: ${({ $transform }) => $transform};
//   box-shadow: ${({ $isSelected }) => $isSelected ? '0 0 20px 5px rgba(0, 255, 128, 0.7)' : 'none'};
//   animation: ${({ $isSelected }) => $isSelected ? css`${neonPulse} 2s infinite alternate` : 'none'};
//   transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
//   backface-visibility: hidden;
//   transform-style: preserve-3d;
//   perspective: 1000px;
//   contain: content;
// `;

// const CardContainer = styled.div`
//   display: flex;
//   align-items: center;
//   touch-action: pan-y;
//   user-select: none;
//   -webkit-tap-highlight-color: transparent;
// `;

// export const InteractiveCard = memo(function InteractiveCard({ 
//   image, 
//   onClick, 
//   isSelected = false, 
//   isLoaded = false 
// }: Props) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const shineRef = useRef<HTMLDivElement>(null);
//   const prismRef = useRef<HTMLDivElement>(null);
//   const touchStartRef = useRef<{ x: number; y: number } | null>(null);
//   const frameRef = useRef<number>(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [cardWidth, setCardWidth] = useState(0);
//   const [imageUrl, setImageUrl] = useState(image.image_url);
//   const [isLoading, setIsLoading] = useState(!isLoaded);
//   const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
//   const [isHovered, setIsHovered] = useState(false);
//   const rafId = useRef<number | undefined>(undefined);

//   useEffect(() => {
//     const checkSizes = () => {
//       setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
//       if (cardRef.current) {
//         setCardWidth(cardRef.current.offsetWidth);
//       }
//     };
    
//     checkSizes();
//     window.addEventListener('resize', checkSizes);
//     const timer = setTimeout(checkSizes, 500);
    
//     return () => {
//       window.removeEventListener('resize', checkSizes);
//       cancelAnimationFrame(frameRef.current);
//       clearTimeout(timer);
//     };
//   }, []);

//   useEffect(() => {
//     if (image.image_url !== imageUrl) {
//       setImageUrl(image.image_url);
//       setIsLoading(!isLoaded);
//     }
//   }, [image.image_url, isLoaded]);

//   const handleImageLoad = useCallback(() => {
//     setIsLoading(false);
//   }, []);

//   const handleImageError = useCallback(() => {
//     setImageUrl('/images/default-image.png');
//     setIsLoading(false);
//   }, []);

//   const clamp = useCallback((value: number, min: number, max: number) => {
//     return Math.min(Math.max(value, min), max);
//   }, []);

//   const handleInteraction = useCallback((clientX: number, clientY: number) => {
//     if (!cardRef.current || !isHovered) return;
    
//     const rect = cardRef.current.getBoundingClientRect();
//     const x = clientX - rect.left;
//     const y = clientY - rect.top;
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;
    
//     const isSmallCard = cardWidth < 150;
//     const sizeMultiplier = isSmallCard || isMobile 
//       ? Math.min(2, rect.width / 150)
//       : Math.min(1, rect.width / 200);

//     const rotateY = clamp((x - centerX) / centerX * (isSmallCard || isMobile ? 20 : 15) * sizeMultiplier, -20, 20);
//     const rotateX = clamp((centerY - y) / centerY * (isSmallCard || isMobile ? 20 : 15) * sizeMultiplier, -20, 20);

//     if (rafId.current) {
//       cancelAnimationFrame(rafId.current);
//     }
    
//     rafId.current = requestAnimationFrame(() => {
//       setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isSmallCard || isMobile ? 'scale(1.02)' : ''}`);
      
//       if (shineRef.current) {
//         shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, 
//           rgba(255,255,255,${isSmallCard || isMobile ? '0.4' : '0.3'}), 
//           transparent ${isSmallCard || isMobile ? '90%' : '80%'})`;
//       }

//       if (prismRef.current && !isSmallCard && !isMobile) {
//         prismRef.current.style.background = `conic-gradient(from ${x + y}deg at ${x}px ${y}px,
//           rgba(255, 0, 150, 0.2),
//           rgba(0, 255, 255, 0.2),
//           rgba(255, 255, 0, 0.2),
//           rgba(255, 0, 150, 0.2))`;
//         prismRef.current.style.opacity = "1";
//       }
//     });
//   }, [cardWidth, isMobile, isHovered, clamp]);

//   useEffect(() => {
//     return () => {
//       if (rafId.current) {
//         cancelAnimationFrame(rafId.current);
//       }
//     };
//   }, []);

//   const handleMouseEnter = useCallback(() => {
//     setIsHovered(true);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     if (rafId.current) {
//       cancelAnimationFrame(rafId.current);
//     }
//     setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
//     if (shineRef.current) shineRef.current.style.background = 'none';
//     if (prismRef.current) prismRef.current.style.opacity = '0';
//   }, []);

//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     handleInteraction(e.clientX, e.clientY);
//   }, [handleInteraction]);

//   const handleTouchMove = useCallback((e: React.TouchEvent) => {
//     if (!touchStartRef.current) return;

//     const touch = e.touches[0];
//     const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
//     const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

//     if (deltaY > deltaX * 1.2) {
//       resetStyles();
//       return;
//     }

//     if (deltaX > 2) {
//       e.preventDefault();
//       handleInteraction(touch.clientX, touch.clientY);
//     }
//   }, [handleInteraction]);

//   const handleTouchStart = useCallback((e: React.TouchEvent) => {
//     e.stopPropagation();
//     const touch = e.touches[0];
//     touchStartRef.current = {
//       x: touch.clientX,
//       y: touch.clientY
//     };
//   }, []);

//   const handleTouchEnd = useCallback(() => {
//     touchStartRef.current = null;
//     resetStyles();
//   }, []);

//   const resetStyles = useCallback(() => {
//     cancelAnimationFrame(frameRef.current);
//     setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
//     if (shineRef.current) shineRef.current.style.background = 'none';
//     if (prismRef.current) prismRef.current.style.opacity = '0';
//   }, []);

//   return (
//     <CardContainer onClick={onClick}>
//       <CardWrapper
//         ref={cardRef}
//         $isSelected={isSelected}
//         $transform={transform}
//         onMouseMove={handleMouseMove}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//         onTouchCancel={handleTouchEnd}
//       >
//         <CardImage
//           src={imageUrl}
//           alt={image.title}
//           onLoad={handleImageLoad}
//           onError={handleImageError}
//           $isLoading={isLoading}
//           loading="eager"
//         />
//         {isLoading && <LoadingSpinner />}
//         {isHovered && (
//           <>
//             <Shine ref={shineRef} />
//             <Prism ref={prismRef} />
//           </>
//         )}
//       </CardWrapper>
//     </CardContainer>
//   );
// });

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
  aspect-ratio: 1 / 1.15;
  background-color: ${colors.gray400};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  will-change: transform;
  transform: ${({ $transform }) => $transform};
  box-shadow: ${({ $isSelected }) => $isSelected ? '0 0 20px 5px rgba(0, 255, 128, 0.7)' : 'none'};
  animation: ${({ $isSelected }) => $isSelected ? css`${neonPulse} 2s infinite alternate` : 'none'};
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backface-visibility: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  contain: content;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  touch-action: none;
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
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchMoveRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [imageUrl, setImageUrl] = useState(image.image_url);
  const [isLoading, setIsLoading] = useState(!isLoaded);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const rafId = useRef<number | undefined>(undefined);
  const initialRotateRef = useRef({ x: 0, y: 0 });
  const inertiaAnimationRef = useRef<number | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(0);

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
      if (inertiaAnimationRef.current) {
        cancelAnimationFrame(inertiaAnimationRef.current);
      }
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

  const applyTransform = useCallback((rotateX: number, rotateY: number, scale: number = 1) => {
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
  }, []);

  const handleInteraction = useCallback((clientX: number, clientY: number, intensity: number = 1) => {
    if (!cardRef.current || (!isHovered && !isTouching)) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const isSmallCard = cardWidth < 150;
    const sizeMultiplier = isSmallCard || isMobile 
      ? Math.min(2, rect.width / 150)
      : Math.min(1, rect.width / 200);

    // 모바일에서는 더 부드러운 경험을 위해 약간 더 반응이 좋게 만듦
    const multiplier = isMobile ? 25 : 15;
    const rotateY = clamp((x - centerX) / centerX * multiplier * sizeMultiplier * intensity, -25, 25);
    const rotateX = clamp((centerY - y) / centerY * multiplier * sizeMultiplier * intensity, -25, 25);

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      // 터치나 마우스 이동에 따른 회전 적용
      applyTransform(rotateX, rotateY, isMobile ? 1.03 : 1.02);
      
      // 빛 효과 업데이트
      if (shineRef.current) {
        const shineOpacity = isMobile ? 0.5 : 0.3;
        const shineSize = isMobile ? '110%' : '80%';
        shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, 
          rgba(255,255,255,${shineOpacity}), 
          transparent ${shineSize})`;
      }

      // 프리즘 효과 업데이트 (모바일에서도 약간 활성화)
      if (prismRef.current) {
        const prismOpacity = isMobile ? "0.15" : "0.2";
        prismRef.current.style.background = `conic-gradient(from ${x + y}deg at ${x}px ${y}px,
          rgba(255, 0, 150, ${prismOpacity}),
          rgba(0, 255, 255, ${prismOpacity}),
          rgba(255, 255, 0, ${prismOpacity}),
          rgba(255, 0, 150, ${prismOpacity}))`;
        prismRef.current.style.opacity = "1";
      }
    });
  }, [cardWidth, isMobile, isHovered, isTouching, clamp, applyTransform]);

  // 관성 효과 구현
  const applyInertia = useCallback(() => {
    if (inertiaAnimationRef.current) {
      cancelAnimationFrame(inertiaAnimationRef.current);
    }

    const friction = 0.95; // 마찰력 (값이 클수록 빨리 멈춤)
    const threshold = 0.1; // 이 값보다 작아지면 애니메이션 중단

    let { x: vx, y: vy } = velocityRef.current;
    let startTime = performance.now();

    const animate = () => {
      const elapsed = performance.now() - startTime;
      
      // 속도 감소
      vx *= friction;
      vy *= friction;

      // 현재 회전값에 속도 적용
      const currentTransform = transform.match(/-?\d+(\.\d+)?/g);
      if (currentTransform && currentTransform.length >= 2) {
        const rotateX = parseFloat(currentTransform[0]);
        const rotateY = parseFloat(currentTransform[1]);
        
        applyTransform(rotateX - vy * 0.8, rotateY + vx * 0.8);
      }

      // 속도가 임계값보다 크면 계속 애니메이션 실행
      if (Math.abs(vx) > threshold || Math.abs(vy) > threshold) {
        inertiaAnimationRef.current = requestAnimationFrame(animate);
      } else {
        // 완전히 원래 위치로 돌아가기
        setTimeout(() => {
          resetStyles();
        }, 100);
      }
    };

    inertiaAnimationRef.current = requestAnimationFrame(animate);
  }, [transform, applyTransform]);

  // 관성 계산을 위한 속도 업데이트
  const updateVelocity = useCallback((x: number, y: number) => {
    const now = performance.now();
    const elapsed = now - lastMoveTimeRef.current;
    
    if (elapsed > 0 && touchStartRef.current && touchMoveRef.current) {
      const dx = x - touchMoveRef.current.x;
      const dy = y - touchMoveRef.current.y;
      
      velocityRef.current = {
        x: dx / elapsed * 16, // 60fps 기준 보정
        y: dy / elapsed * 16
      };
      
      lastMoveTimeRef.current = now;
      touchMoveRef.current = { x, y };
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (inertiaAnimationRef.current) {
        cancelAnimationFrame(inertiaAnimationRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    resetStyles();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleInteraction(e.clientX, e.clientY, 1);
    updateVelocity(e.clientX, e.clientY);
  }, [handleInteraction, updateVelocity]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    
    // 터치 시작 정보 저장
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now()
    };
    
    touchMoveRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
    
    lastMoveTimeRef.current = performance.now();
    setIsTouching(true);
    
    // 현재의 회전 상태 저장
    const currentTransform = transform.match(/-?\d+(\.\d+)?/g);
    if (currentTransform && currentTransform.length >= 2) {
      initialRotateRef.current = {
        x: parseFloat(currentTransform[0]),
        y: parseFloat(currentTransform[1])
      };
    }
    
    // 관성 애니메이션 취소
    if (inertiaAnimationRef.current) {
      cancelAnimationFrame(inertiaAnimationRef.current);
    }
  }, [transform]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    e.preventDefault(); // 스크롤 방지
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    // 수직 스크롤 대신 카드 움직임으로 판단하는 임계값
    if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) {
      return; // 작은 움직임은 무시
    }
    
    // 수직으로 크게 움직일 경우 스크롤로 처리
    if (Math.abs(deltaY) > Math.abs(deltaX) * 2.5) {
      setIsTouching(false);
      resetStyles();
      return;
    }
    
    // 속도 계산을 위한 위치 업데이트
    updateVelocity(touch.clientX, touch.clientY);
    
    // 터치 이동에 따른 인터랙션 적용
    handleInteraction(touch.clientX, touch.clientY, 1.2); // 모바일에서 더 강한 효과
    
  }, [handleInteraction, updateVelocity]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    setIsTouching(false);
    
    // 빠른 터치는 클릭으로 처리
    if (touchStartRef.current) {
      const touchDuration = performance.now() - touchStartRef.current.time;
      if (touchDuration < 200 && onClick) {
        onClick();
        resetStyles();
        return;
      }
    }
    
    // 관성 효과 적용
    applyInertia();
    touchStartRef.current = null;
  }, [onClick, applyInertia]);

  const resetStyles = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    // 부드럽게 원래 상태로 돌아가기
    applyTransform(0, 0, 1);
    
    if (shineRef.current) shineRef.current.style.background = 'none';
    if (prismRef.current) prismRef.current.style.opacity = '0';
    
    velocityRef.current = { x: 0, y: 0 };
  }, [applyTransform]);

  return (
    <CardContainer 
      onClick={isMobile ? undefined : onClick} // 모바일에서는 터치 이벤트로 클릭 처리
    >
      <CardWrapper
        ref={cardRef}
        $isSelected={isSelected}
        $transform={transform}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseEnter={isMobile ? undefined : handleMouseEnter}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <CardImage
          src={imageUrl}
          alt={image.title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          $isLoading={isLoading}
          loading="eager"
        />
        {isLoading && <LoadingSpinner />}
        {(isHovered || isTouching) && (
          <>
            <Shine ref={shineRef} />
            <Prism ref={prismRef} />
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
});