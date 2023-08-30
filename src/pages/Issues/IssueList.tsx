import React from "react";
import { IResIssue } from "../../api/issues";
import { IssueItem } from "./IssueItem";
import { Ads } from "../../components/Ads";

interface IssueListProps {
  issues: IResIssue[];
}

export const IssueList = ({ issues }: IssueListProps) => {
  const indexWhereAdsArePlaced = 4;
  const dateFormat = new Intl.DateTimeFormat("ko", { dateStyle: "long" });

  if (issues.length === 0) return null;

  return (
    <section>
      {issues.reduce((acc: React.ReactElement[], issue: IResIssue, index) => {
        const IssueListComponent: React.ReactElement = (
          <IssueItem
            key={`issue-${issue.id}`}
            title={issue.title}
            number={issue.number}
            comments={issue.comments}
            updatedAt={dateFormat.format(new Date(issue.updated_at))}
            userName={issue.user.login}
          />
        );

        return index > 0 && index % indexWhereAdsArePlaced === 0
          ? [...acc, <Ads key={`ads-${issue.id}`} />, IssueListComponent]
          : [...acc, IssueListComponent];
      }, [])}
    </section>
  );
};
