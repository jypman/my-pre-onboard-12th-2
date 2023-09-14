import { fireEvent, render, screen } from "@testing-library/react";
import * as remotes from "../api/issues";
import { IssueListProvider } from "../providers/IssueListProvider";
import { Issues } from "../pages/Issues/Issues";
import { delay } from "../utils";

const mockDataLength = 10;
const issueListMockData: remotes.IResIssue[] = Array.from(
  { length: mockDataLength },
  (_, index: number) => ({
    state: "open",
    id: index,
    title: "react 우아하게 사용하기",
    number: 119,
    user: {
      login: "jypman",
      avatar_url: "https://mock_img.png",
    },
    updated_at: "2023-09-05T05:16:40Z",
    comments: 100,
    body: "hello world!",
  }),
);

describe("이슈 목록 페이지", () => {
  const spyOnIssueList = jest.spyOn(remotes, "getIssues");

  beforeEach(() => {
    jest.clearAllMocks();
    spyOnIssueList.mockImplementation(
      async (): Promise<remotes.IResIssue[]> => issueListMockData,
    );
    const intersectionObserverMock = () => ({
      observe: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);

    render(
      <IssueListProvider>
        <Issues />
      </IssueListProvider>,
    );
  });
  it("이슈 목록 요청로직 호출 완료", () => {
    expect(spyOnIssueList).toHaveBeenCalled();
  });
  it("이슈번호, 이슈제목, 작성자, 작성일, 코멘트수 렌더링", async () => {
    const issueNum = await screen.findAllByTestId("number");
    const issueTitle = await screen.findAllByTestId("title");
    const issueAuthor = await screen.findAllByTestId("author");
    const issueDate = await screen.findAllByTestId("updateAt");
    const issueComment = await screen.findAllByTestId("comment");

    expect(issueNum).toHaveLength(mockDataLength);
    expect(issueTitle).toHaveLength(mockDataLength);
    expect(issueAuthor).toHaveLength(mockDataLength);
    expect(issueDate).toHaveLength(mockDataLength);
    expect(issueComment).toHaveLength(mockDataLength);
  });
  it("다섯번째 셀마다 광고 렌더링", async () => {
    const adsExposeInterval = 4;
    const adsImg = await screen.findAllByAltText("광고 이미지");
    const issuesWrapper = await screen.findByTestId("issues-wrapper");
    const isAdsSpecificSection =
      issuesWrapper.children[adsExposeInterval].getAttribute("data-testid") ===
      "ads";
    expect(adsImg).toHaveLength(Math.floor(mockDataLength / adsExposeInterval));
    expect(isAdsSpecificSection).toBeTruthy();
  });
});
