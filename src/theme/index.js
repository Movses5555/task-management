export const light = {
  palette: {
    mode: "light",
    primary: {
      light: "#fdfdfd",
      main: "#42d9ff",
      dark: "#effeff",
    },
    secondary: {
      main: "#000000",
    },
  },
};

export const dark = {
  palette: {
    mode: "dark",
    primary: {
      light: "#0f0f0f",
      main: "#121111",
      dark: "#ededed",
    },
    secondary: {
      main: "#fff",
    },
    background: {
      paper: "#fff",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#333",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "black",
          "&:before": {
            borderColor: "#333",
          },
          "&:hover": {
            "&:before": {
              borderBottom: "1px solid #333 !important",
            },
          },
        },
        input: {
          "&::placeholder": {
            color: "#333",
          },
          color: "#333",
        },
        label: {
          color: "#333",
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "#2e2e2e",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "#fff",
            backgroundColor: "rgb(0 0 0 / 37%)",
          },
        },
      },
    },
  },
};
