import { colors } from '../../styles/colors';
import theme from '../../styles/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  min-width: ${theme.size.minWidth};
  max-width: ${theme.size.maxWidth}; 
  margin: 0 auto;
  overscroll-behavior-y: auto;
  background-color: ${colors.black};
  margin: auto;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  padding: ${theme.size.appBarHeight} 0 30px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  /* margin: auto;
  justify-content: center; */
`;
