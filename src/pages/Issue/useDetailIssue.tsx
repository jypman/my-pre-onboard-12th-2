import { useCallback, useEffect, useReducer } from "react";
import { getDetailedIssue } from "../../api/issues";
import { detailIssueReducer } from "../../reducers/detailIssueReducer";
import { handleHttpError } from "../../api/http";

export const useDetailIssue = () => {
  const [detailIssue, dispatch] = useReducer(detailIssueReducer, {
    issue: null,
    isLoading: false,
  });

  const initDetailedIssue = useCallback(
    async (issueNumber: number | string) => {
      dispatch({ type: "GET_ISSUE_REQUEST" });
      try {
        const data = await getDetailedIssue(issueNumber);
        dispatch({ type: "GET_ISSUE_SUCCESS", data });
      } catch (e) {
        dispatch({ type: "GET_ISSUE_FAIL" });
        handleHttpError(e);
      }
    },
    [],
  );

  return {
    detailIssue,
    initDetailedIssue,
  };
};
