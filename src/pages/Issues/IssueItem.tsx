import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface IssueListProps {
  title: string;
  number: number;
  userName: string;
  updatedAt: string;
  comments: number;
}
export const IssueItem = ({
  title,
  number,
  userName,
  updatedAt,
  comments,
}: IssueListProps) => {
  const navigate = useNavigate();

  return (
    <StyledIssueList onClick={() => navigate(`/issues/${number}`)}>
      <div>
        <div className="title">
          <span data-testid="number">#{number}</span>
          <br />
          <span data-testid="title">{title}</span>
        </div>
        <div className="sub-info">
          <span data-testid="author">작성자: {userName}</span>,
          <span data-testid="updateAt">작성일: {updatedAt}</span>
        </div>
      </div>
      <div className="comments" data-testid="comment">
        코멘트: {comments}
      </div>
    </StyledIssueList>
  );
};

const StyledIssueList = styled.section`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid black;

  .title {
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .sub-info {
    font-size: 14px;
    font-weight: 400;
    color: #8b8383;
  }

  .comments {
    color: green;
  }
`;
