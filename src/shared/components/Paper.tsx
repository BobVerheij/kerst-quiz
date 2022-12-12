import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ShredFilter } from "./ShredFilter";

interface IPaper {
  shredded?: boolean;
  color?: string;
}

const PaperStyled = styled.div<{ shredded?: boolean }>`
  width: 120px;
  height: 180px;
  background-color: black;
  overflow: hidden;
  padding: 1rem 0.5rem;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
`;

const LineStyled = styled.div<{ val?: number; color?: string }>`
  min-height: 0.25rem;
  width: ${({ val }) => (val || 1) * 0.5}px;
  background-color: ${({ color }) => color || "#fff"};
`;

export const Paper = ({ color = "#fff", shredded }) => {
  const [randValues, setRandValues] = useState<number[]>([]);

  useEffect(() => {
    setRandValues(
      new Array(Math.floor(Math.random() * 10) + 1)
        .fill("")
        .map((_) => Math.round(Math.random() * 100) + 10)
    );
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <PaperStyled shredded={shredded}>
        {randValues.map((val, index) => (
          <LineStyled key={index} val={val} color={color} />
        ))}
      </PaperStyled>
    </div>
  );
};
