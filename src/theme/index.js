export const light = {
  palette: {
    mode: "light",
    primary: {
      light: "#f7f7f7",
      main: "#42d9ff",
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
    },
    secondary: {
      main: "#fff",
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
            borderColor: "#333",
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
  },
};
