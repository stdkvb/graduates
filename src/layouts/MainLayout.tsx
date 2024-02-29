import React from "react";
import { Avatar, Box, Stack, Divider, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";

import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import bashkortostanLogo from "@/assets/images/bashkortostan.svg";
import familyLogoWhite from "@/assets/images/familyWhite.svg";
import centerLogoWhite from "@/assets/images/centerWhite.svg";
import ornament from "@/assets/images/ornament.svg";

//avatar letters
function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
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
          <Box component="img" alt="logo" src={familyLogoWhite} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "white", opacity: "0.2" }}
          />
          <Box component="img" alt="logo" src={centerLogoWhite} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 295,
          flexShrink: 0,
          height: "100%",
          [`& .MuiDrawer-paper`]: {
            width: 295,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            my: 2,
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar {...stringAvatar("Kent Dodds")} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Stack direction="column">
                      <Typography>Name</Typography>
                      <Typography>Mail</Typography>
                    </Stack>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="База анкет" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Методические материалы" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <Accordion
                sx={{ boxShadow: "none", m: "0 !important", width: "100%" }}
              >
                <ListItemButton
                  sx={{
                    maxHeight: "48px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemIcon sx={{ height: "24px" }}>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary="Чат" sx={{ m: 0 }} />
                  <AccordionSummary
                    expandIcon={
                      <IconButton>
                        <ExpandMoreOutlinedIcon />
                      </IconButton>
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      p: 0,
                    }}
                  ></AccordionSummary>
                </ListItemButton>
                <AccordionDetails sx={{ p: 0 }}>
                  <ListItemButton sx={{ px: [4] }}>
                    <ListItemText primary="Купленные документы" />
                  </ListItemButton>
                </AccordionDetails>
              </Accordion>
            </ListItem>
            <ListItem>
              <Button variant="contained" fullWidth>
                Задать вопрос
              </Button>
            </ListItem>
          </List>
          <Stack>
            <Box
              component="img"
              alt="logo"
              src={bashkortostanLogo}
              sx={{ width: "70px", ml: 2, mb: 3 }}
            />
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItemButton>
          </Stack>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          backgroundImage: `url(${ornament})`,
          backgroundPosition: "top",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
