import React, { useEffect, useRef } from "react";
import { useIssues } from "./useIssues";
import styled from "styled-components";
import { getIssues } from "../../api/issues";
import { Loading } from "../../components/Loading";
import { IssueList } from "./IssueList";

export const Issues = () => {
  const { issues, setIssues, isNewIssuesLoading, setIsNewIssuesLoading, page } =
    useIssues();
  const scrollTargetFooter = useRef<HTMLDivElement>(null);

  const getItems = async () => {
    page.current++;
    const newData = await getIssues(page.current);
    setIssues((prevState) => [...prevState, ...newData]);
    setIsNewIssuesLoading(false);
  };

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsNewIssuesLoading(true);
    }
  };

  useEffect(() => {
    if (isNewIssuesLoading) {
      getItems();
    }
  }, [isNewIssuesLoading]);

  useEffect(() => {
    if (!scrollTargetFooter.current) return;

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 1,
    });

    observer.observe(scrollTargetFooter.current);

    return () => observer && observer.disconnect();
  }, [scrollTargetFooter, onIntersect, isNewIssuesLoading]);

  return (
    <StyledIssues>
      <IssueList issues={issues} />
      {isNewIssuesLoading ? <Loading /> : <div ref={scrollTargetFooter} />}
    </StyledIssues>
  );
};

const StyledIssues = styled.main`
  //
`;
