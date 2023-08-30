import React from "react";
import styled from "styled-components";

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
  return (
    <StyledIssueList>
      <div>
        <div className="title">
          #{number} {title}
        </div>
        <div className="sub-info">
          작성자: {userName}, 작성일: {updatedAt}
        </div>
      </div>
      <div className="comments">코멘트: {comments}</div>
    </StyledIssueList>
  );
};

const StyledIssueList = styled.section`
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
