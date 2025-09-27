import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import KeyMetricsCard from '../components/KeyMetricsCard';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import RecentTransactionsList from '../components/RecentTransactionsList';
import QuickAddForm from '../components/QuickAddForm';

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const handleAddTransaction = () => {
    setRefresh(!refresh);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <QuickAddForm onAddTransaction={handleAddTransaction} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <KeyMetricsCard key={refresh} />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <IncomeExpenseChart key={refresh} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <RecentTransactionsList key={refresh} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
