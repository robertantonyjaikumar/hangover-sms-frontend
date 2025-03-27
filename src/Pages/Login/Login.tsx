import { useEffect } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import { TERROR, AppDispatch } from '../../Utils/constants';
import { login } from '../../Store/actions/userAction';
import { decryptData, isLoggedIn, setSiteTitle } from '../../Utils/helpers';

function Login() {
  const dispatch: AppDispatch = useDispatch();
  let navigate = useNavigate();
  const { userData, isLoginLoading } = useSelector((state: any) => state.user)
  const { register, handleSubmit, formState: { errors } }: any = useForm();

  useEffect(() => {
    const handleEffect = async () => {
      document.title = setSiteTitle('Login');
      if (userData?.status == "success") {
        toast.success("Success, Trying to login");
      } else if (userData?.status == "fail") {
        toast.error("Username or password is invalid");
      }

      const userTempData: any = (userData) ? userData?.role : decryptData()?.role;
      if ((isLoggedIn() || userData?.length > 0) && userTempData == 'admin') {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    };

    handleEffect();
  }, [userData]);

  const onSubmit = (data: any) => {
    try {
      dispatch(login(data))
    } catch (error) {
      //toast.error("Username or Password invalid !")
      console.error('Login error:', error);
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(https://meepl.day/static/media/BG_image.695bc8e9a6f0435b3f24.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
      }}
    >
      {/* Outer container for the login screen */}
      <ToastContainer />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: { xs: '100%', sm: '90%', md: '80%' }, // Responsive width
          flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
          height: { xs: 'auto', sm: '500px' }, // Auto height on small screens
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: 3,
          bgcolor: 'rgba(255, 255, 255, 0.8)', // Slight transparency
        }}
      >
        {/* Left Side - Message */}
        <Box
          sx={{
            width: { xs: '100%', sm: '50%' }, // Full width on mobile, half on larger screens
            backgroundColor: '#000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}
          className={'cardMain'}
        >
          <Typography variant="h4" gutterBottom>
            School Management System
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, textAlign: 'center' }}>
            Enter your personal details and start your journey with us.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#24b2af', color: '#000', '&:hover': { backgroundColor: '#f4b000' } }}
          >
            Signup For Demo
          </Button>
        </Box>

        {/* Right Side - Login Form */}
        <Box
          sx={{
            width: { xs: '100%', sm: '50%' }, // Full width on mobile, half on larger screens
            backgroundColor: '#24b2af',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: { xs: 2, sm: 4 }, // Adjust padding for small screens
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              width: '150px',
              height: '150px',
              backgroundImage: `url('https://vite.dev/logo.svg')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              alignSelf: 'center',
              marginBottom: 3,
            }}
          />

          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Sign In
          </Typography>

          {/* Email Field */}
          <TextField
            label="User Name"
            variant="standard"
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              sx: { color: "black", "&.Mui-focused": { color: "black" } },
            }}
            name="UserName"
            id="UserName"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <div style={{ color: TERROR }}>{errors.username.message}</div>
          )}

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              sx: { color: "black", "&.Mui-focused": { color: "black" } },
            }}
            name="Password"
            id="Password"
            {...register("password", {
              required: "Password is required",
              // minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && (
            <div style={{ color: TERROR }}>{errors.password.message}</div>
          )}


          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember Me"
            sx={{ marginBottom: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
            <Link href="#" underline="hover" sx={{ color: '#000' }}>
              Forgot Password
            </Link>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#000' } }}
              endIcon={isLoginLoading === true ? "" : <ArrowForwardIcon />}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoginLoading === true ? (
                <CircularProgress
                  size={24} // Adjust size for small buttons
                  sx={{
                    color: '#24b2af'
                  }}
                />
              ) : "Login"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
