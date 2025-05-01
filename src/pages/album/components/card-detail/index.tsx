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

  const handleModifySave = useCallback(async (updatedImage: ImageResponse) => {
    if (!currentImage) return;
    
    try {
      setIsUpdating(true);
      
      // 현재 컴포넌트의 상태 업데이트
      setCurrentImage(updatedImage);
      
      // 부모 컴포넌트에도 업데이트 알림
      if (onEdit) {
        onEdit(updatedImage);
      }
      
      // 수정 모달 닫기
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
    if (!isUpdating) {
      setCurrentImage(image);
    }
  }, [image, isUpdating]);

  const isOwner = useMemo(() => {
    return currentImage.user_id == currentUserId;
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

  const bottomSheetActions: BottomSheetAction[] = useMemo(() => {
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
      // 권한 없는 사용자에게는 비활성화된 버튼 표시
      actions.push({
        label: "수정하기 (권한 없음)",
        onClick: () => {
          alert("수정 권한이 없습니다.");
          handleCloseBottomSheet();
        },
        color: colors.gray300 // 비활성화된 색상
      });
      
      actions.push({
        label: "삭제하기 (권한 없음)",
        onClick: () => {
          alert("삭제 권한이 없습니다.");
          handleCloseBottomSheet();
        },
        color: colors.gray300 // 비활성화된 색상
      });
    }
    
    // 공유하기는 모든 사용자에게 활성화
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

  const getImageUrl = (url: string) => {
    if (!url) return '/images/default-image.png';
    
    // Blob URL인 경우 그대로 반환
    if (url.startsWith('blob:')) {
      return url;
    }
    
    // 이미 URL에 쿼리 파라미터가 있는지 확인
    if (url.includes('?')) {
      return url;
    }
    return `${url}?t=${new Date().getTime()}`;
  };



  return (
    <CommonOverlay onClick={onClose}>
      <Content onClick={handleContentClick}>
        <CardSection>
          <InteractiveCard 
            image={{
              ...currentImage,
              image_url: getImageUrl(currentImage.image_url)
            }} 
            isSelected 
     
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