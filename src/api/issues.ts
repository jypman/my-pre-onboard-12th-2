import instance from "./instance";
import { API } from "./config";

export interface IResIssue {
  id: number;
  title: string;
  number: number;
  user: {
    login: string;
  };
  updated_at: string;
  comments: number;
}
export const getIssues = (
  page: number,
  perPage: number = 30,
): Promise<IResIssue[]> => {
  return instance.get(
    `${API.GET_ISSUES}?sort=comments&page=${page}&per_page=${perPage}`,
  );
};

// export const getDetailedIssue = (userData) => {
//
// };
