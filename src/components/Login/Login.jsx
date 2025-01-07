import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
const Login = () => {
  const [formData, setFormData] = useState({
    employeeID: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData,
        {
          withCredentials: true,
        }
      );
      // Show success toast
      //   console.log((response.statusText = "OK"));
      console.log("Cookie token:", Cookies.get("token"));
      if (response.statusText === "OK") {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        toast.success(`Welcome back, ${response.data.fullName}!`);
        // Navigate to dashboard or home
        navigate("/dashboard");
      }
    } catch (err) {
      // Show error toast
      toast.error(err.response?.data?.message || "Invalid login credentials");
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
            width: "100%",
            bgcolor: "#F4FAFC",
            borderRadius: "8px",
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
            Please Login to continue
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* Employee ID */}
            <TextField
              fullWidth
              name="employeeID"
              placeholder="Enter Employee ID here"
              variant="outlined"
              size="small"
              value={formData.employeeID}
              onChange={handleChange}
            />

            {/* Password */}
            <TextField
              fullWidth
              name="password"
              placeholder="Enter Password here"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              size="small"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
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
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
          {/* Footer */}
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              textAlign: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#2397c8",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Register Now!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
