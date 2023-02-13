import { styled } from "~/design-system/stitches.config";

export default function Index() {
  return (
    <Container
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <Layout>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Layout>
    </Container>
  );
}

const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "240px 2fr 1fr",
  gap: "16px",
  width: "100%",
  margin: "0 auto",
  maxWidth: "1280px",
});

const Container = styled("div", {
  width: "100%",
  background: "$primary",
});
