import { Avatar, Box, Button, Typography } from "@mui/material";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <Box sx={{ backgroundColor: "#2397c8" }}>
      <Box sx={{ maxWidth: "1440px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: "1rem 2rem ", md: "1rem 2.875rem " },
          }}
        >
          <Link to="/">
            {" "}
            <img src={logo} alt="Pure Ledger Logo" />
          </Link>
          {token ? (
            <Box sx={{ display: "flex", alignItems: "center",gap:2 }}>
              <Box>
                <Typography sx={{ color: "white", fontWeight: 600 }}>
                  Demo Name
                </Typography>
                <Typography sx={{ color: "white", fontWeight: 500 }}>
                  Demo Position
                </Typography>
              </Box>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Box>
          ) : (
            <Link to="/">
              <Button
                variant="outlined"
                sx={{
                  color: "#ffffff",
                  borderColor: "#ffffff",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
