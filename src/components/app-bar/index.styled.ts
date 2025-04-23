import styled from "styled-components";
import theme from "../../styles/theme";
export const Wrapper = styled.header`
  position: absolute;
  top: 0;
  margin: 0 auto;
padding: 0 20px;
  z-index: ${theme.zIndex.appBar};
  width: 100%;
  height: ${theme.size.appBarHeight};
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
`