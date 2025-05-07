import styled from "styled-components";
import { colors } from "../../styles/colors";
import theme from "../../styles/theme";

export const ModalContainer = styled.div`
    margin: auto;
    background-color: ${colors.gray400};
    border-radius: 8px;
    padding: 30px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    width: 70%;
    max-width: 380px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${theme.zIndex.modal};
    gap: 20px;
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: ${theme.zIndex.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalButton = styled.button`
    width: 100%;
    border-radius: 30px;
`