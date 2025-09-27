import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const QuickAddForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    description: ''
  });

  const { type, amount, date, description } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // This is a simplified version. In a real app, you'd get categories from the API.
    const dummyCategoryId = 1;
    const res = await axios.post('/api/transactions', { ...formData, category_id: dummyCategoryId });
    onAddTransaction(res.data);
    setFormData({ ...formData, amount: '', description: '' });
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" name="type" onChange={onChange}>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Amount" name="amount" type="number" value={amount} onChange={onChange} fullWidth required />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Description" name="description" value={description} onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button type="submit" variant="contained" fullWidth>Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default QuickAddForm;
