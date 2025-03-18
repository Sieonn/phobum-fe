import styled, { css } from 'styled-components';
import { colors } from '../../styles/colors';
import { ButtonSize, ButtonStatus,State } from '.';
import theme from '../../styles/theme';

interface WrapperProps {
  status: ButtonStatus;
  fullWidth: boolean;
  size: ButtonSize;
  state : State;
}

// box 함수 스타일을 함수형으로 작성
const box = ({ fullWidth, size, state }: WrapperProps) => css`
  padding: 15px 25px;
  border-radius: 30px;
  cursor: pointer;

  ${size === 's' &&
  css`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 20px;
    ${theme.typo.body100}
    color: black;
    background-color: ${state === 'default' ? `${colors.neon100}` : `${colors.red100}`};
    border: none;
  `}
  
  ${fullWidth &&
  css`
    width: 100%;
  `}
`;

export const Wrapper = styled.button<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;


  ${props => {
    switch (props.status) {
      case 'default':
        return base;
      case 'active':
        return active;
      case 'pressed':
        return pressed;
      case 'disabled':
        return disabled;
      case 'error':
        return error;
      default:
        return base;
    }
  }}

  transition: background 0.5s ease;

  ${box}; /* box 스타일을 함수로 전달할 때 props를 자동으로 참조 */
`;

const base = css<WrapperProps>`
  border: 1px solid ${colors.neon100};
  background: none;
  cursor: pointer;
  color: ${colors.gray200};

  &:hover {
    background-color: ${({ state }) => (state === 'default' ? colors.neon200 : colors.red200)};
    color: ${colors.black};
  }
`;

const active = css`
  color: ${colors.black};
  border: 1px solid ${colors.neon100};
  background: ${colors.neon100};
  cursor: pointer;
`;

const pressed = css`
  color: ${colors.black};
  background: ${colors.neon200};
  border: none;
`;

const disabled = css`
  color: ${colors.gray200};
  border: 1px solid ${colors.gray200};
  background: none;
  cursor: default;
`;

const error = css`
  color: ${colors.black};
  background-color: ${colors.red100};
  border: none;

  &:hover {
    background: ${colors.red200};
  }
`;
