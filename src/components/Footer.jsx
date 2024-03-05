import { Outlet } from "react-router-dom";
import { Container, Link, Stack, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        width: "100%",
        pt: { xs: "40px", md: "0" },
        pb: { xs: "16px", md: "26px" },
      }}
      color="text.secondary"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: "0", md: "1" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Typography>Техническая поддержка:</Typography>
        <Link href="mailto:info@example.ru">info@example.ru</Link>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography>Разработка</Typography>
        <Typography>–</Typography>
        <Typography display="inline">
          <Link href="https://wptt.ru/" target="_blank">
            Вебпространство
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
