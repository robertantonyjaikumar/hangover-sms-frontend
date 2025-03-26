import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const CTables = (props: {
  data: any[],
  columns: MRT_ColumnDef<any>[],
  loading: boolean,
  showDeleteIcon: boolean,
  showEditIcon: boolean
  colName: string,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
}) => {
  const { data, columns, loading, onEdit, onDelete, showDeleteIcon, showEditIcon, colName } = props;

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, // Customize the default page size
  });

  // Add edit and delete columns dynamically
  const actionColumn = useMemo<MRT_ColumnDef<any>>(() => ({
    accessorKey: 'actions',
    header: 'Actions',
    size: 100,
    Cell: ({ row }) => (
      <div style={{ display: 'flex'/*, justifyContent: 'space-around'*/ }}>
        {showEditIcon && ( // Conditionally render delete icon
          <IconButton onClick={() => onEdit(row.original[colName])} size="small">
            <EditIcon />
          </IconButton>
        )}

        {showDeleteIcon && ( // Conditionally render delete icon
          <IconButton onClick={() => onDelete(row.original[colName])} size="small">
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    ),
  }), [onEdit, onDelete, showDeleteIcon]);

  const table = useMaterialReactTable({
    enableRowSelection: true,
    columns: [...columns, actionColumn], // Include action column in columns
    data: data || [], // Ensure data is stable and handle empty data
    onPaginationChange: setPagination, // Hoist pagination state to your state when it changes internally
    state: { pagination, isLoading: loading },
    initialState: { density: 'compact' },
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    // enableColumnFilters: false,
    muiPaginationProps: {
      // rowsPerPageOptions: [5, 10, 20],
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: '#dceaec73', // #17a2b873 Set the toolbar background color to pink
        color: 'black', // Set toolbar text color to black
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: '#dceaec73', // Set the background color to orange
        color: 'black', // Set the text color to white
        fontWeight: 'bold', // Make header text bold
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CTables;
