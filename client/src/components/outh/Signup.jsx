import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import AlertContext from '../../context/alerts/alertContext';
import { useNavigate } from 'react-router-dom';
import { geoJson } from 'leaflet';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  

  const host = process.env.REACT_APP_ADD_SERVER;

     // This is for Alert Context
  const contextAlert = useContext(AlertContext);
  const {updateAlert} = contextAlert;
  const [hidden, setHidden] = useState("invisible");


  const [signup, updateSignup] = useState({fname: "", lname: "",mobile_no: "",email: "", password: ""})
  const {fname,lname, mobile_no, email, password} = signup;

    const navigate = useNavigate();

  const HandleClick = async (event) => {
    const response = await fetch(`${host}/api/public/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, name: fname+" "+lname, mobile_no: mobile_no })
    });
    const json = await response.json();
    
    if(json.success){
      console.log(json)
        navigate("/");
        updateAlert("Account Created Successfully!!", "success");
    }
    else {
        setHidden("");
        updateAlert("Login Failed", "danger");
        setTimeout(()=>{
            setHidden("invisible");
        }, 5000);
    }
  };


  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    updateSignup({ ...signup, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  value={fname}
                  onChange={handleChange}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lname}
                  onChange={handleChange}
                  name="lname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile_no"
                  value={mobile_no}
                  onChange={handleChange}
                  autoComplete="mobile"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={HandleClick}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}