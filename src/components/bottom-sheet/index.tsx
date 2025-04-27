import styled from "styled-components"
import { colors } from "../../styles/colors"
import { ActionButton, ActionsContainer, CommonOverlay, Container, DimmedOverlay, Handle } from "./index.styled";
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
    if (!isOpen) return null;
    return (
        <>
        <DimmedOverlay $isOpen={isOpen} onClick={onClose}/>
            <Container $isOpen={isOpen}>
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
