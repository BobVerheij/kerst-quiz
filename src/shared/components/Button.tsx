import React, { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
`;

const ButtonStyled = styled.div<{ color?: string }>`
  position: relative;
  border: 0.25rem solid black;
  padding: 0.5rem;
  text-align: center;
  background-color: ${({ color }) => color || "#fff"};
  user-select: none;
  cursor: pointer;

  font-size: 1.5rem;
  z-index: 2;

  transition: background-color 1s ease-in;
`;

interface IButton {
  label: string;
  color?: string;
  handleClick: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}

export const Button = ({
  label,
  color,
  handleClick,
  children,
  style,
}: IButton) => {
  return (
    <Wrapper style={style}>
      <ButtonStyled onClick={handleClick} color={color}>
        {label}
      </ButtonStyled>
      {children}
    </Wrapper>
  );
};
