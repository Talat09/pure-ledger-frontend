import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: null,
    email: "",
    employeeID: "",
    position: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, dateOfBirth: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://pure-ledger-backend.vercel.app/api/users/register",
        {
          ...formData,
          dateOfBirth: formData.dateOfBirth
            ? formData.dateOfBirth.format("YYYY-MM-DD")
            : null,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(
        `Registration successful! Welcome, ${response.data.fullName}`
      );
      setFormData({
        fullName: "",
        gender: "",
        dateOfBirth: null,
        email: "",
        employeeID: "",
        position: "",
        password: "",
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Toaster position="top-center" reverseOrder={false} />
      <Box sx={{ maxWidth: "414px", mx: "auto" }}>
        <Box
          sx={{
            mt: 8,
            bgcolor: "#F4FAFC",
            borderRadius: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            p: 4,
            borderTop: "4px solid #2397c8",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ color: "#2397c8", mb: 1, fontWeight: "bold" }}
          >
            Welcome to PureLedger
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", mb: 4 }}>
            Fill up this form to Register
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />

            {/* Gender and Date of Birth */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date Of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField {...params} size="small" required />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />

            {/* Employee ID */}
            <TextField
              fullWidth
              label="Employee ID"
              name="employeeID"
              value={formData.employeeID}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />

            {/* Position in Organization */}
            <TextField
              fullWidth
              label="Position In Organization"
              name="position"
              value={formData.position}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />

            {/* Register Button */}
            <Button
              type="submit"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                bgcolor: "#2397c8",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#2397c8",
                },
                borderRadius: "4px",
              }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Registration;
