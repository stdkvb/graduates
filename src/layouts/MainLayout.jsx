import { useContext, useState, useEffect } from "react";
import {
  Outlet,
  Link as RouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Badge from "@mui/material/Badge";

import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import MailIcon from "@mui/icons-material/Mail";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

import bashkortostanLogo from "../assets/images/bashkortostan.svg";
import ornament from "../assets/images/ornament.svg";

import Header from "../components/Header";

import Api from "../utils/api";

import { UserContext } from "../utils/context";

//component for chatList
const PopperMy = function ({ children }) {
  return (
    <Stack
      open={true}
      children={children}
      style={{ width: "100%" }}
      placement="bottom-start"
    />
  );
};

//calculate summ of unread messages
const sumOfUnreadMessages = (data) => {
  return data.reduce((total, current) => {
    // convert empty string to 0
    const count =
      current.unReadMessageCount === ""
        ? 0
        : parseInt(current.unReadMessageCount);
    return total + count;
  }, 0);
};

//avatar letters
function stringAvatar(name, lastName) {
  return {
    children: `${name.split(" ")[0][0]}${lastName.split(" ")[0][0]}`,
  };
}

const MainLayout = ({ onLogout }) => {
  //current user
  const user = useContext(UserContext).user;

  //current page
  const navigate = useNavigate();
  let location = useLocation();
  const pathName = location.pathname;
  function activateMenuItem(pathname) {
    const words1 = pathName.replace(/\/(\d+)/g, " $1").split(/\s+/);
    const words2 = pathname.replace(/\/(\d+)/g, " $1").split(/\s+/);
    for (let word of words2) {
      if (words1.includes(word)) {
        return true;
      }
    }
  }

  //chat list
  const [chatList, setChatList] = useState();
  const [loading, setLoading] = useState(true);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const getChatList = () => {
    Api.get(`message/get-chats`, {})
      .then((res) => {
        setChatList(res.data.data);
        setUnreadMessageCount(sumOfUnreadMessages(res.data.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(getChatList, []);

  //auto refresh chatlist
  const autoRefreshChatList = () => {
    const interval = setInterval(() => {
      Api.get("message/get-chats", {})
        .then((res) => {
          setChatList(res.data.data);
          setUnreadMessageCount(sumOfUnreadMessages(res.data.data));
        })
        .catch((error) => console.log(error.response.data));
    }, 1000);

    return () => clearInterval(interval);
  };
  useEffect(autoRefreshChatList, []);

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
              <ListItemButton
                component={RouterLink}
                to="/profile"
                selected={activateMenuItem("/profile")}
              >
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
              <ListItemButton
                component={RouterLink}
                to="/"
                selected={activateMenuItem("/")}
              >
                <ListItemIcon>
                  <FolderIcon color={activateMenuItem("/") && "primary"} />
                </ListItemIcon>
                <ListItemText primary="База анкет" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/materials"
                selected={activateMenuItem("/materials")}
              >
                <ListItemIcon>
                  <DescriptionIcon
                    color={activateMenuItem("/materials") && "primary"}
                  />
                </ListItemIcon>
                <ListItemText primary="Методические материалы" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/help"
                selected={activateMenuItem("/help")}
              >
                <ListItemIcon>
                  <HelpCenterIcon
                    color={activateMenuItem("/help") && "primary"}
                  />
                </ListItemIcon>
                <ListItemText primary="Задать вопрос" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <Accordion
                sx={{ boxShadow: "none", m: "0 !important", width: "100%" }}
              >
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
                    height: "48px",
                  }}
                >
                  <ListItemButton
                    sx={{
                      maxHeight: "48px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    selected={activateMenuItem("/chat")}
                  >
                    <ListItemIcon sx={{ height: "24px" }}>
                      <Badge badgeContent={unreadMessageCount} color="primary">
                        <ChatIcon
                          color={activateMenuItem("/chat") && "primary"}
                        />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Чат" sx={{ m: 0 }} />
                  </ListItemButton>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  {!loading && (
                    <Autocomplete
                      sx={{ px: 2, mt: 2 }}
                      freeSolo
                      id="free-solo-2-demo"
                      disableCloseOnSelect
                      open
                      getOptionLabel={(option) => option.name}
                      PaperComponent={Stack}
                      PopperComponent={PopperMy}
                      options={chatList.sort((a, b) => {
                        // convert empty string to 0 for proper sorting by unread messages
                        const countA =
                          a.unReadMessageCount === ""
                            ? 0
                            : parseInt(a.unReadMessageCount);
                        const countB =
                          b.unReadMessageCount === ""
                            ? 0
                            : parseInt(b.unReadMessageCount);
                        return countB - countA;
                      })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Поиск"
                          InputProps={{
                            ...params.InputProps,
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                      renderOption={(params, option) => (
                        <ListItemButton
                          key={option.id}
                          component={RouterLink}
                          to={`/chat/${option.id}`}
                          selected={activateMenuItem(`${option.id}`)}
                        >
                          <Badge
                            badgeContent={
                              option.unReadMessageCount > 0
                                ? option.unReadMessageCount
                                : 0
                            }
                            color="primary"
                          >
                            <MailIcon color="action" />
                          </Badge>
                          <ListItemText primary={option.name} sx={{ pl: 2 }} />
                        </ListItemButton>
                      )}
                    />
                  )}
                </AccordionDetails>
              </Accordion>
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
