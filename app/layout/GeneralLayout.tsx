import { Box } from "@mantine/core";
import { useLocation } from "@remix-run/react";
import React from "react";
import { fakeUser, footerData, tabs } from "~/constants";
import { styled } from "~/design-system/stitches.config";
import BrowserOnly from "~/global-components/BrowserOnly";
import { DoubleNavbar } from "./general/DoubleNavbar";
import { FooterLinks } from "./general/Footer";
import { HeaderTabs } from "./general/Navbar";

const GeneralLayout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const pathName = location.pathname;

  const isRouteLoggedIn = routeHaveToBeLoggedIn.includes(pathName);

  return (
    <>
      {isRouteLoggedIn ? (
        <>
          <Box>{children}</Box>
        </>
      ) : (
        <DoubleNavbar>
          <Box sx={{ width: "100%" }}>
            <HeaderTabs />
            <Children css={{ margin: "$x10" }}>{children}</Children>
          </Box>
        </DoubleNavbar>
      )}
    </>
  );
};

export default GeneralLayout;

const Children = styled("div", {});

const routeHaveToBeLoggedIn = ["/login"];
