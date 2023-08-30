import React from "react";
import styled from "styled-components";

export const Ads = () => {
  const ADS_LINK = "https://www.wanted.co.kr/";
  const ADS_IMG_LINK =
    "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100";

  return (
    <StyledAds>
      <img
        onClick={() => window.open(ADS_LINK)}
        src={ADS_IMG_LINK}
        alt="광고 이미지"
      />
    </StyledAds>
  );
};

const StyledAds = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
`;
