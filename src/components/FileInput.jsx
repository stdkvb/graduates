import {
  Button,
  Typography,
  Box,
  Stack,
  List,
  ListItem,
  IconButton,
  Link,
} from "@mui/material";

import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ClearIcon from "@mui/icons-material/Clear";

const FileInput = ({
  label,
  name,
  readOnly,
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
                {readOnly ? (
                  <Link color="primary.main" href={file.url} target="_blank">
                    {file.name}
                  </Link>
                ) : (
                  <Typography
                    color="primary.main"
                    sx={{
                      maxWidth: "500px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {file.name}
                  </Typography>
                )}

                {!readOnly && (
                  <IconButton
                    sx={{ ml: 1, p: 0 }}
                    onClick={() => {
                      handleDeleteFile(file.name, file.id);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
      <input
        type="file"
        multiple
        onChange={handleAddFile}
        style={{ display: "none" }}
        id="multiple-file-input"
      />
      {!readOnly && (
        <label htmlFor="multiple-file-input">
          {label ? (
            label
          ) : (
            <Button variant="outlined" component="span">
              Выберите файлы
            </Button>
          )}
        </label>
      )}
    </Box>
  );
};

export default FileInput;
