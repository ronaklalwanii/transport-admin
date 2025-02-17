import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { BiShow, BiHide } from "react-icons/bi";

import templateConfigurations from "@/configurations/template";
import { users } from "../../configurations/users";
import { loginUser } from "../../store/auth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async (data) => {
    const hasUser = users.find((u) => u.email === data.email);
    if (hasUser && hasUser.password === data.password) {
      localStorage.setItem("userData", JSON.stringify(hasUser));
      await dispatch(loginUser(hasUser));
      navigate(data.email.includes("admin") ? "/" : "/trips");
    } else {
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        md={6}
        sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
      >
        <Box
          width={600}
          component="img"
          alt="login-image"
          src="/images/pages/login.svg"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            py: 4,
            px: 8,
            gap: 4,
            mx: "auto",
            maxWidth: 600,
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ gap: 1, display: "flex", alignItems: "center" }}>
            {templateConfigurations.logo}
            <Typography variant="h5">
              {templateConfigurations.companyName}
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit(handleLogin)}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
              Welcome Back!
            </Typography>
            <TextField
              fullWidth
              type="email"
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <BiHide /> : <BiShow />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button fullWidth sx={{ mt: 4 }} variant="contained" type="submit">
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
