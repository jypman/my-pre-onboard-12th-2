import React, { useEffect } from "react";
import { useIssues } from "./useIssues";
import { Loading } from "../../components/Loading";
import { IssueList } from "./IssueList";
import { useInfinityScroll } from "../../hooks/useInfinityScroll";

export const Issues = () => {
  const { issues, page, updateIssues } = useIssues();
  const { scrollTargetFooter } = useInfinityScroll(() => {
    page.current++;
    updateIssues(page.current);
  });

  useEffect(() => {
    updateIssues(page.current);
  }, []);

  if (issues.issueList.length === 0 && !issues.isLoading)
    return <main>이슈 목록이 없습니다.</main>;

  return (
    <main>
      <IssueList issues={issues.issueList} />
      {issues.isLoading ? <Loading /> : <div ref={scrollTargetFooter} />}
    </main>
  );
};
