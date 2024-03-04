import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Popup = ({ isPopupOpen, children }) => {
  return (
    <Modal open={isPopupOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "auto",
          maxWidth: { xs: "90%", sm: "580px" },
          height: "fit-content",
          bgcolor: "background.paper",
          p: { xs: 2, md: 4 },
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default Popup;
