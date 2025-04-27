import styled, { css } from "styled-components";
import { ImageResponse } from "../../../../api/images";
import { colors } from "../../../../styles/colors";
import { InteractiveCard, neonAnimation } from "../InteractiveCard";
import { More, More2 } from "../../../../assets/svg";
import { useCallback, useState } from "react";
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

export default function CardDetail({ image, onClose,onEdit,
  onDelete,
  onShare  }: CardDetailProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleMoreClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBottomSheetOpen(true);
  }, []);

  const bottomSheetActions: BottomSheetAction[] = [
    {
        label: "수정하기",
        onClick: () => {
            onEdit?.();
            setIsBottomSheetOpen(false);
        }
    },
    {
        label: "삭제하기",
        onClick: () => {
            onDelete?.();
            setIsBottomSheetOpen(false);
        },
        color: colors.red100
    },
    {
        label: "공유하기",
        onClick: () => {
            onShare?.();
            setIsBottomSheetOpen(false);
        }
    }
];

  return (
    <CommonOverlay onClick={onClose}>
    <Content onClick={(e) => e.stopPropagation()}>
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
        onClose={() => setIsBottomSheetOpen(false)}
        actions={bottomSheetActions}
      />
    </Content>
  </CommonOverlay>
  );
}
