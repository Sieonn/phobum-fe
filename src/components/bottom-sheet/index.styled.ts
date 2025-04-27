import styled from "styled-components";
import { colors } from "../../styles/colors";
import theme from "../../styles/theme";

export const CommonOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommonButton = styled.button`
  width: 100%;
  padding: 16px;
  background: none;
  border: none;
  color: white;
  font-size: 0.8rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray300};
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
// BottomSheet용 반투명 오버레이 스타일 수정
export const DimmedOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

export const Handle = styled.div`
  width: 50px;
  height: 4px;
  background-color: ${colors.gray200};
  border-radius: 2px;
  margin: 15px auto 0px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px 0;
  transform: translateY(0);
  transition: all 0.2s ease-out;
`;

export const ActionButton = styled.button<{ $color?: string }>`
    /* width: 100%; */
    padding: 10px;
    text-align: left;
    background: none;
    border: none;
    color: ${props => props.$color || colors.white};
    font-size: 0.7rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${colors.gray300};
    }

    &:active {
        background-color: ${colors.gray200};
    }
`;

export const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, ${({ $isOpen }) => ($isOpen ? "0%" : "100%")});
  width: 100%;
  max-width: ${theme.size.maxWidth};
  min-width: ${theme.size.minWidth};
  /* min-height: 200px; */
  background: ${colors.gray400};
  border-radius: 20px 20px 0 0;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  padding: 0 20px;
 // padding-bottom: calc(env(safe-area-inset-bottom, 20px) + 20px);
  will-change: transform;
  display: flex;
  flex-direction: column;

  /* @supports (-webkit-touch-callout: none) {
    //iOS 디바이스에만 적용
    //min-height: 250px;
    //padding-bottom: max(env(safe-area-inset-bottom), 34px);
  }

  @media screen and (max-height: 667px) {
    //iPhone SE, iPhone 8 등 작은 화면
    //min-height: 180px;
  }

  @media screen and (min-height: 844px) {
    //iPhone 12 이상의 큰 화면
    //min-height: 300px;
    //padding-bottom: max(env(safe-area-inset-bottom), 34px);
  } */
`;