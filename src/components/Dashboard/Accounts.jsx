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

const data = [
  { name: "Jan", debit: 100, credit: 200 },
  { name: "Feb", debit: 200, credit: 180 },
  { name: "Mar", debit: 150, credit: 160 },
  { name: "Apr", debit: 180, credit: 170 },
  { name: "May", debit: 220, credit: 200 },
  { name: "Jun", debit: 170, credit: 190 },
  { name: "Jul", debit: 190, credit: 180 },
  { name: "Aug", debit: 230, credit: 170 },
  { name: "Sep", debit: 140, credit: 190 },
  { name: "Oct", debit: 170, credit: 180 },
  { name: "Nov", debit: 220, credit: 200 },
  { name: "Dec", debit: 180, credit: 210 },
];

const Accounts = () => {
  return (
    // Main content
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#ffffff" }}>
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
                20,700 TK
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
                31,700 TK
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
                34,200 TK
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
          <BarChart data={data}>
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
