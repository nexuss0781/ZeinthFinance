import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const MonthlySummaryChart = ({ filters }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/reports/income-expense-summary', { params: filters });
      setData(res.data);
    };
    fetchData();
  }, [filters]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#82ca9d" />
        <Bar dataKey="expense" fill="#ff6961" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlySummaryChart;
