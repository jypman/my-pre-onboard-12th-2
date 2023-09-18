import http from "./http";
import { API } from "./config";

export interface IResIssue {
  state: string;
  id: number;
  title: string;
  number: number;
  user: {
    login: string;
    avatar_url: string;
  };
  updated_at: string;
  comments: number;
  body: string;
}

type IssuesSortType = "created" | "updated" | "comments";
type IssuesStateType = "open" | "closed" | "all";

export const getIssues = (
  page: number = 1,
  perPage: number = 30,
  sort: IssuesSortType = "comments",
  state: IssuesStateType = "open",
): Promise<IResIssue[]> => {
  return http.get(
    `${API.ISSUES}?sort=${sort}&state=${state}&page=${page}&per_page=${perPage}`,
  );
};

export const getDetailedIssue = (
  issueNumber: number | string,
): Promise<IResIssue> => {
  return http.get(`${API.ISSUES}/${issueNumber}`);
};
