import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { useState } from 'react';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/pagewrapper';
import toast from 'react-hot-toast';

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const handleClick = () => {
    if (!username) return toast.error('Email cannot be blank');
    if (!password) return toast.error('Password cannot be blank');
    if (!repassword) return toast.error('RePassword cannot be blank');
    if(repassword !== password) return toast.error('RePassword is not the same as the password');
    navigate('/login');
  };
  return (
    <PageWrapper>
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <form noValidate autoComplete="off" onSubmit={handleClick}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Box sx={{
              display: 'flex', justifyContent: 'center',
              flexDirection: 'column', alignItems: 'center'
            }}>
              <AccountCircleOutlinedIcon sx={{ fontSize: '60px' }} />
              <Typography variant="h4" color="inherit">
                {"Sign in"}
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex', justifyContent: 'center', marginTop: '20px'
            }}>
              <TextField
                sx={{ width: '400px' }}
                id="outlined-name"
                label="Emial address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{
              display: 'flex', justifyContent: 'center',
            }}>
              <TextField
                sx={{ width: '400px' }}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{
              display: 'flex', justifyContent: 'center',
            }}>
              <TextField
                sx={{ width: '400px' }}
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', }}>
              <Typography onClick={() => navigate('/login')} sx={{ textDecoration: 'underline', cursor: 'pointer' }} variant="body" color="#787878">
                back to log in
              </Typography>
            </Box>
            <Button onClick={() => handleClick()} sx={{ marginTop: '30px', background: '#ffa65c', color: 'white' }} variant="outlined" color="warning">
              {"Sign in"}
            </Button>
          </Box>
        </form>
      </Box>
    </PageWrapper>
  );
}

export default Signin;