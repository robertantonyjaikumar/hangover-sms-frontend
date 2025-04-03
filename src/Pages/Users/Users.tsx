import { Box, Button, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { AppDispatch } from '../../Utils/constants';
import { GetAllUsers, DeleteUserById } from '../../Store/actions/userAction';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CETables from '../../Components/Layouts/CETables';
import { encryptSingleData, setSiteTitle } from '../../Utils/helpers';
import { resetSavedUser } from '../../Store/reducers/userSlice'

const Branch = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails, isLoading, success, updateSuccess, deleteSuccess, deleteError } = useSelector((state: any) => state.user);
  const [data, setData] = useState<any>([]);
  const canDelete = true; // Assuming this comes from user permissions

  useEffect(() => {
    document.title = setSiteTitle('Users')
    dispatch(GetAllUsers([]));

    if (success?.status == "success") {
      toast.success("User has been saved !");
      dispatch(resetSavedUser());
    }

    if (updateSuccess?.status == "success") {
      toast.success("User has been updated !");
      dispatch(resetSavedUser());
    }
    if (deleteSuccess?.status == "success") {
      toast.success("User has been deleted !");
      dispatch(resetSavedUser());
    }

    if (deleteError?.status == "success") {
      toast.error("Unable to delete the user !");
      dispatch(resetSavedUser());
    }
  }, [dispatch, success, updateSuccess, deleteSuccess, deleteError]);

  useEffect(() => {
    if (userDetails?.data?.length > 0) {
      const formattedData = userDetails?.data?.map((user: any) => ({
        ...user,
        dob: user.dob ? moment(user.dob).format('DD/MM/YYYY') : 'N/A',
      }));
      setData(formattedData);
    }
  }, [userDetails]);

  // Define the columns for the CETables

  const columns: any = [
    { accessorKey: 'display_name', header: 'Display Name' },
    { accessorKey: 'username', header: 'User Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'contact_number', header: 'Contact Number' },
    { accessorKey: 'dob', header: 'DOB' },
  ];

  const handleEdit = (id: any) => {
    // Navigate to the edit page with the BranchID
    navigate(`/users/edit/${encryptSingleData(id)}`);
  };

  const handleDelete = (id: any) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        dispatch(DeleteUserById(id));
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <ToastContainer />
      <Box
        sx={{
          backgroundColor: '#17a2b8',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" color="white">
          User
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/users/create">
          Add User
        </Button>
      </Box>

      {/* Pass props to CETables */}
      <CETables
        data={data?.length > 0 ? data : []}
        loading={isLoading} // Loading state passed to CETables
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showDeleteIcon={canDelete} // Conditionally show delete icon based on permission
        showEditIcon={true} // Always show the edit icon
        colName="BranchID" // Use BranchID for edit and delete actions
        exportFileName="Branch"
      />
    </Paper>
  );
};

export default Branch;
