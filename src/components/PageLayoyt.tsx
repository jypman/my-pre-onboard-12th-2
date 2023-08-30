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
`;

export default PageLayout;
