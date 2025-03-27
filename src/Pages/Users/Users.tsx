import { Box, Button, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Utils/constants';
// import { GetAllBranch } from '../../Store/actions/branchAction';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CETables from '../../Components/Layouts/CETables';
// import { encryptSingleData, setSiteTitle } from '../../Utils/helpers';
// import { resetSavedBranch } from '../../Store/reducers/branchSlice';

const Branch = () => {
  // const dispatch: AppDispatch = useDispatch();
  // const navigate = useNavigate();
  // const { getAllBranches, savedBranch, isLoading } = useSelector((state: any) => state.branch);
  // const [data, setData] = useState<any>([]);
  const canDelete = true; // Assuming this comes from user permissions

  // useEffect(() => {
  //   document.title = setSiteTitle('Branch')
  //   dispatch(GetAllBranch(0));
  //   if (savedBranch > 0) {
  //     dispatch(resetSavedBranch());
  //     toast.success("Branch has been saved !");
  //   }
  // }, [dispatch, savedBranch]);

  // useEffect(() => {
  //   setData(getAllBranches);
  // }, [getAllBranches]);

  // Define the columns for the CETables
  const data = [
    {
      BranchID: 1,
      UserName: 'Branch 1',
      UserID: 'B001',
      DisplayName: 'Company 1',
      PhoneNumber: '1234567890',
      OpeningDate: '2021-10-01',
    },
    {
      BranchID: 2,
      UserName: 'Branch 2',
      UserID: 'B002',
      DisplayName: 'Company 2',
      PhoneNumber: '1234567890',
      OpeningDate: '2021-10-02',
    },
    {
      BranchID: 3,
      UserName: 'Branch 3',
      UserID: 'B003',
      DisplayName: 'Company 3',
      PhoneNumber: '1234567890',
      OpeningDate: '2021-10-03',
    },
    {
      BranchID: 4,
      UserName: 'Branch 4',
      UserID: 'B004',
      DisplayName: 'Company 4',
      PhoneNumber: '1234567890',
      OpeningDate: '2021-10-04',
    },
    {
      BranchID: 5,
      UserName: 'Branch 5',
      UserID: 'B005',
      DisplayName: 'Company 5',
      PhoneNumber: '1234567890',
      OpeningDate: '2021-10-05',
    },
  ]
  const columns: any = [
    { accessorKey: 'UserName', header: 'User Name' },
    { accessorKey: 'UserID', header: 'User ID' },
    { accessorKey: 'DisplayName', header: 'Display Name' },
    { accessorKey: 'PhoneNumber', header: 'PhoneNumber' },
    { accessorKey: 'OpeningDate', header: 'Opening Date' },
  ];

  const handleEdit = (id: any) => {
    // Navigate to the edit page with the BranchID
    // navigate(`/branch/edit/${encryptSingleData(id)}`);
  };

  const handleDelete = (id: any) => {
    // Custom delete logic here
    toast.success(`Deleted row with ID: ${id}`);
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
        <Button variant="contained" color="primary" component={Link} to="/user/create">
          Add User
        </Button>
      </Box>

      {/* Pass props to CETables */}
      <CETables
        data={data}
        // loading={isLoading} // Loading state passed to CETables
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
