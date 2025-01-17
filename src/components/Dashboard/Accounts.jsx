import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
// import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../Loader/Loader";

const Accounts = () => {
  const token = localStorage.getItem("token");

  // Define the fetcher function
  const fetchTransactions = async () => {
    const response = await axios.get(
      "https://pure-ledger-backend.vercel.app/api/transactions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  // Use React Query's useQuery (v5 syntax)
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["transactions", token],
    queryFn: fetchTransactions,
    enabled: !!token, // Only fetch if token exists
    onError: () => {
      toast.error("Failed to fetch account heads");
    },
  });

  // Calculate total debit, credit, and amount
  const totalDebit = data
    ?.filter((item) => item?.accountHead?.type === "Debit")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalCredit = data
    ?.filter((item) => item?.accountHead?.type === "Credit")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalAmount = totalDebit + totalCredit;

  // Month summary
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const summary = months.map((month) => ({
    name: month,
    debit: 0,
    credit: 0,
  }));

  data.forEach((item) => {
    const monthIndex = new Date(item.createdAt).getMonth(); // Extract month from 'createdAt'
    if (item.accountHead.type === "Debit") {
      summary[monthIndex].debit += item.amount;
    } else if (item.accountHead.type === "Credit") {
      summary[monthIndex].credit += item.amount;
    }
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data</div>;
  return (
    // Main content
    <Box sx={{ flexGrow: 1, p: 3, mr: { md: 28 }, bgcolor: "#ffffff" }}>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: "#F6DBDB" }}>
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                color="error"
                sx={{ textAlign: "end", fontWeight: 600 }}
              >
                {totalDebit} Tk
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="#868686">
                Total Debit
              </Typography>
              <Typography variant="body2" color="#5E5E5E">
                This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: "#E0F6DB" }}>
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                color="success"
                sx={{ textAlign: "end", fontWeight: 600 }}
              >
                {totalCredit} Tk
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="#868686">
                Total Credit
              </Typography>
              <Typography variant="body2" color="#5E5E5E">
                This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: "#F6EBDB" }}>
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                color="warning.dark"
                sx={{ textAlign: "end", fontWeight: 600 }}
              >
                {totalAmount} Tk
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="#868686">
                Total Amount
              </Typography>
              <Typography variant="body2" color="#5E5E5E">
                This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Yearly Account Analysis</Typography>
          <Select value={2024} size="small">
            <MenuItem value={2024}>Year 2024</MenuItem>
          </Select>
        </Box>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="debit" fill="#ff8e5e" />
            <Bar dataKey="credit" fill="#52e30e" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Accounts;
