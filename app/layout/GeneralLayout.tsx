import React from "react";
import { fakeUser, footerData, tabs } from "~/constants";
import { styled } from "~/design-system/stitches.config";
import { FooterLinks } from "./general/Footer";
import { HeaderTabs } from "./general/Navbar";

const GeneralLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <HeaderTabs tabs={tabs}></HeaderTabs>
      <Children>{children}</Children>
      <FooterLinks data={footerData} />
    </>
  );
};

export default GeneralLayout;

const Children = styled("div", {});
