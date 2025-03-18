import { InputWrapper, InputStyled, Label, Message } from './index.styled';
import { useState, InputHTMLAttributes } from 'react';
import { Button } from '../button';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  state?: 'default' | 'error'; // 메시지 상태 (default, error)
  label: string;
  btn?: boolean;
  message?: string;
  climit?: number;
  btnName?: string;
  defaultValue?: string; // 기본값을 위한 속성
}

export function Input({
  label,
  btn,
  message,
  state = 'default',
  btnName,
  defaultValue = '', // 기본값 설정
}: InputProps) {
  const [inputValue, setInputValue] = useState<string>(defaultValue); // 내부 상태로 value 관리
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // Label이 올라갈 조건
  const shouldLabelBeUp = isFocused || inputValue.length > 0;

  return (
    <div>
      <InputWrapper>
        <InputStyled
          state={state}
          value={inputValue} // 상태값 연결
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange} // 값 변경 이벤트 핸들러
          required
        />
        <Label focused={shouldLabelBeUp} state={state}>
          {label}
        </Label>

        {btn && (
          <Button size="s" status="default" state={state}>
            {btnName}
          </Button>
        )}
      </InputWrapper>

      {message && (
        <Message state={state}>
          {message}
        </Message>
      )}
    </div>
  );
}
