import { Heading } from "@chakra-ui/react";
import { Container } from "@mantine/core";
import { useEffect } from "react";
import {
  getUserByTokenByAxios,
  getUserByTokenByAxiosNoNeedToken,
} from "~/api/auth";
import { fakeCard } from "~/constants";
import { styled } from "~/design-system/stitches.config";
import { EmailBanner } from "~/pages/footer/subscribe";
import { ArticleCardFooter } from "~/pages/home/article-card";
import { HomeBanner } from "~/pages/home/banner";
import { GetInTouchSimple } from "~/pages/home/get-in-touch";
import { getCookie } from "~/utils/cookie";

export default function Index() {
  const fetchApi = async () => {
    // const response = await getUserByTokenByAxios(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NjI4MzM5NSwiZXhwIjoxNjc2MjgzNDgxfQ.kB_mQQ1BuxCc23_ykm25HhlGpUXSTY6oL6trIOvLR7s"
    // );

    const response = await getUserByTokenByAxiosNoNeedToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NjI4Mzc1OCwiZXhwIjoxNjc2MjgzODQ0fQ.Ymt5cgqFGIbAbgvKhqe_kXjilRRS-d3SgJXU8jAKUtM"
    );
    console.log("data : ", response.data);

    // console.log(getCookie("accessToken"));
  };

  return (
    <>
      <HomeBanner />
      <Container
        sx={{
          maxWidth: "1280px",
          marginTop: "64px",
        }}
      >
        <Heading>Top Blogs in Weeks</Heading>
        <button
          style={{ border: "1px solid black" }}
          onClick={() => fetchApi()}
        >
          Click
        </button>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          {Array(7)
            .fill(fakeCard)
            .map((card, i) => (
              <ArticleCardFooter {...card} />
            ))}
        </Container>
      </Container>

      <Container sx={{ maxWidth: "1080px" }}>
        <GetInTouchSimple />
      </Container>
    </>
  );
}
