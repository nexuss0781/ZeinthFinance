import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

const KeyMetricsCard = () => {
  const [metrics, setMetrics] = useState({ total_income: 0, total_expenses: 0, net_balance: 0 });

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await axios.get('/api/dashboard/metrics');
      setMetrics(res.data);
    };
    fetchMetrics();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Key Metrics (Current Month)
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h5" color="green">${metrics.total_income.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h5" color="red">${metrics.total_expenses.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Net Balance</Typography>
            <Typography variant="h5">${metrics.net_balance.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default KeyMetricsCard;
