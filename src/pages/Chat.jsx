import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
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
import { Link } from "@mui/material";

const mergeArrays = (array1, array2) => {
  const mergedMap = new Map();
  // Merge arrays without duplicates
  array1.forEach(([date, items]) => {
    const existingItems = mergedMap.get(date) || [];
    items.forEach((item) => {
      if (!existingItems.find((existingItem) => existingItem.id === item.id)) {
        existingItems.push(item);
      }
    });
    mergedMap.set(date, existingItems);
  });

  array2.forEach(([date, items]) => {
    const existingItems = mergedMap.get(date) || [];
    items.forEach((item) => {
      if (!existingItems.find((existingItem) => existingItem.id === item.id)) {
        existingItems.push(item);
      }
    });
    mergedMap.set(date, existingItems);
  });

  // Convert map to array and sort by id
  const mergedArray = Array.from(mergedMap.entries());
  mergedArray.forEach(([_, items]) => {
    items.sort((a, b) => b.id - a.id);
  });

  return mergedArray;
};

const Chat = () => {
  let { chatId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  //load messages on first open
  const getMessages = () => {
    Api.post("message/read", { chatId: chatId });
    Api.get("message/get-messages", {
      params: { chatId: chatId, page: page, limit: 15 },
    })
      .then((res) => {
        const data = Object.entries(res.data.data);
        data.forEach(([_, items]) => {
          items.sort((a, b) => b.id - a.id);
        });
        setMessages(data);
        setName(res.data.fio);
        setLoading(false);
        setPage(1);
      })
      .catch((error) => console.log(error.response.data));
  };

  useEffect(getMessages, [chatId]);

  //infinite scroll
  const getMoreMessages = () => {
    Api.get("message/get-messages", {
      params: { chatId: chatId, page: page + 1, limit: 15 },
    })
      .then((res) => {
        const newMessages = Object.entries(res.data.data);
        // setMessages((prevState) => [...prevState, ...newMessages]);
        const mergedArray = mergeArrays(messages, newMessages);
        setMessages([...mergedArray]);
      })
      .catch((error) => console.log(error.response.data));

    setPage((prevPage) => prevPage + 1);
  };

  //auto refresh
  const autoRefreshMessages = () => {
    const interval = setInterval(() => {
      Api.post("message/read", { chatId: chatId });
      Api.get("message/get-messages", {
        params: { chatId: chatId, page: 1, limit: 15 },
      })
        .then((res) => {
          const newMessages = Object.entries(res.data.data);
          const mergedArray = mergeArrays(messages, newMessages);
          setMessages([...mergedArray]);
        })
        .catch((error) => console.log(error.response.data));
    }, 1000);

    return () => clearInterval(interval);
  };
  useEffect(autoRefreshMessages, [messages, chatId, page]);

  // refresh messages
  const refreshMessages = () => {
    Api.post("message/read", { chatId: chatId });
    Api.get("message/get-messages", {
      params: { chatId: chatId, page: 1, limit: 15 },
    })
      .then((res) => {
        const newMessages = Object.entries(res.data.data);
        const mergedArray = mergeArrays(messages, newMessages);
        setMessages([...mergedArray]);
      })
      .catch((error) => console.log(error.response.data));
  };

  //send message
  const sendMessage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //add files to formdata
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`file${i}`, selectedFiles[i]);
    }
    formData.append("chatId", chatId);
    Api.post("message/add-message", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        refreshMessages();
      })
      .catch((error) => console.log(error));
  };

  // add / delete files;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleAddFile = (event) => {
    const files = selectedFiles.concat(Array.from(event.target.files));
    setSelectedFiles(files);
  };

  const handleDeleteFile = (fileName) => {
    const files = selectedFiles.filter((name) => {
      return name.name !== fileName;
    });
    setSelectedFiles(files);
  };

  return (
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
              justifyContent: "flex-end",
            }}
          >
            <Box
              id="scrollableContainer"
              align="center"
              sx={{
                maxHeight: "calc( 100vh - 251px)",
                overflowY: "auto",
                p: 3,
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {messages.length == 0 ? (
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
              ) : (
                <InfiniteScroll
                  dataLength={page * 10}
                  next={getMoreMessages}
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                  inverse={true}
                  hasMore={true}
                  scrollableTarget="scrollableContainer"
                >
                  {messages.map((group, i) => {
                    return (
                      <Box
                        key={i}
                        align="center"
                        justifyContent="center"
                        sx={{
                          flexDirection: "column-reverse",
                          display: "flex",
                        }}
                      >
                        {group[1].map((message) => {
                          return (
                            <Box
                              key={message.id}
                              sx={{
                                display: "flex",
                                alignItems: "flex-end",
                                gap: 1,
                                mb: 3,
                                ...(message.income
                                  ? {
                                      justifyContent: "flex-start",
                                    }
                                  : {
                                      justifyContent: "flex-end",
                                    }),
                              }}
                            >
                              {message.income && (
                                <Avatar sx={{ width: 40, height: 40 }}>
                                  {message.initials}
                                </Avatar>
                              )}
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
                                  label={
                                    <Stack
                                      alignItems="flex-start"
                                      spacing={0.5}
                                    >
                                      <Typography textAlign="left">
                                        {message.message}
                                      </Typography>
                                      {message.files.map((file, i) => (
                                        <Link
                                          key={i}
                                          href={file.url}
                                          target="_blank"
                                        >
                                          {file.name}
                                        </Link>
                                      ))}
                                    </Stack>
                                  }
                                  sx={{
                                    p: 1,
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
                            </Box>
                          );
                        })}

                        <Divider
                          sx={{
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          {group[0]}
                        </Divider>
                      </Box>
                    );
                  })}
                </InfiniteScroll>
              )}
            </Box>
            <Divider />
            <Box
              component="form"
              onSubmit={sendMessage}
              sx={{
                p: 3,
              }}
            >
              <FileInput
                label={
                  <IconButton component="div" sx={{ mb: -2 }}>
                    <AttachFileIcon />
                  </IconButton>
                }
                readOnly={false}
                selectedFiles={selectedFiles}
                handleAddFile={handleAddFile}
                handleDeleteFile={handleDeleteFile}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 5,
                  mt: -3,
                  gap: 1,
                }}
              >
                <InputBase
                  fullWidth
                  name="message"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Текст сообщения..."
                  inputProps={{ autoComplete: "one-time-code" }}
                />
                <Button sx={{ width: "180px" }} type="submit">
                  Отправить
                </Button>
              </Box>
            </Box>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Chat;
