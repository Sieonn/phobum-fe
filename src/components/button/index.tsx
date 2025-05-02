import { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import { Wrapper } from './Button.styled'; // 스타일을 따로 가져옵니다.
export type ButtonStatus = 'default' | 'active' | 'pressed' | 'error' | 'disabled';
export type ButtonSize = 's' | 'm' | 'l'
export type State = 'default' | 'error';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: ButtonStatus;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  state?: State;
  radius?: string;
  style?: CSSProperties;
}

export function Button({ status = 'default', size = 'l', fullWidth = false, state = 'default',radius ,children,style, ...props }: ButtonProps) {
  return (
    <Wrapper status={status} size={size} fullWidth={fullWidth} state={state} radius={radius} style={style} {...props}>
        {children}
    </Wrapper>
  );
}
