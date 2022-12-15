import React from "react";
import styled, { css } from "styled-components";

const InputStyled = styled.input<{ square?: boolean; bgColor?: string }>`
  all: unset;

  position: relative;
  border: 0.25rem solid black;
  padding: 0.5rem;
  text-align: center;

  background-color: ${({ bgColor }) => bgColor || "blanchedAlmond"};

  user-select: none;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  outline: none;

  font-size: 1.5rem;
  z-index: 2;

  box-sizing: border-box;

  transition: background-color 1s ease-in;

  ${({ square }) =>
    square &&
    css`
      width: 3rem;
      flex-basis: auto;
      margin-left: auto;
    `}
`;

export const Input = ({
  value,
  color,
  type,
  handleChange,
  placeholder,
}: {
  value?: string;
  color?: string;
  type: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <InputStyled
      value={value}
      bgColor={color}
      placeholder={placeholder}
      onChange={(e) => {
        handleChange(e);
      }}
      type={type}
      square={type === "color"}
    ></InputStyled>
  );
};
