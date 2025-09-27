import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import TransactionModal from '../components/TransactionModal';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({ type: '', startDate: '', endDate: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchTransactions = async () => {
    const res = await axios.get('/api/transactions', { params: filters });
    setTransactions(res.data.transactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleOpenModal = (transaction = null) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setModalOpen(false);
  };

  const handleSave = () => {
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await axios.delete(`/api/transactions/${id}`);
      fetchTransactions();
    }
  };

  return (
    <Paper>
      <Grid container spacing={2} sx={{ p: 2 }} justifyContent="space-between">
        <Grid item xs={12} sm={8} md={10} container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={filters.type} label="Type" name="type" onChange={handleFilterChange}>
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} fullWidth InputLabelProps={{ shrink: true }} label="Start Date" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} fullWidth InputLabelProps={{ shrink: true }} label="End Date" />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={2} container justifyContent="flex-end" alignItems="center">
            <Button variant="contained" onClick={() => handleOpenModal()}>Add Transaction</Button>
        </Grid>
      </Grid>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(transaction)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(transaction.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TransactionModal open={modalOpen} handleClose={handleCloseModal} transaction={selectedTransaction} onSave={handleSave} />
    </Paper>
  );
};

export default TransactionsPage;
