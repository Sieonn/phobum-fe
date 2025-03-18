import { typography } from '../../styles/typography';
import { HTMLAttributes, ReactNode } from 'react';
import { StyledText } from './Text.styled';
import { colors } from '../../styles/colors';

type Typo = keyof typeof typography;
type Color = keyof typeof colors;

interface InputProps extends HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  typo: Typo;
  children: ReactNode;
}

export function Text({ color, typo, children, ...props }: InputProps) {
  return (
    <StyledText color={color} typo={typo} {...props}>
      {children}
    </StyledText>
  );
}
