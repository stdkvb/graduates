import { Outlet } from "react-router-dom";
import { Container, Link, Stack, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Emails } from "@/types";

import bashkortostanLogo from "@/assets/images/bashkortostan.svg";
import familyLogo from "@/assets/images/family.svg";
import centerLogo from "@/assets/images/center.svg";

const AuthLayout = () => {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="header"
        sx={{ display: "flex", justifyContent: "center", paddingTop: "26px" }}
      >
        <Box
          component="img"
          sx={{ width: "114px" }}
          alt="logo"
          src={bashkortostanLogo}
        />
      </Box>
      <Box
        component="main"
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "552px",
            gap: 6,
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 3,
            }}
          >
            <Box component="img" alt="logo" src={familyLogo} />
            <Divider orientation="vertical" flexItem />
            <Box component="img" alt="logo" src={centerLogo} />
          </Stack>
          <Outlet />
        </Box>
      </Box>
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
    </Container>
  );
};

export default AuthLayout;
