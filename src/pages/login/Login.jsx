import { useState } from 'react'

// hooks
import { useLogin } from '../../hooks/useLogin';
import { useLoginWithGoogle } from '../../hooks/useLoginWithGoogle';

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

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error: errorEmail, isPending: isPendingEmail, login } = useLogin()
  const { error: errorGoogle, isPending: isPendingGoogle, loginWithGoogle } = useLoginWithGoogle()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!isPendingEmail && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={email === '' || password === ''}
              >
                Log In
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
          </Box>
          {!isPendingEmail && (
            <>
              <div style={{"textAlign":"center"}}>OR</div>
              <Button
                onClick={loginWithGoogle}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In with Google
              </Button>
              {errorGoogle && <div className='error'>{errorGoogle}</div>}
            </>
          )}
          <Grid container justifyContent="flex-end">
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}