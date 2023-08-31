import instance from "./instance";
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
export const getIssues = (
  page: number,
  perPage: number = 30,
): Promise<IResIssue[]> => {
  return instance.get(
    `${API.ISSUES}?sort=comments&page=${page}&per_page=${perPage}`,
  );
};

export const getDetailedIssue = (
  issueNumber: number | string,
): Promise<IResIssue> => {
  return instance.get(`${API.ISSUES}/${issueNumber}`);
};
