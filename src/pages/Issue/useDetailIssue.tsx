import { useEffect, useState } from "react";
import { getDetailedIssue, IResIssue } from "../../api/issues";

export const useDetailIssue = (issueNumber: number) => {
  const [detailIssue, setDetailIssue] = useState<IResIssue>();

  useEffect(() => {
    getDetailedIssue(issueNumber).then((data: IResIssue) => {
      setDetailIssue(data);
    });
  }, []);

  return { detailIssue, setDetailIssue };
};
