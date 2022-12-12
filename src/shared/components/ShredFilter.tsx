import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  height: 200px;
  position: absolute;
  width: 100%;
  right: 0;
  left: 0;
  top: 100%;
  pointer-events: none;
`;

const Shutter = styled.div<{ color?: string }>`
  width: 0.25rem;
  height: 100%;
  background-color: ${({ color }) => color || "#fff"};
`;

interface IShredFilter {
  color?: string;
}

export const ShredFilter = ({ color }: IShredFilter) => {
  return (
    <Wrapper>
      {new Array(20).fill("").map((_, index) => (
        <Shutter key={index} color={color} />
      ))}
    </Wrapper>
  );
};
