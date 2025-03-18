import styled from "styled-components";
import theme from "../../styles/theme";
export const Wrapper = styled.header`
    position: fixed;
  top: 0;
  margin: 0 auto;
  z-index: ${theme.zIndex.appBar};
  width: 100%;
  height: ${theme.size.appBarHeight};
  max-width: ${theme.size.maxWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  gap: 16px;
`;

export const AppBarStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`