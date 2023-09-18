import React from "react";
import { IResIssue } from "../../api/issues";
import { IssueItem } from "./IssueItem";
import { Ads } from "../../components/Ads";
import { getDateTimeFormat } from "../../utils";

interface IssueListProps {
  issues: IResIssue[];
}

export const IssueItemWrapper = ({ issues }: IssueListProps) => {
  const AD_EXPOSE_INTERVAL = 4;
  const isAdSection = (issueIndex: number) =>
    issueIndex > 0 && issueIndex % AD_EXPOSE_INTERVAL === 0;

  return (
    <section data-testid="issues-wrapper">
      {issues.reduce(
        (acc: React.ReactElement[], issue: IResIssue, issueIndex) => {
          const IssueListComponent: React.ReactElement = (
            <IssueItem
              key={`issue-${issue.id}`}
              title={issue.title}
              number={issue.number}
              comments={issue.comments}
              updatedAt={getDateTimeFormat("ko", issue.updated_at)}
              userName={issue.user.login}
            />
          );

          return isAdSection(issueIndex)
            ? [...acc, <Ads key={`ads-${issue.id}`} />, IssueListComponent]
            : [...acc, IssueListComponent];
        },
        [],
      )}
    </section>
  );
};
