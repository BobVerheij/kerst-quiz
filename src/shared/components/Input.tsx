import React from "react";
import styled, { css } from "styled-components";

const InputStyled = styled.input<{ square?: boolean }>`
  all: unset;

  position: relative;
  border: 0.25rem solid black;
  padding: 0.5rem;
  text-align: center;
  background-color: ${({ color }) => color || "#fff"};
  user-select: none;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  border-radius: none !important;
  outline: none;

  font-size: 1.5rem;
  z-index: 2;

  ${({ square }) =>
    square &&
    css`
      width: 3rem;
      flex-basis: auto;
      margin-left: auto;
    `}
`;

export const Input = ({
  type,
  handleChange,
  placeholder,
}: {
  type: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <InputStyled
      placeholder={placeholder}
      onChange={(e) => {
        handleChange(e);
      }}
      type={type}
      square={type === "color"}
    ></InputStyled>
  );
};
