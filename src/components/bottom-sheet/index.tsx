import styled from "styled-components"
import { colors } from "../../styles/colors"
import { ActionButton, ActionsContainer, CommonOverlay, Container, DimmedOverlay, Handle } from "./index.styled";
import { useEffect, useState } from "react";
export type BottomSheetAction = {
    label: string;
    onClick: () => void;
    color?: string;
  };

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    actions: BottomSheetAction[];
}

export default function BottomSheet({ isOpen, onClose, actions }: BottomSheetProps) {
    const [visible, setVisible] = useState(isOpen);
    useEffect(() => {
        if (isOpen) setVisible(true);
      }, [isOpen]);
    
      const handleTransitionEnd = () => {
        if (!isOpen) setVisible(false);
      };
    
      if (!visible) return null;
    return (
        <>
        <DimmedOverlay $isOpen={isOpen} onClick={onClose}/>
            <Container $isOpen={isOpen} onTransitionEnd={handleTransitionEnd}>
                <Handle />
                <ActionsContainer>
                    {actions.map((action, index) => (
                        <ActionButton
                            key={`action-${index}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                action.onClick();
                            }}
                            $color={action.color}
                        >
                            {action.label}
                        </ActionButton>
                    ))}
                </ActionsContainer>
            </Container>
        </>
    );
}
