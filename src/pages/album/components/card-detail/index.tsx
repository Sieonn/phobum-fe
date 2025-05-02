import { useCallback, useState, useMemo, useEffect } from "react";
import { ImageResponse, imagesApi, ImageUpdateRequest } from "../../../../api/images";
import { colors } from "../../../../styles/colors";
import { InteractiveCard } from "../InteractiveCard";
import BottomSheet, { BottomSheetAction } from "../../../../components/bottom-sheet";
import { CommonOverlay } from "../../../../components/bottom-sheet/index.styled";
import { Author, CardSection, Content, ContentsSection, Description, More2Icon, MoreSection, Title } from "./index.styled";
import styled from "styled-components";
import CardModify from "../../card-modify";

interface CardDetailProps {
  image: ImageResponse;
  currentUserId?: string | null; // 현재 로그인한 사용자 ID
  onClose: () => void;
  onEdit?: (updatedImage: ImageResponse) => void;
  onDelete?: () => void;
  onShare?: () => void;
}

// 단순화된 카드 컴포넌트
const SimpleCard = styled.div`
  width: 100%;
  max-width: 214px;
  min-width: 50%;
  aspect-ratio: 1 / 1.15;
  background-color: ${colors.gray400};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 20px 5px rgba(0, 255, 128, 0.7);
  animation: ${({ theme }) => theme.animations.neonPulse} 2s infinite alternate;
`;

const SimpleCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export default function CardDetail({ 
  image, 
  currentUserId, 
  onClose, 
  onEdit, 
  onDelete, 
  onShare 
}: CardDetailProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImageResponse>(image);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageUrl, setImageUrl] = useState(image.image_url);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getImageUrl = useCallback((url: string) => {
    if (!url) return '/images/default-image.png';
    if (url.startsWith('blob:')) return url;
    return url;  // 타임스탬프 제거
  }, []);

  // 이미지 URL 캐싱 최적화
  useEffect(() => {
    if (!isUpdating && image.image_url !== imageUrl) {
      setImageUrl(image.image_url);
      setIsImageLoaded(false);
    }
  }, [image.image_url, isUpdating, imageUrl]);

  const handleModifySave = useCallback(async (updatedImage: ImageResponse) => {
    if (!currentImage) return;
    
    try {
      setIsUpdating(true);
      setCurrentImage(updatedImage);
      setImageUrl(updatedImage.image_url);
      
      if (onEdit) {
        onEdit(updatedImage);
      }
      
      setIsModifyOpen(false);
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정에 실패했습니다.');
    } finally {
      setIsUpdating(false);
    }
  }, [currentImage, onEdit]);

  // image prop이 변경될 때만 currentImage 업데이트
  useEffect(() => {
    if (!isUpdating && image.id !== currentImage.id) {
      setCurrentImage(image);
      setImageUrl(image.image_url);
    }
  }, [image, isUpdating, currentImage.id]);

  const isOwner = useMemo(() => {
    return currentImage.user_id === currentUserId;
  }, [currentImage.user_id, currentUserId]);

  const handleEditClick = useCallback(() => {
    setIsBottomSheetOpen(false);
    setIsModifyOpen(true);
  }, []);

  const handleMoreClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBottomSheetOpen(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  const bottomSheetActions = useMemo(() => {
    const actions: BottomSheetAction[] = [];
    
    if (isOwner) {
      actions.push({
        label: "수정하기",
        onClick: handleEditClick 
      });
      
      actions.push({
        label: "삭제하기",
        onClick: () => {
          if (window.confirm('정말 삭제하시겠습니까?')) {
            onDelete?.();
            handleCloseBottomSheet();
          }
        },
        color: colors.red100
      });
    } else {
      actions.push({
        label: "수정하기 (권한 없음)",
        onClick: () => {
          alert("수정 권한이 없습니다.");
          handleCloseBottomSheet();
        },
        color: colors.gray300
      });
      
      actions.push({
        label: "삭제하기 (권한 없음)",
        onClick: () => {
          alert("삭제 권한이 없습니다.");
          handleCloseBottomSheet();
        },
        color: colors.gray300
      });
    }
    
    actions.push({
      label: "공유하기",
      onClick: () => {
        onShare?.();
        handleCloseBottomSheet();
      }
    });
    
    return actions;
  }, [isOwner, handleEditClick, onDelete, onShare, handleCloseBottomSheet]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <CommonOverlay onClick={onClose}>
      <Content onClick={handleContentClick}>
        <CardSection>
          <InteractiveCard 
            image={{
              ...currentImage,
              image_url: getImageUrl(imageUrl)
            }} 
            isSelected 
            isLoaded={isImageLoaded}
          />
        </CardSection>
        <MoreSection>
          <More2Icon onClick={handleMoreClick} />
        </MoreSection>
        <ContentsSection>
          <Title>{currentImage.title}</Title>
          <Description>{currentImage.description}</Description>
          <Author>
            {currentImage.users?.nickname}
            {isOwner && <OwnerBadge>내 작품</OwnerBadge>}
          </Author>
        </ContentsSection>
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleCloseBottomSheet}
          actions={bottomSheetActions}
        />
        {isModifyOpen && (
          <CardModify
            image={currentImage}
            onClose={() => setIsModifyOpen(false)}
            onSave={handleModifySave}
          />
        )}
      </Content>
    </CommonOverlay>
  );
}

// 작성자 표시용 배지
const OwnerBadge = styled.span`
  margin-left: 8px;
  font-size: 0.6rem;
  background-color: ${colors.neon200};
  color: ${colors.black};
  padding: 2px 6px;
  border-radius: 10px;
`;