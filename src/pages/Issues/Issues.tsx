import React, { useEffect, useRef } from "react";
import { Loading } from "../../components/Loading";
import { IssueList } from "./IssueList";
import { useInfinityScroll } from "../../hooks/useInfinityScroll";
import {
  useIssueListVal,
  useIssueListActions,
} from "../../providers/IssueListProvider";

export const Issues = () => {
  const { issueList, isLoading } = useIssueListVal();
  const { updateIssues } = useIssueListActions();
  const page = useRef<number>(1);
  const { scrollTargetFooter } = useInfinityScroll(() => {
    page.current++;
    updateIssues(page.current);
  });

  useEffect(() => {
    updateIssues(page.current);
  }, []);

  if (issueList.length === 0 && !isLoading)
    return <main>이슈 목록이 없습니다.</main>;

  return (
    <main>
      <IssueList issues={issueList} />
      {isLoading ? <Loading /> : <div ref={scrollTargetFooter} />}
    </main>
  );
};
