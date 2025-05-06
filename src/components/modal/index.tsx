import { CommonOverlay } from "../bottom-sheet/index.styled";
import { Button } from "../button";
import { ModalContainer, Overlay } from "./index.styled";
type ModalProps = {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
  };
export default function Modal({title, description,onConfirm, onCancel}: ModalProps) {
    return (
        <Overlay>
        <ModalContainer>
            <div style={{fontSize:'0.9rem'}}>{title}</div>
                <div style={{fontSize: '0.8rem'}}>{description}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px', height: '40px',  }}>
            <Button fullWidth onClick={onConfirm}>확인</Button>
            <Button fullWidth onClick={onCancel} >취소</Button>
                </div>
        </ModalContainer>
        </Overlay>
    )
}