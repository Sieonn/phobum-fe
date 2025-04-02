import styled from '@emotion/styled';
import { colors } from '../../styles/colors';

export const Flex = styled.div<{
  direction?: string;
  justify?: string;
  align?: string;
  margin?: string;
  padding?: string;
  gap?: number;
  widthPer?: number;
  heightPer?: number;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  backgroundColor?: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? `${direction}` : 'row')};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  align-items: ${({ align }) => (align ? `${align}` : 'center')};
  gap: ${({ gap }) => (gap ? `${gap}px` : '0px')};
  width: ${({ width, widthPer }) =>
    width ? `${width}px` : widthPer ? `${widthPer}%` : '100%'};
  height: ${({ height, heightPer }) =>
    height ? `${height}px` : heightPer ? `${heightPer}%` : '100%'};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : '0px'};

  background-color: ${({ backgroundColor }) =>
    backgroundColor ?? `${colors.black}`};
`;

export const HeightFitFlex = styled(Flex)`
  height: fit-content;
`;

export const WidthFitFlex = styled(Flex)`
  width: fit-content;
`;

export const RelativeFlex = styled(Flex)`
  position: relative;
`;

export const AbsoluteFlex = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
`;

export const FixedFlex = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
`;