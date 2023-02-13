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

export default function Index() {
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
