import { render, screen } from "@testing-library/react";
import * as remotes from "../api/issues";
import { DetailIssueProvider } from "../providers/DetailIssueProvider";
import { DetailIssue } from "../pages/DetailIssue";

const detailIssueMockData: remotes.IResIssue = {
  state: "open",
  id: 1,
  title: "react 우아하게 사용하기",
  number: 119,
  user: {
    login: "jypman",
    avatar_url: "https://mock_img.png",
  },
  updated_at: "2023-09-05T05:16:40Z",
  comments: 100,
  body: "hello world!",
};

const spyOnDetailIssue = jest.spyOn(remotes, "getDetailedIssue");

describe("이슈 상세 페이지", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    spyOnDetailIssue.mockImplementation(
      async (): Promise<remotes.IResIssue> => detailIssueMockData,
    );
    render(
      <DetailIssueProvider>
        <DetailIssue />
      </DetailIssueProvider>,
    );
  });
  it("이슈 상세정보 요청 호출 중에 로딩 UI 렌더링", async () => {
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
  it("이슈 상세정보 요청로직 호출 완료", async () => {
    expect(spyOnDetailIssue).toHaveBeenCalled();
  });
  it("이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문 렌더링", async () => {
    const profileImg = await screen.findByTestId("user-profile-img");
    const issueNum = await screen.findByTestId("number");
    const issueTitle = await screen.findByTestId("title");
    const issueAuthor = await screen.findByTestId("author");
    const issueDate = await screen.findByTestId("updateAt");
    const issueComment = await screen.findByTestId("comment");
    const issueContent = await screen.findByTestId("issue-content");

    expect(profileImg).toBeInTheDocument();
    expect(issueNum).toBeInTheDocument();
    expect(issueTitle).toBeInTheDocument();
    expect(issueAuthor).toBeInTheDocument();
    expect(issueDate).toBeInTheDocument();
    expect(issueComment).toBeInTheDocument();
    expect(issueContent).toBeInTheDocument();
  });
});
