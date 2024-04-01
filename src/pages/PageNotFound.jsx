import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Stack, Box } from "@mui/material";

import Footer from "../components/Footer";

const PageNotFound = ({ loggedIn }) => {
  //for navigate to previous page
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: loggedIn ? "calc(100vh - 65px)" : "calc(100vh - 150px)",
        position: "absolute",
        backgroundColor: "#FFFFFF",
        width: "100vw",
        left: "0",
        bottom: "0",
        marginTop: "-96px",
        zIndex: "2000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          color="primary.main"
          sx={{ fontSize: "100px", fontWeight: "500", lineHeight: "100%" }}
        >
          404
        </Typography>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Страница не найдена
        </Typography>
        <Typography variant="p" color="text.secondary">
          Страница, на которую вы пытаетесь попасть, не существует или была
          удалена.
        </Typography>
        {loggedIn ? (
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            sx={{ mt: 4, width: { xs: "100%", sm: "266px" } }}
          >
            Вернуться
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ mt: 4, width: { xs: "100%", sm: "266px" } }}
          >
            На главную
          </Button>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default PageNotFound;
