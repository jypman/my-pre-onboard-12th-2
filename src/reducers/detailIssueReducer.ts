import { IResIssue } from "../api/issues";

interface IIssueAction {
  type: IssueActionType;
  data?: IResIssue | null;
}
type IssueActionType =
  | "GET_ISSUE_REQUEST"
  | "GET_ISSUE_SUCCESS"
  | "GET_ISSUE_FAIL";

export interface IIssueState {
  isLoading: boolean;
  issue: IResIssue | null;
}

export const detailIssueReducer = (
  state: IIssueState,
  action: IIssueAction,
): IIssueState => {
  switch (action.type) {
    case "GET_ISSUE_REQUEST":
      return { ...state, isLoading: true };
    case "GET_ISSUE_SUCCESS":
      return { ...state, isLoading: false, issue: action.data ?? null };
    case "GET_ISSUE_FAIL":
    default:
      return { ...state, isLoading: false };
  }
};
