import React from "react";
import styled from "styled-components";

interface IPageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = (props: IPageLayoutProps) => {
  const { children } = props;
  return <PageLayoutStyleWrapper>{children}</PageLayoutStyleWrapper>;
};

const PageLayoutStyleWrapper = styled.div`
  max-width: 440px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  border-left: 2px solid black;
  border-right: 2px solid black;
  box-sizing: border-box;
`;

export default PageLayout;
