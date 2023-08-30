import { useEffect, useRef, useState } from "react";
import { getIssues, IResIssue } from "../../api/issues";

export const useIssues = () => {
  const [issues, setIssues] = useState<IResIssue[]>([]);
  const [isNewIssuesLoading, setIsNewIssuesLoading] = useState<boolean>(false);
  const page = useRef<number>(1);
  const perPage = 30;

  useEffect(() => {
    setIsNewIssuesLoading(true);
    getIssues(page.current, perPage).then((data: IResIssue[]) => {
      setIssues(data);
      setIsNewIssuesLoading(false);
    });
  }, []);

  return {
    issues,
    setIssues,
    isNewIssuesLoading,
    setIsNewIssuesLoading,
    page,
  };
};
