import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import {
  detailIssueReducer,
  IIssueState,
} from "../reducers/detailIssueReducer";
import { getDetailedIssue } from "../api/issues";
import { handleHttpError } from "../api/http";

interface DetailIssueProviderProps {
  children: React.ReactElement;
}

interface IDetailIssueActions {
  initDetailedIssue: (issueNumber: number | string) => Promise<void>;
}

const DetailIssueValCtx = createContext<IIssueState>({
  isLoading: false,
  issue: null,
});
const DetailIssueActionsCtx = createContext<IDetailIssueActions>({
  initDetailedIssue: () => Promise.resolve(),
});

export const useDetailIssueVal = () => {
  const val = useContext(DetailIssueValCtx);
  if (val === undefined) {
    throw Error("useDetailIssueVal should be used within DetailIssueProvider");
  }
  return val;
};

export const useDetailIssueActions = () => {
  const actions = useContext(DetailIssueActionsCtx);
  if (actions === undefined) {
    throw Error(
      "useDetailIssueActions should be used within DetailIssueProvider",
    );
  }
  return actions;
};

export const DetailIssueProvider = ({ children }: DetailIssueProviderProps) => {
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

  return (
    <DetailIssueActionsCtx.Provider value={{ initDetailedIssue }}>
      <DetailIssueValCtx.Provider value={detailIssue}>
        {children}
      </DetailIssueValCtx.Provider>
    </DetailIssueActionsCtx.Provider>
  );
};
