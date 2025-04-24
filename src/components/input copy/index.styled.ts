import styled from 'styled-components';
import { colors } from '../../styles/colors';
import theme from '../../styles/theme';
import { InputProps } from '.';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const InputStyled = styled.input.attrs((props: any) => ({
  as: props.type === 'textarea' ? 'textarea' : 'input',
}))<{ state: 'default' | 'error'; type: 'default' | 'textarea' }>`
  width: 100%;
  font-size: 0.9rem;
  background-color: ${colors.gray300};
  outline: none;
  border-radius: ${theme.size.radius};
  color: #fff;
  border: 1px solid ${colors.gray300};
  transition: border-color 0.3s ease;

  padding: ${({ type }) => (type === 'textarea' ? '20px' : '0px 20px')};
  height: ${({ type }) => (type === 'textarea' ? '20dvh' : '50px')};
  resize: none;
  line-height: 1.5;
  z-index: 1;

  &&::placeholder{
     font-size: 0.7rem;
     ${({ type }) =>
     type === 'textarea' &&
     `
      transform: translateY(-30%);
       align-self: flex-start;
       text-align: start;
    `}
   }   &:focus {
     border-color: ${({ state }) => (state === "default" ? colors.neon100 : colors.red100)};
   }

  &:focus + label {
    color: ${({ state }) => (state === "default" ? colors.neon100 : colors.red100)};
  }

  &:read-only {
  background-color: ${colors.gray300};
  color: ${colors.neon100};
  cursor: not-allowed;
}
`;


export const Label = styled.label<{
  focused: boolean;
  state: 'default' | 'error';
  type: 'default' | 'textarea';
}>`
  position: absolute;
  left: 25px;
  top: ${({ type }) => (type === 'textarea' ? '10%' : '50%')};
  transform: translateY(-50%);
  font-size: 14px;
  color: ${colors.gray200};
  pointer-events: none;
  transition: all 0.3s ease;
  opacity: 0;
  background-color: transparent;
  //${colors.gray300}; 

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;//${({ type }) => (type === 'textarea' ? '10%' : '50%')};
    width: 100%;
    height: 2px;
    background-color: ${colors.gray300};
    z-index: -1;
  }

  ${({ focused }) => focused && `
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