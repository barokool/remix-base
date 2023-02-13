import React from "react";
import { styled } from "~/design-system/stitches.config";

const GeneralLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header>Header ... </Header>
      <Children>{children}</Children>
      <Footer>Footer ... </Footer>
    </>
  );
};

export default GeneralLayout;

const Header = styled("header", {
  margin: "0 auto",
  maxWidth: "1280px",
  background: "White",
  zIndex: "100",
  height: "56px",
  boxShadow: "0 1px 1px rgba(0,0,0, 0.1)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
});

const Footer = styled("div", {
  margin: "0 auto",
  maxWidth: "1280px",
});

const Children = styled("div", {
  marginTop: "56px",
});
