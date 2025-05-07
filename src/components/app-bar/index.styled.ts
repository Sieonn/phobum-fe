import styled from "styled-components";
import theme from "../../styles/theme";
import { colors } from "../../styles/colors";

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 20px;
  z-index: ${theme.zIndex.appBar};
  width: 100%;
  max-width: ${theme.size.maxWidth};//calc(${theme.size.maxWidth} - 50px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AppBarStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
`

export const UserPopup = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${colors.gray400};
  border-radius: 8px;
  padding: 10px 15px;
  min-width: 150px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: ${theme.zIndex.popup};
`;
export const UserItem = styled.div`
  width: 100%;
  font-size: 0.9rem;
  text-align: center;
  padding: 15px;

`

export const PopupItem = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 0.9rem;
  background: none;
  border: none;
  color: ${colors.white};
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 4px;

  &:hover {
    background-color: ${colors.gray300};
  }

  &:last-child {
    color: ${colors.red100};
  }
`;

export const PopupItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1.5px solid ${colors.gray300};
`