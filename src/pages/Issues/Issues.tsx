import React, { useEffect } from "react";
import { useIssues } from "./useIssues";
import { getIssues } from "../../api/issues";
import { Loading } from "../../components/Loading";
import { IssueList } from "./IssueList";
import { useInfinityScroll } from "../../hooks/useInfinityScroll";

export const Issues = () => {
  const { issues, setIssues, isNewIssuesLoading, setIsNewIssuesLoading, page } =
    useIssues();
  const { scrollTargetFooter } = useInfinityScroll(() => {
    setIsNewIssuesLoading(true);
  });

  const getItems = async () => {
    page.current++;
    const newData = await getIssues(page.current);
    setIssues((prevState) => [...prevState, ...newData]);
    setIsNewIssuesLoading(false);
  };

  useEffect(() => {
    if (isNewIssuesLoading) {
      getItems();
    }
  }, [isNewIssuesLoading]);

  if (issues.length === 0 && !isNewIssuesLoading)
    return <main>이슈 목록이 없습니다.</main>;

  return (
    <main>
      <IssueList issues={issues} />
      {isNewIssuesLoading ? <Loading /> : <div ref={scrollTargetFooter} />}
    </main>
  );
};
