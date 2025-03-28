import { Box, Button, IconButton, /*Paper, Typography*/ } from '@mui/material';
import { MaterialReactTable, MRT_Row, useMaterialReactTable } from 'material-react-table';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from 'react';
import excelExportImage from '../../assets/icons/exportexcel.svg';
import pdfExportImage from '../../assets/icons/exportpdf.svg';
import excelSelectedExportImg from '../../assets/icons/file-excel-regular.svg';
import pdfSelectedExportImg from '../../assets/icons/file-pdf-regular.svg';

interface CETablesProps<T> {
  data: T[];
  loading?: boolean;
  columns: { accessorKey: keyof T; header: string; Cell?: any }[]; // Optional Cell for custom rendering
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  showDeleteIcon?: boolean;
  showEditIcon?: boolean;
  colName: keyof T; // Column name used for ID
  exportFileName?: string;
}

const CETables = <T extends Record<string, any>>({
  data,
  loading = false,
  columns,
  onEdit,
  onDelete,
  showDeleteIcon = true, // Default to true for showing icons
  showEditIcon = true,   // Default to true for showing icons
  colName,
  exportFileName,
}: CETablesProps<T>) => {
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const tableColumns: any = [
    ...columns.map((column) => ({
      accessorKey: column.accessorKey,
      header: column.header,
      // Use existing Cell if defined, otherwise apply default logic
      Cell: column.Cell
        ? column.Cell
        : ({ cell }: { cell: { getValue: () => any } }) => (cell.getValue() ? cell.getValue() : '-'),
      align: 'center',
    })),
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }: { row: MRT_Row<T> }) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          {showEditIcon && (
            <IconButton onClick={() => onEdit(row?.original?.id)}>
              <EditIcon />
            </IconButton>
          )}
          {showDeleteIcon && (
            <IconButton onClick={() => onDelete(row.original[colName])}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ),
      align: 'center',
    },
  ];

  const handleExportRows = (rows: MRT_Row<T>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handlePDFExportData = () => {
    const doc = new jsPDF();
    const tableData = data.map((row) => Object.values(row));
    const tableHeaders = columns.map((column) => column.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save(`${exportFileName}.pdf`);
  };

  const handlePDFExportRows = (rows: MRT_Row<T>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((column) => column.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save(`${exportFileName}_selected.pdf`);
  };

  const table = useMaterialReactTable({
    columns: tableColumns,
    data,
    enableRowSelection: true,
    paginationDisplayMode: 'pages',
    onPaginationChange: setPagination,
    enableColumnFilterModes: true,
    positionToolbarAlertBanner: 'none',
    state: { pagination, isLoading: loading },
    initialState: {
      density: 'compact',
      showColumnFilters: false,
      columnVisibility: { actions: showEditIcon || showDeleteIcon }, // Show actions if either icon is enabled
    },
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    muiPaginationProps: {},
    muiTopToolbarProps: {
      sx: {
        backgroundColor: '#dceaec73',
        color: 'black',
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: '#dceaec73',
        color: 'black',
        fontWeight: 'bold',
      },
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
        <IconButton onClick={() => handleExportData()} sx={{ background: '#17a2b8' }}>
          <img width={24} height={24} src={excelExportImage} alt="Export Excel" />
        </IconButton>
        {/* <div
          onClick={handleExportData} // Add click handler if you need to perform an action
          style={{
            width: '40px', // Set the width of the circle
            height: '40px', // Set the height of the circle (same as width)
            borderRadius: '50%', // Makes the div circular
            backgroundColor: '#17a2b8', // Background color
            display: loading == true ? 'none' : 'flex', // Centers the content
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer', // Change cursor to pointer for better UX
            transition: 'background-color 0.3s', // Smooth transition for hover effect
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#17a2b887')} // Change color on hover
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#17a2b8')} // Revert color when not hovered
        >
          <img width={24} height={24} src={excelExportImage} alt="Export Excel" />
        </div> */}

        <IconButton onClick={() => handleExportRows(table.getSelectedRowModel().rows)} sx={{ background: '#17a2b8', display: !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() ? 'none' : 'flex', }}>
          <img width={24} height={24} src={excelSelectedExportImg} alt="Export Excel" />
        </IconButton>

        <IconButton onClick={() => handlePDFExportData()} sx={{ background: '#17a2b8' }}>
          <img width={24} height={24} src={pdfExportImage} alt="Export PDF" />
        </IconButton>

        <IconButton onClick={() => handlePDFExportRows(table.getSelectedRowModel().rows)} sx={{ background: '#17a2b8', display: !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() ? 'none' : 'flex' }}>
          <img width={24} height={24} src={pdfSelectedExportImg} alt="Export Selected PDF" />
        </IconButton>

      </Box >
    ),
  });

  return (
    // <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
    // <Box sx={{ padding: '16px' }}>
    // <Typography component={'div'} sx={{ marginBottom: 2 }}>
    <MaterialReactTable table={table} />
    // </Typography>
    // </Box>
    // </Paper>
  );
};

export default CETables;
