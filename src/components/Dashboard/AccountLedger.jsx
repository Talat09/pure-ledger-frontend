import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"; // Toggle icon
import Accounts from "./Accounts"; // Import the Accounts component
import { useState } from "react";
import AddAccounting from "./AddAccounting";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
const AccountLedger = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track active index
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // Toggle sidebar text
  const navigate = useNavigate();
  const handleListItemClick = (index) => {
    setSelectedIndex(index); // Update the active index
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded); // Toggle sidebar text visibility
  };
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Navigate to the home route

    navigate("/");
  };
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarExpanded ? 200 : 60, // Adjust width based on sidebarExpanded
          p: 1,

          bgcolor: "#E2F2F8", // Directly set the bgcolor
          transition: "width 0.3s ease", // Smooth transition for width change
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#2397C8",
              display: sidebarExpanded ? "block" : "none",
              fontWeight: 500,
            }}
          >
            Accounting {/* Toggle button to expand/collapse sidebar */}
          </Typography>
          <IconButton onClick={toggleSidebar} sx={{}}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>

        <List>
          <ListItem
            button
            selected={selectedIndex === 0} // Active route check
            onClick={() => handleListItemClick(0)}
            sx={{
              cursor: "pointer",
              borderLeft: selectedIndex === 0 ? "4px solid #2397C8" : "none",
              bgcolor: selectedIndex === 0 ? "#D1E9F3" : "none",
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedIndex === 0 ? "#2397C8" : "none",
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            {sidebarExpanded && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1} // Active route check
            onClick={() => handleListItemClick(1)}
            sx={{
              cursor: "pointer",
              borderLeft: selectedIndex === 1 ? "4px solid #2397C8" : "none",
              bgcolor: selectedIndex === 1 ? "#D1E9F3" : "none",
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedIndex === 1 ? "#2397C8" : "none",
              }}
            >
              <AccountBalanceIcon />
            </ListItemIcon>
            {sidebarExpanded && <ListItemText primary="Accounting" />}
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2} // Active route check
            onClick={() => handleListItemClick(2)}
            sx={{
              cursor: "pointer",
              borderLeft: selectedIndex === 2 ? "4px solid #2397C8" : "none",
              bgcolor: selectedIndex === 2 ? "#D1E9F3" : "none",
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedIndex === 2 ? "#2397C8" : "none",
              }}
            >
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            {sidebarExpanded && <ListItemText primary="Reports" />}
          </ListItem>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            {sidebarExpanded && <ListItemText primary="Logout" />}
          </ListItem>
        </List>
      </Box>

      {/* Conditionally render components based on selectedIndex */}
      <Box sx={{ flex: 1, p: 3 }}>
        {selectedIndex === 0 && <Accounts />}
        {selectedIndex === 1 && <AddAccounting />}{" "}
        {/* Show Accounts component when "Accounting" is selected */}
        {selectedIndex === 2 && (
          <Typography variant="h4">Reports Content</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AccountLedger;
