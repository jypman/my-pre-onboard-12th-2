import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <StyledHeader>
      <div>FaceBook / React</div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  font-weight: 700;
  font-size: 25px;
`;
