import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <StyledHeader>
      <div>8team / pre-onboarding-12th-2-8</div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
`;
