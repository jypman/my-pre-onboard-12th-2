import { useRef, useReducer } from "react";
import { getIssues } from "../../api/issues";
import { issueListReducer } from "../../reducers/issueListReducer";
import { handleHttpError } from "../../api/http";

export const useIssues = () => {
  const [issues, dispatch] = useReducer(issueListReducer, {
    isLoading: false,
    issueList: [],
  });
  const page = useRef<number>(1);
  const perPage = 30;

  const updateIssues = async (page: number) => {
    dispatch({ type: "GET_ISSUE_LIST_REQUEST" });
    try {
      const data = await getIssues(page, perPage);
      if (data && data.length > 0)
        dispatch({ type: "GET_ISSUE_LIST_SUCCESS", data });
    } catch (e) {
      dispatch({ type: "GET_ISSUE_LIST_FAIL" });
      handleHttpError(e);
    }
  };

  return {
    issues,
    updateIssues,
    page,
  };
};
