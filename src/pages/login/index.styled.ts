import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  padding: 20px 30px ${theme.size.appBarHeight} 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 아이템들 간의 간격을 좀 더 넓게 설정 */
  box-sizing: border-box; /* 패딩을 포함한 width 계산 */
  flex:1
`;
