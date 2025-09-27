import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TransactionModal = ({ open, handleClose, transaction, onSave }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    category_id: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
        category_id: transaction.category_id,
        description: transaction.description
      });
    }
  }, [transaction]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('/api/categories');
      setCategories(res.data.categories);
    };
    fetchCategories();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (transaction) {
      await axios.put(`/api/transactions/${transaction.id}`, formData);
    } else {
      await axios.post('/api/transactions', formData);
    }
    onSave();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {transaction ? 'Edit Transaction' : 'Add Transaction'}
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select value={formData.type} label="Type" name="type" onChange={onChange}>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Amount" name="amount" type="number" value={formData.amount} onChange={onChange} fullWidth margin="normal" required />
          <TextField label="Date" name="date" type="date" value={formData.date} onChange={onChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select value={formData.category_id} label="Category" name="category_id" onChange={onChange} required>
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Description" name="description" value={formData.description} onChange={onChange} fullWidth margin="normal" />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
