import { useCallback, useState } from "react";
import { ImageResponse, imagesApi } from "../../../../api/images";
import { colors } from "../../../../styles/colors";
import { InteractiveCard } from "../InteractiveCard";
import BottomSheet, { BottomSheetAction } from "../../../../components/bottom-sheet";
import { CommonOverlay } from "../../../../components/bottom-sheet/index.styled";
import { Author, CardSection, Content, ContentsSection, Description, More2Icon, MoreSection, Title } from "./index.styled";

interface CardDetailProps {
  image: ImageResponse;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}

export default function CardDetail({ image, onClose, onEdit, onDelete, onShare }: CardDetailProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleMoreClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBottomSheetOpen(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  const handleCardDelete = useCallback(() => {
    imagesApi.delete(image.id)
      .then(() => {
        alert("삭제되었습니다.");
        onClose();
        onDelete?.();
      })
      .catch(err => {
        console.error("삭제 실패:", err);
        alert("삭제에 실패했습니다.");
      });
  }, [image.id, onClose, onDelete]);

  const bottomSheetActions: BottomSheetAction[] = [
    {
      label: "수정하기",
      onClick: () => {
        onEdit?.();
        handleCloseBottomSheet();
      }
    },
    {
      label: "삭제하기",
      onClick: handleCardDelete,
      color: colors.red100
    },
    {
      label: "공유하기",
      onClick: () => {
        onShare?.();
        handleCloseBottomSheet();
      }
    }
  ];

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
          <Author>{image.users.nickname}</Author>
        </ContentsSection>
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleCloseBottomSheet}
          actions={bottomSheetActions}
        />
      </Content>
    </CommonOverlay>
  );
}