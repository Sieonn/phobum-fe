import styled from 'styled-components';
import { colors } from '../../styles/colors';
import theme from '../../styles/theme';
import { InputProps } from '.';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const InputStyled = styled.input<{ state: 'default' | 'error' }>`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0px 25px;
  font-size: 0.9rem;
  background-color: ${colors.gray300};
  outline: none;
  border-radius: ${theme.size.radius};
  color: #fff;
  border: 1px solid ${colors.gray300}; /* 기본 border 색상 */
  position: relative; /* 포지셔닝을 제대로 하기 위해 필요 */
  transition: border-color 0.3s ease;
  &&::placeholder{
    font-size: 0.7rem;
  }
  &:focus {
    border-color: ${({ state }) => (state === "default" ? colors.neon100 : colors.red100)};
  }

  &:focus + label {
    color: ${({ state }) => (state === "default" ? colors.neon100 : colors.red100)};
  }
`;

export const Label = styled.label<{ focused: boolean, state: 'default' | 'error' }>`
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: ${colors.gray200};
  pointer-events: none;
  transition: all 0.3s ease;
  opacity: 0;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 2px;
    background-color: ${colors.gray300};
    z-index: -1;
  }

  ${({ focused }) =>
    focused &&
    `
      opacity: 1;
      top: 0;
      font-size: 12px;
      z-index: 2; 
    `}
`;

export const Message = styled.div<{ state: 'default' | 'error' }>`
  font-size: 10px;
  font-family: 'Galmuri11';
  margin-left: 20px;
  margin-top: 5px;
  color: ${({ state }) => (state === "default" ? colors.neon100 : colors.red100)};
`;

export const Suffix = styled.div`
  z-index: 10; /* 높게 설정하여 클릭이 가능하도록 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경 */
  `;