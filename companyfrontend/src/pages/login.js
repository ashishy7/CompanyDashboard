import {
  Button,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import CONSTANTS from "../Helper/Constants";
import HF from "../Helper/Helper";
import theme from "../util/theme";
import auth from "../util/AuthHandler";
import { useHistory } from "react-router-dom";
import company from "../util/Company";
const style = (theme) => ({
  ...theme,
});

const { SIGNINFIELDSTOVALIDATE, INTERNAL_SERVER_ERROR_MSG } = CONSTANTS;
const SignIn = ({ classes: { logingrid, textField, button, loading } }) => {
  const initialState = {
    email: "rohity@gmail.com",
    password: "12345",
  };
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = state;
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      error && setError("");
      const formInput = {
        email,
        password,
      };
      const errors = HF.validate(SIGNINFIELDSTOVALIDATE, formInput);
      console.log(errors);
      if (errors) return setError(errors);

      console.log("AS ", auth);
      const { success, data } = await auth.signIn(formInput);
      data
        .then((data) => {
          if (success) {
            company.setCompanyAndToken([
              { token: `Bearer ${data.token}` },
              { company: data.data },
            ]);
            history.push("/");
          } else {
            console.log("FAIL ", data);
            setError(data);
          }
        })
        .catch((err) => console.log("FAIL ", err));
    } catch (error) {
      console.log(error);
      setError({ general: INTERNAL_SERVER_ERROR_MSG });
    } finally {
      setIsLoading(false);
    }
  };
  const history = useHistory();

  return (
    <Grid container justify="center" className={logingrid}>
      <Grid item lg={8} sm={8} xs={10}>
        <h2>SIGN IN FORM</h2>
        <form>
          <TextField
            autoComplete="off"
            label="Email"
            value={email}
            onChange={handleChange}
            fullWidth
            helperText={error && error["email"]}
            error={error && !!error["email"]}
            className={textField}
            name="email"
          />
          <TextField
            autoComplete="off"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            fullWidth
            helperText={error && error["password"]}
            error={error && !!error["password"]}
            className={textField}
          />{" "}
          {!!(error && error["general"]) && (
            <Typography variant="body2" color="secondary">
              {error && error["general"]}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            className={button}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading && (
              <CircularProgress
                color="secondary"
                size="2rem"
                className={loading}
              />
            )}
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};
export default withStyles(style(theme))(SignIn);
