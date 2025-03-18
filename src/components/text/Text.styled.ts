import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
interface StyledTextProps {
  color?: keyof typeof colors;
  typo: keyof typeof typography;
}

// 스타일 정의
export const StyledText = styled.span<StyledTextProps>`
  align-content: center;
  color: ${({ color }) => (color ? colors[color] : colors.white)}; // 기본값은 black
  ${({ typo }) => typography[typo]}// typography 스타일 적용
`;
