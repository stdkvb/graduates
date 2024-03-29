import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#018840",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#D32F2F",
    },
    warning: {
      main: "#EF6C00",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "32px !important",
          paddingRight: "32px !important",
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          ".Mui-disabled": {
            color: "rgba(0, 0, 0, 0.87) !important",
            WebkitTextFillColor: "rgba(0, 0, 0, 0.87) !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&.Mui-disabled": {
            whiteSpace: "break-spaces !important",
            color: "rgba(0, 0, 0, 0.87) !important",
            WebkitTextFillColor: "rgba(0, 0, 0, 0.87) !important",
          },
        },
        icon: {
          "&.Mui-disabled": {
            display: "none",
          },
        },
      },
    },
    // MuiFormHelperText: {
    //   styleOverrides: {
    //     root: {
    //       position: "absolute",
    //       bottom: "-22px",
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: { root: { height: "41px", textTransform: "uppercase" } },
      defaultProps: { variant: "contained" },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "rgba(0, 155, 0, 0.10)" },
          "&.Mui-selected": {
            backgroundColor: "unset",
            cursor: "default",
            position: "relative",
            borderRight: "solid 4px #018840",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "inherit",
          cursor: "pointer",
          textDecoration: "none",
          textUnderlineOffset: "3px",
          "&:hover": { textDecoration: "underline", color: "#018840" },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": { content: "none" },
          ".MuiAccordionSummary-content": {
            margin: "0 !important",
            height: "48px",
          },
          ".MuiAccordionSummary-root.Mui-expanded": {
            minHeight: "unset !important",
          },
          ".MuiAccordionSummary-expandIconWrapper": {
            position: "absolute",
            right: "0",
            top: "5px",
            zIndex: "2",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          ".MuiFormControlLabel-label": {
            width: "100%",
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          ".MuiPagination-ul": {
            justifyContent: "flex-end",
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
