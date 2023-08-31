import React from "react";
import { useParams } from "react-router-dom";
import { useDetailIssue } from "./useDetailIssue";
import styled from "styled-components";
import { IssueItem } from "../Issues/IssueItem";
import { MarkDown } from "../../components/MarkDown";
import { Loading } from "../../components/Loading";

export const DetailIssue = () => {
  const { id } = useParams();
  const { detailIssue, isDetailIssueLoading } = useDetailIssue(id as string);
  const dateFormat = new Intl.DateTimeFormat("ko", { dateStyle: "long" });

  if (isDetailIssueLoading) return <Loading />;
  if (!detailIssue)
    return (
      <StyledNotFoundDetailIssue>
        <div>해당 이슈를 찾을 수 없습니다.</div>
      </StyledNotFoundDetailIssue>
    );

  return (
    <StyledDetailIssue>
      <div>
        <div className="thumbnail-content">
          <img src={detailIssue.user.avatar_url} alt="프로필 이미지" />
          <IssueItem
            title={detailIssue.title}
            number={detailIssue.number}
            comments={detailIssue.comments}
            updatedAt={dateFormat.format(new Date(detailIssue.updated_at))}
            userName={detailIssue.user.login}
          />
        </div>
      </div>
      <MarkDown content={detailIssue.body} />
    </StyledDetailIssue>
  );
};

const StyledDetailIssue = styled.main`
  .thumbnail-content {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 65px;
      height: 65px;
    }
  }
`;

const StyledNotFoundDetailIssue = styled.main`
  text-align: center;
  font-weight: 700;
  color: red;
`;
