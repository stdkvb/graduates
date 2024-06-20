import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Stack, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import bashkortostanLogo from "../assets/images/bashkortostan.svg";
import familyLogo from "../assets/images/family.svg";
import centerLogo from "../assets/images/center.svg";

import Footer from "../components/Footer";

const AuthLayout = () => {
  //min app width
  const requiredWidth = useMediaQuery("(min-width:0px)");

  return (
    <>
      {requiredWidth ? (
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
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "26px",
            }}
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
          <Footer />
        </Container>
      ) : (
        <Container
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography textAlign="center">
            Пожалуйста, используйте приложение с устройства с разрешением не
            менее 1200рх.
          </Typography>
        </Container>
      )}
    </>
  );
};

export default AuthLayout;
