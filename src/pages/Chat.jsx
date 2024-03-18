import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import CircularProgress from "@mui/material/CircularProgress";
import MailIcon from "@mui/icons-material/Mail";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import FileInput from "../components/FileInput";

import Api from "../utils/api";

const Chat = () => {
  let { chatId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [chat, setChat] = useState();

  //load messages
  const getChat = () => {
    Api.post("message/read", { chatId: chatId });
    Api.get("message/get-messages", { params: { chatId: chatId } })
      .then((res) => {
        // // sort the keys (dates)
        // const sortedKeys = Object.keys(res.data.data).sort();
        // // create a new object with sorted keys
        // const sortedChat = {};
        // sortedKeys.forEach((key) => {
        //   sortedChat[key] = res.data.data[key];
        // });
        setChat(res.data.data);
        setName(res.data.fio);
        setLoading(false);
      })
      .catch((error) => console.log(error.response.data));
  };

  useEffect(getChat, [chatId]);

  //send message
  const sendMessage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("chatId", chatId);
    Api.post("message/add-message", formData)
      .then(() => {
        getChat();
      })
      .catch((error) => console.log(error));
  };

  //add/delete files
  // const [selectedFiles, setSelectedFiles] = useState([]);

  // const handleAddFile = (event) => {
  //   const files = selectedFiles.concat(Array.from(event.target.files));
  //   setSelectedFiles(files);
  // };

  // const handleDeleteFile = (fileName) => {
  //   const files = selectedFiles.filter((name) => {
  //     return name.name !== fileName;
  //   });
  //   setSelectedFiles(files);
  // };

  return (
    <>
      <Container
        maxWidth="false"
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
          minHeight: "calc(100vh - 112px)",
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              margin: "auto",
            }}
          />
        ) : (
          <>
            <Typography component="h1" variant="h5">
              {name}
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 0,
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                overflow: "hidden",
              }}
            >
              <Grid
                container
                spacing={4}
                sx={{
                  p: 3,
                  height: "calc(100vh - 220px)",
                  overflowY: "scroll",
                }}
                direction="column"
                // justifyContent={
                //   Object.entries(chat).length == 0 ? "center" : "flex-end"
                // }
                wrap="nowrap"
              >
                {Object.entries(chat).length == 0 ? (
                  <Grid
                    item
                    xs={12}
                    align="center"
                    justifyContent="center"
                    sx={{ position: "relative" }}
                  >
                    <Typography
                      color="text.secondary"
                      sx={{
                        width: "fit-content",
                        height: "fit-content",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        margin: "auto",
                      }}
                    >
                      Здесь пока нет сообщений
                    </Typography>
                  </Grid>
                ) : (
                  Object.entries(chat)
                    .toReversed()
                    .map((group, i) => {
                      return (
                        <>
                          <Grid item xs={12}>
                            <Divider
                              sx={{
                                fontSize: "12px",
                                color: "rgba(0, 0, 0, 0.6)",
                              }}
                            >
                              {group[0]}
                            </Divider>
                          </Grid>
                          {group[1].toReversed().map((message) => {
                            return (
                              <Grid
                                key={message.id}
                                item
                                xs={12}
                                container
                                align={message.income ? "left" : "right"}
                                sx={{ alignItems: "flex-end", gap: 1 }}
                              >
                                <Grid item xs={0.5}>
                                  {message.income && (
                                    <Avatar sx={{ width: 40, height: 40 }}>
                                      {message.initials}
                                    </Avatar>
                                  )}
                                </Grid>
                                <Grid item xs>
                                  <Stack
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems={
                                      message.income ? "flex-start" : "flex-end"
                                    }
                                    sx={{
                                      width: "fit-content",
                                      maxWidth: "530px",
                                      position: "relative",
                                    }}
                                  >
                                    <Chip
                                      label={message.message}
                                      sx={{
                                        p: 2,
                                        borderRadius: 1,
                                        width: "fit-content",
                                        height: "auto",
                                        "& .MuiChip-label": {
                                          display: "block",
                                          whiteSpace: "normal",
                                          padding: 0,
                                        },
                                      }}
                                    />
                                    <Typography
                                      color="text.secondary"
                                      sx={{
                                        fontSize: "12px",
                                        position: "absolute",
                                        right: 0,
                                        bottom: "-20px",
                                      }}
                                    >
                                      {message.time}
                                    </Typography>
                                  </Stack>
                                </Grid>
                              </Grid>
                            );
                          })}
                        </>
                      );
                    })
                )}
              </Grid>
              <Divider />
              <Box
                component="form"
                onSubmit={sendMessage}
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                {/* <FileInput
                  name={""}
                  readOnly={false}
                  selectedFiles={selectedFiles}
                  handleAddFile={handleAddFile}
                  handleDeleteFile={handleDeleteFile}
                /> */}
                <AttachFileIcon />
                <InputBase
                  name="message"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Текст сообщения..."
                />
                <Button sx={{ width: "180px" }} type="submit">
                  Отправить
                </Button>
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </>
  );
};

export default Chat;
