import React, {PropsWithChildren} from "react";
import AppToolbar from "../AppToolbar/AppToolbar";
import {Container} from "@mui/material";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div style={{minHeight: "100vh"}}>
      <header>
        <Container>
          <AppToolbar/>
        </Container>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default Layout;
