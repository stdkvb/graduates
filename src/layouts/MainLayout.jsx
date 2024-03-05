import { useContext } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
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

import bashkortostanLogo from "../assets/images/bashkortostan.svg";

import ornament from "../assets/images/ornament.svg";

import Header from "../components/Header";

import { UserContext } from "../utils/context";

//avatar letters
function stringAvatar(name, lastName) {
  return {
    children: `${name.split(" ")[0][0]}${lastName.split(" ")[0][0]}`,
  };
}

const MainLayout = ({ onLogout }) => {
  //current user
  const user = useContext(UserContext).user;

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
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
              <ListItemButton component={RouterLink} to="/profile">
                <ListItemIcon>
                  <Avatar
                    {...stringAvatar(`${user.name}`, `${user.lastName}`)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Stack direction="column">
                      <Typography>{user.name}</Typography>
                      <Typography>{user.lastName}</Typography>
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
              <Button
                variant="contained"
                fullWidth
                component={RouterLink}
                to="/help"
              >
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
            <ListItemButton onClick={onLogout}>
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
          minHeight: "100vh",
          backgroundImage: `url(${ornament})`,
          backgroundPosition: "top",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          pt: 10,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
