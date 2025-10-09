import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  type: 'email' | 'password' | 'text' | 'number' | 'tel' | 'url';
}

export const TextInput = ({
  type = 'text',
  isInvalid = false,
  ...props
}: TextInputProps) => {
  return (
    <input
      type={type}
      aria-invalid={isInvalid}
      className="input validator"
      {...props}
    />
  );
};
