import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigation = useNavigate();
  return (
    <StyledHome>
      <h1>홈페이지</h1>
      <div
        className="move-issues-page-btn"
        onClick={() => navigation("/issues")}
      >
        issues 목록 페이지로 이동
      </div>
    </StyledHome>
  );
};

const StyledHome = styled.main`
  text-align: center;
  .move-issues-page-btn {
    margin-top: 40px;
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
`;
