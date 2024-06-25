import { AppBar, Box, Toolbar, Divider } from "@mui/material";

import familyLogoWhite from "../assets/images/familyWhite.svg";
import centerLogoWhite from "../assets/images/centerWhite.svg";
import ministr from "../assets/images/ministr.svg";

const Header = () => {
  return (
    <AppBar
      component="header"
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          gap: 3,
          py: 1,
        }}
      >
        <Box component="img" alt="logo" src={ministr} />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "white", opacity: "0.2" }}
        />
        <Box component="img" alt="logo" src={familyLogoWhite} />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "white", opacity: "0.2" }}
        />
        <Box component="img" alt="logo" src={centerLogoWhite} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
