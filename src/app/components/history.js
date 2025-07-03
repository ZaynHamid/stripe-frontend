"use client";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider, CircularProgress } from '@mui/material';
import fetchTransactions from './fetchTranscations';
import { useRouter } from 'next/navigation';

const columns = [
  { id: 'id', label: 'Transaction ID', minWidth: 200 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
  { id: 'currency', label: 'Currency', minWidth: 100 },
  { id: 'created', label: 'Created At', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

export default function StickyHeadTable() {
  const router = useRouter();
  const [customerId, setCustomerId] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        router.replace('/login');
      }
    }
  }, [router]);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("customerId") || null;
      const authToken = localStorage.getItem("token") || null;
      setToken(authToken);
      setCustomerId(id);
    }
  }, []);

  React.useEffect(() => {
    if (!customerId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const trans = await fetchTransactions(customerId, token);
        const formattedData = trans.transactions.map((tx) => ({
          ...tx,
          created: tx.created, 
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
        <>
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      <CircularProgress color='#333'/>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          let value = row[column.id];
                          // Only format date on the client side
                          if (column.id === 'created' && typeof window !== 'undefined' && value) {
                            value = new Date(value * 1000).toLocaleString();
                          }
                          return (
                            <TableCell key={column.id} align={column.align} className='cursor-pointer'>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      </Paper>
    </ThemeProvider>
  );
}
