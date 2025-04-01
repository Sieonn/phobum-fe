import { colors } from '../../styles/colors';
import theme from '../../styles/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-width: ${theme.size.minWidth};
  max-width: ${theme.size.maxWidth};
  height: 100vh;
  margin: 0 auto;
  overscroll-behavior-y: auto;
  background-color: ${colors.black};
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: ${theme.size.appBarHeight} 25px 30px 25px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
