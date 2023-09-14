import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { issueListReducer, IssueListState } from "../reducers/issueListReducer";
import { getIssues } from "../api/issues";
import { handleHttpError } from "../api/http";

interface IssueListProviderProps {
  children: React.ReactElement;
}

interface IIssueListActions {
  updateIssues: (page: number) => Promise<void>;
}

const IssueListValCtx = createContext<IssueListState>({
  isLoading: false,
  issueList: [],
});
const IssueListActionsCtx = createContext<IIssueListActions>({
  updateIssues: () => Promise.resolve(),
});

export const useIssueListVal = () => {
  const val = useContext(IssueListValCtx);
  if (val === undefined) {
    throw Error("useIssueListVal should be used within IssueListProvider");
  }
  return val;
};

export const useIssueListActions = () => {
  const actions = useContext(IssueListActionsCtx);
  if (actions === undefined) {
    throw Error("useIssueListActions should be used within IssueListProvider");
  }
  return actions;
};

export const IssueListProvider = ({ children }: IssueListProviderProps) => {
  const [issues, dispatch] = useReducer(issueListReducer, {
    isLoading: false,
    issueList: [],
  });
  const perPage = 30;

  const updateIssues = useCallback(async (page: number) => {
    dispatch({ type: "GET_ISSUE_LIST_REQUEST" });
    try {
      const data = await getIssues(page, perPage);
      if (data && data.length > 0)
        dispatch({ type: "GET_ISSUE_LIST_SUCCESS", data });
    } catch (e) {
      dispatch({ type: "GET_ISSUE_LIST_FAIL" });
      handleHttpError(e);
    }
  }, []);

  return (
    <IssueListActionsCtx.Provider value={{ updateIssues }}>
      <IssueListValCtx.Provider value={issues}>
        {children}
      </IssueListValCtx.Provider>
    </IssueListActionsCtx.Provider>
  );
};
