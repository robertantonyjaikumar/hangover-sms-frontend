import { useEffect, useState } from 'react';
import { Paper, Typography, Box, FormControl, Button, TextField, InputLabel, CircularProgress, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import { AppDispatch } from '../../Utils/constants';
import { setSiteTitle } from '../../Utils/helpers';
import { CreateNewUser } from '../../Store/actions/userAction';
import moment from 'moment';

const CreateUser = () => {
  const dispatch: AppDispatch = useDispatch();
  let navigate = useNavigate();
  const { control, register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const { isLoading, success } = useSelector((state: any) => state.user)
  const [dob, setDob] = useState<any>(null);
  const [countryVal, setCountryVal] = useState<any>("");
  const countryDropdown = [
    { id: 1, name: 'India', shortCode: 'IN' },
    { id: 2, name: 'USA', shortCode: 'US' },
    { id: 3, name: 'Canada', shortCode: 'CA' },
  ]
  useEffect(() => {
    document.title = setSiteTitle('Add User')
  }, [])

  console.log(success)
  useEffect(() => {
    if (success?.status == "success") {
      navigate("/users");
    } else if (success?.status == "fail") {
      toast.error("unable to save the record !");
    }
  }, [success])


  const onSubmit = (data: any) => {
    try {
      // console.log(data);
      dispatch(CreateNewUser(data))
    } catch (error) {
      toast.error("some Error Please try after some time !")
      console.error('User Create error:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <ToastContainer />
      {/* Panel Header */}
      <Box
        sx={{
          backgroundColor: '#17a2b8', // MUI primary color
          padding: '10px 16px',
        }}
      >
        <Typography variant="h6" color="white">
          Add User
        </Typography>
      </Box>

      {/* Panel Content */}
      <Box sx={{ padding: '16px', flexGrow: 1 }}>
        <Typography sx={{ marginBottom: 2 }} component={'div'}>
          <FormControl fullWidth>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                <TextField
                  id="username"
                  label="Username *"
                  variant="outlined"
                  size="small"
                  fullWidth
                  {...register("username", { required: "Username is required" })}
                  // onChange={(event) => addBranch.setFieldValue('BranchName', event.target.value)}
                  error={errors.username ? true : false}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                <TextField
                  id="first_name"
                  label="First Name *"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={errors.first_name ? true : false}
                  {...register("first_name", { required: "First Name is required" })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                <TextField
                  id="middle_name"
                  label="Middle Name *"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={errors.middle_name ? true : false}
                  {...register("middle_name", { required: "Middle Name is required" })}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                <TextField
                  id="last_name"
                  label="Last Name *"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={errors.last_name ? true : false}
                  {...register("last_name", { required: "Last Name is required" })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                <TextField
                  id="display_name"
                  label="Display Name *"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={errors.display_name ? true : false}
                  {...register("display_name", { required: "Display Name is required" })}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                <TextField
                  id="contact_number"
                  label="Contact Number *"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={errors.contact_number ? true : false}
                  {...register("contact_number", { required: "Contact Number is required" })}
                />
                {/* {addBranch.touched.ManagerName && addBranch.errors.ManagerName ? <FormLabel sx={{ color: 'red' }}>{addBranch.errors.ManagerName}</FormLabel> : null} */}
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                <TextField
                  id="email"
                  label="Email *"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={errors.email ? true : false}
                  {...register("email", { required: "Email is required" })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                <TextField
                  id="password"
                  label="Password *"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={errors.password ? true : false}
                  {...register("password", { required: "Password is required" })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="DOB *"
                    closeOnSelect={true}
                    value={dob}
                    slots={{ textField: TextField }}
                    onChange={(date) => {
                      if (date) {
                        // const formattedDate = date.format("DD-MM-YYYY");
                        setValue("dob", date, { shouldValidate: true });
                        setDob(date);
                      }
                    }}
                    slotProps={{
                      textField: {
                        size: "small",
                        error: errors.dob ? true : false,
                        sx: { width: '100%' },
                        id: "dob",
                        name: "dob"
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="country-select">Country</InputLabel>
                  <Select
                    labelId="country-select"
                    id="country-select"
                    value={countryVal}
                    label="Country"
                    size='small'
                    error={errors.country_code ? true : false}
                    {...register("country_code", { required: "Country is required" })}
                    onChange={(e: any) => setCountryVal(e?.target?.value)}
                  >
                    {
                      countryDropdown?.length > 0 && countryDropdown?.map((data: any, idx: any) => {
                        return (
                          <MenuItem key={data?.id} value={data?.shortCode}>{data?.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
          <Grid container spacing={1} mt={2}>
            <Grid size={{ xs: 8, sm: 8, md: 8 }}>
              <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary" sx={{ backgroundColor: '#17a2b8', color: 'white' }} disabled={isLoading == true ? true : false}>
                {
                  isLoading == true ?
                    <>
                      <CircularProgress
                        size={25}
                        sx={{
                          color: '#FFF'
                        }}
                      />&nbsp;&nbsp;Saving ...
                    </>
                    : 'Submit'
                }
              </Button>
            </Grid>
            <Grid size={{ xs: 4, sm: 4, md: 4 }}>
              <Button onClick={() => navigate("/users")} variant="outlined" color="error">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Paper>
  )
}

export default CreateUser