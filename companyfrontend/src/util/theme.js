const theme = {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
  logingrid: {
    textAlign: "center",
    height: "100vh",
    display: "grid",
    border: "1px solid black",
    placeItems: "center",
  },
  textField: {
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#00bcd4",
    color: "white",
    margin: "10px 0",
  },
  progress: {
    position: "absolute",
    color: "#00bcd4",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  paper: {
    padding: 20,
  },
};
export default theme;
