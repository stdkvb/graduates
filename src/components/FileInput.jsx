import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Stack,
  List,
  ListItem,
  IconButton,
} from "@mui/material";

import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ClearIcon from "@mui/icons-material/Clear";

const FileInput = ({
  name,
  selectedFiles,
  handleAddFile,
  handleDeleteFile,
}) => {
  return (
    <Box>
      {selectedFiles && selectedFiles.length > 0 && (
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Файлы:</Typography>
          <List sx={{ p: 0, mb: 1 }}>
            {selectedFiles.map((file, i) => (
              <ListItem key={file.name} sx={{ pt: 0 }}>
                <InsertDriveFileOutlinedIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="primary.main">{file.name}</Typography>
                <IconButton
                  sx={{ ml: 1, p: 0 }}
                  onClick={() => {
                    handleDeleteFile(file.name);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
      <input
        // name={name}
        type="file"
        multiple
        onChange={handleAddFile}
        style={{ display: "none" }}
        id="multiple-file-input"
      />
      <label htmlFor="multiple-file-input">
        <Button variant="outlined" component="span">
          Выберите файлы
        </Button>
      </label>
    </Box>
  );
};

export default FileInput;
