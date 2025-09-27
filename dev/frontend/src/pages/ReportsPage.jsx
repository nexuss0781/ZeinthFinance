import React, { useState } from 'react';
import { Grid, Paper, TextField } from '@mui/material';
import ExpensePieChart from '../components/ExpensePieChart';
import MonthlySummaryChart from '../components/MonthlySummaryChart';

const ReportsPage = () => {
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} fullWidth InputLabelProps={{ shrink: true }} label="Start Date" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} fullWidth InputLabelProps={{ shrink: true }} label="End Date" />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <ExpensePieChart filters={filters} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <MonthlySummaryChart filters={filters} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportsPage;
