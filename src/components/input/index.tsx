import { InputWrapper, InputStyled, Label, Message, Suffix } from './index.styled';
import { useState, InputHTMLAttributes, ReactNode } from 'react';
import { Button } from '../button';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  state?: 'default' | 'error';
  prefix?: ReactNode;
  suffix?: ReactNode;
  label: string;
  message?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  message,
  prefix,
  suffix,
  state = 'default',
  value,
  onChange,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Label이 올라갈 조건
  const shouldLabelBeUp = isFocused || value?.length > 0;

  return (
    <div>
      <InputWrapper>
        {prefix && prefix}
        <InputStyled
          {...props}
          state={state}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
        <Label focused={shouldLabelBeUp} state={state}>
          {label}
        </Label>
        {suffix && <Suffix>{suffix}</Suffix>}
      </InputWrapper>
      {message && <Message state={state}>{message}</Message>}
    </div>
  );
}
