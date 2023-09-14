import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDetailIssue } from "./useDetailIssue";
import styled from "styled-components";
import { IssueItem } from "../Issues/IssueItem";
import { MarkDown } from "../../components/MarkDown";
import { Loading } from "../../components/Loading";

export const DetailIssue = () => {
  const { id } = useParams();
  const { detailIssue, initDetailedIssue } = useDetailIssue();
  const dateFormat = new Intl.DateTimeFormat("ko", { dateStyle: "long" });

  useEffect(() => {
    initDetailedIssue(id as string);
  }, []);

  if (detailIssue.isLoading) return <Loading />;
  if (!detailIssue.issue)
    return (
      <StyledNotFoundDetailIssue>
        <div>해당 이슈를 찾을 수 없습니다.</div>
      </StyledNotFoundDetailIssue>
    );

  return (
    <StyledDetailIssue>
      <div>
        <div className="thumbnail-content">
          <img src={detailIssue.issue.user.avatar_url} alt="프로필 이미지" />
          <IssueItem
            title={detailIssue.issue.title}
            number={detailIssue.issue.number}
            comments={detailIssue.issue.comments}
            updatedAt={dateFormat.format(
              new Date(detailIssue.issue.updated_at),
            )}
            userName={detailIssue.issue.user.login}
          />
        </div>
      </div>
      <MarkDown content={detailIssue.issue.body} />
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
