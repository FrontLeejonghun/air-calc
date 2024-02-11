import { type InputHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input`
  width: 100%;
  max-width: 220px;
  height: 20px;
  padding: 12px;
  border-radius: 12px;
  outline: 1px solid lightgrey;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px -18px;
  border: none;

  :focus {
    outline: 2px solid grey;
  }

  :hover {
    outline: 2px solid lightgrey;
    box-shadow: 0 0 20px -17px;
  }
`;

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ ...inputAttr }, ref) => {
    return <StyledInput ref={ref} {...inputAttr} />;
  },
);

Input.displayName = 'Input';

export default Input;
