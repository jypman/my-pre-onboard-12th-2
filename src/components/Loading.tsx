import React from "react";
import styled from "styled-components";

export const Loading = () => {
  return <StyledLoading>로딩중...</StyledLoading>;
};

const StyledLoading = styled.section`
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
`;
