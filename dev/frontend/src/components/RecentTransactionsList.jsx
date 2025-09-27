import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const RecentTransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get('/api/dashboard/recent-transactions');
      setTransactions(res.data.transactions);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Recent Transactions
      </Typography>
      <List>
        {transactions.map(transaction => (
          <ListItem key={transaction.id}>
            <ListItemText
              primary={transaction.description || (transaction.type === 'income' ? 'Income' : 'Expense')}
              secondary={`$${transaction.amount.toFixed(2)} on ${transaction.date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecentTransactionsList;
