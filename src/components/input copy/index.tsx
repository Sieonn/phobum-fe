import { InputWrapper, InputStyled, Label, Message, Suffix } from './index.styled';
import { useState, InputHTMLAttributes, ReactNode } from 'react';
import { Button } from '../button';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  state?: 'default' | 'error' ;
  prefix?: ReactNode;
  suffix?: ReactNode;
  label: string;
  message?: string;
  value: string;
  type?: 'default' | 'textarea';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function Input2({
  label,
  message,
  prefix,
  suffix,
  state = 'default',
  value,
  onChange,
  type = 'default',
  disabled = false,
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
          type={type}
          disabled={disabled}
          readOnly={disabled} 
          required
        />
        <Label focused={shouldLabelBeUp} state={state} type={type}>
          {label}
        </Label>
        {suffix && <Suffix>{suffix}</Suffix>}
      </InputWrapper>
      {message && <Message state={state}>{message}</Message>}
    </div>
  );
}
