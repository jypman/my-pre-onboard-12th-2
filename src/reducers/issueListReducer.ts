import { IResIssue } from "../api/issues";

interface IIssueListAction {
  type: IssueListActionType;
  data?: IResIssue[];
}

type IssueListActionType =
  | "GET_ISSUE_LIST_REQUEST"
  | "GET_ISSUE_LIST_SUCCESS"
  | "GET_ISSUE_LIST_FAIL";

interface IssueListState {
  isLoading: boolean;
  issueList: IResIssue[];
}

export const issueListReducer = (
  state: IssueListState,
  action: IIssueListAction,
): IssueListState => {
  switch (action.type) {
    case "GET_ISSUE_LIST_REQUEST":
      return { ...state, isLoading: true };
    case "GET_ISSUE_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        issueList: [...(state.issueList ?? []), ...(action.data ?? [])],
      };
    case "GET_ISSUE_LIST_FAIL":
    default:
      return { ...state, isLoading: false };
  }
};
