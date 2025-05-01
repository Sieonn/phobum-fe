import { useCallback, useState, useMemo } from "react";
import { ImageResponse } from "../../../../api/images";
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
  onEdit?: (updatedImage: Partial<ImageResponse>) => void;
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
  const isOwner = useMemo(() => {
    return image.user_id == currentUserId;
  }, [image.user_id, currentUserId]);

  const handleEditClick = useCallback(() => {
    setIsBottomSheetOpen(false);
    setIsModifyOpen(true);
  }, []);

  const handleModifySave = useCallback((updatedImage: Partial<ImageResponse>) => {
    onEdit?.(updatedImage);
    setIsModifyOpen(false);
  }, [onEdit]);

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

  return (
    <CommonOverlay onClick={onClose}>
      <Content onClick={handleContentClick}>
        <CardSection>
          <InteractiveCard image={image} isSelected />
        </CardSection>
        <MoreSection>
          <More2Icon onClick={handleMoreClick} />
        </MoreSection>
        <ContentsSection>
          <Title>{image.title}</Title>
          <Description>{image.description}</Description>
          <Author>
            {image.users.nickname}
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
            image={image}
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