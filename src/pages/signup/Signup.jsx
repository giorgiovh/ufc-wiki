import { useState } from 'react'

// mui
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

// hooks
import { useSignup } from '../../hooks/useSignup';
import { useSignupWithGoogle } from '../../hooks/useSignupWithGoogle';

// polished
import { darken } from 'polished';

// alpha
import { alpha } from '@mui/material/styles';

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const { error: errorEmail, setError: setEmailError, isPending: isPendingEmail, signup } = useSignup()
  const { error: errorGoogle, setError: setGoogleError, isPending: isPendingGoogle, signupWithGoogle } = useSignupWithGoogle()

  const darkerRed = darken(0.1, '#d20a0a');

  const handleSignupWithEmail = (event) => {
    event.preventDefault();
    setGoogleError(null)
    signup(email, password, displayName);
  }

  const handleSignupWithGoogle = (event) => {
    event.preventDefault();
    setEmailError(null)
    signupWithGoogle();
  }

  return (
    <>
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="new-password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="displayname"
                    label="Display Name"
                    name="displayname"
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                  />
                </Grid>

                {!isPendingEmail && (
                  <Button
                    onClick={handleSignupWithEmail}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: '#d20a0a',
                      '&:hover': {
                        backgroundColor: darkerRed,
                        '@media (hover: none)': {
                          backgroundColor: '#d20a0a',
                        },
                      },
                    }}
                    disabled={email === "" || password === "" || displayName === ""}
                  >
                    Sign Up
                  </Button>
                )}
                {isPendingEmail && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                  >
                    loading
                  </Button>
                )}
                {errorEmail && <div className='error'>{errorEmail}</div>}
                {!isPendingEmail && (
                  <>
                    <Grid item xs={12}>
                      <Typography align="center">OR</Typography>
                    </Grid>
                    {!isPendingGoogle && (
                      <Button
                        onClick={handleSignupWithGoogle}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          backgroundColor: '#d20a0a',
                          '&:hover': {
                            backgroundColor: darkerRed,
                            '@media (hover: none)': {
                              backgroundColor: '#d20a0a',
                            },
                          },
                        }}
                      >
                        Sign Up with Google
                      </Button>
                    )}
                    {isPendingGoogle && (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled
                      >
                        loading
                      </Button>
                    )}
                    {errorGoogle && <div className='error'>{errorGoogle}</div>}
                  </>
                )}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      href="/login"
                      variant="body2"
                      sx={{
                        color: '#d20a0a',
                        textDecoration: 'none',
                        borderBottom: `1px solid ${alpha('#d20a0a', 0.5)}`, // greyed out red
                        '&:hover': {
                          borderBottom: '1px solid #d20a0a', // regular red on hover
                        },
                      }}
                    >
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}