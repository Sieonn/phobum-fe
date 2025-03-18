import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Wrapper } from './Button.styled'; // 스타일을 따로 가져옵니다.
import { Text } from '../text';
export type ButtonStatus = 'default' | 'active' | 'pressed' | 'error' | 'disabled';
export type ButtonSize = 's' | 'm' | 'l'
export type State = 'default' | 'error';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: ButtonStatus;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  state? : State;
}

export function Button({ status = 'default', size = 'l', fullWidth = false, state = 'default' ,children, ...props }: ButtonProps) {
  return (
    <Wrapper status={status} size={size} fullWidth={fullWidth} state={state} {...props}>
        {children}
    </Wrapper>
  );
}
