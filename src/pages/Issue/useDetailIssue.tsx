import { useEffect, useState } from "react";
import { getDetailedIssue, IResIssue } from "../../api/issues";

export const useDetailIssue = (issueNumber: string | number) => {
  const [detailIssue, setDetailIssue] = useState<IResIssue>();
  const [isDetailIssueLoading, setIsDetailIssueLoading] =
    useState<boolean>(false);

  useEffect(() => {
    setIsDetailIssueLoading(true);
    getDetailedIssue(issueNumber).then((data: IResIssue) => {
      setDetailIssue(data);
      setIsDetailIssueLoading(false);
    });
  }, []);

  return {
    detailIssue,
    setDetailIssue,
    isDetailIssueLoading,
    setIsDetailIssueLoading,
  };
};
