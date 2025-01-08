import { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  ListItemText,
  Grid,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddAccounting = () => {
  const [date, setDate] = useState(null);
  const [accountType, setAccountType] = useState("");
  const [accountHead, setAccountHead] = useState("");
  const [amount, setAmount] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newAccountHeadType, setNewAccountHeadType] = useState("Debit");
  const [newAccountHeadName, setNewAccountHeadName] = useState("");

  const accountTypes = ["Income", "Expense"];
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  // API functions
  const fetchAccountHeads = async () => {
    const response = await axios.get(
      "https://pure-ledger-backend.vercel.app/api/account-heads",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  };

  const addTransaction = async (transactionData) => {
    const response = await axios.post(
      "https://pure-ledger-backend.vercel.app/api/transactions",
      transactionData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  };

  const addAccountHead = async (accountHeadData) => {
    const response = await axios.post(
      "https://pure-ledger-backend.vercel.app/api/account-heads",
      accountHeadData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  };

  // Queries and Mutations
  const { data: accountHeads = [], isLoading: isLoadingHeads } = useQuery({
    queryKey: ["accountHeads"],
    queryFn: fetchAccountHeads,
    onError: (error) => {
      toast.error("Failed to fetch account heads");
      console.error("Error fetching account heads:", error);
    },
  });

  const addTransactionMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      toast.success("Transaction added successfully!");
      // Reset form
      setDate(null);
      setAccountType("");
      setAccountHead("");
      setAmount("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add transaction");
      console.error("Error adding transaction:", error);
    },
  });

  const addAccountHeadMutation = useMutation({
    mutationFn: addAccountHead,
    onSuccess: () => {
      queryClient.invalidateQueries(["accountHeads"]);
      toast.success("Account head added successfully!");
      setOpenModal(false);
      setNewAccountHeadName("");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to add account head"
      );
      console.error("Error adding account head:", error);
    },
  });

  // Event Handlers
  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedHead = accountHeads.find((head) => head.name === accountHead);
    if (!selectedHead) {
      toast.error("Invalid account head selected");
      return;
    }

    addTransactionMutation.mutate({
      date,
      accountType,
      accountHeadId: selectedHead._id,
      amount: parseFloat(amount),
    });
  };

  const handleAddHead = () => {
    addAccountHeadMutation.mutate({
      type: newAccountHeadType,
      name: newAccountHeadName,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
      py={6}
      sx={{ maxWidth: "742px", bgcolor: "#F4F4F4", mx: "auto" }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Box sx={{ p: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              color="#5E5E5E"
              sx={{ fontSize: "22px" }}
            >
              Add Accounting
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Choose Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    sx={{ bgcolor: "#fff" }}
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              select
              label="Account Type"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ bgcolor: "#fff" }}
            >
              {accountTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Choose Head"
              value={accountHead}
              onChange={(e) => setAccountHead(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ bgcolor: "#fff" }}
              disabled={isLoadingHeads}
            >
              {accountHeads.map((head) => (
                <MenuItem key={head._id} value={head.name}>
                  {head.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
              sx={{ bgcolor: "#fff" }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, bgcolor: "#2397C8", borderRadius: "4px" }}
              onClick={handleSubmit}
              disabled={addTransactionMutation.isLoading}
            >
              {addTransactionMutation.isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} md={2}>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              bgcolor: "#E0E0E0",
              mt: 16,
              width: "2px",
              height: "310px",
              mx: "auto",
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ p: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              color="#5E5E5E"
              sx={{ fontSize: "22px" }}
            >
              Account Heads
            </Typography>
            {isLoadingHeads ? (
              <Typography>Loading account heads...</Typography>
            ) : (
              <List>
                {accountHeads.map((head) => (
                  <ListItem
                    key={head._id}
                    sx={{ bgcolor: "#ECEDFA", mb: 1, borderRadius: 1 }}
                  >
                    <ListItemText primary={head.name} />
                  </ListItem>
                ))}
              </List>
            )}
            <Typography
              color="primary"
              variant="body2"
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenModal(true)}
            >
              Add Accounts Head
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add Account Head</DialogTitle>
        <DialogContent>
          <RadioGroup
            row
            value={newAccountHeadType}
            onChange={(e) => setNewAccountHeadType(e.target.value)}
          >
            <FormControlLabel value="Debit" control={<Radio />} label="Debit" />
            <FormControlLabel
              value="Credit"
              control={<Radio />}
              label="Credit"
            />
          </RadioGroup>
          <TextField
            label="Type name here"
            value={newAccountHeadName}
            onChange={(e) => setNewAccountHeadName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddHead}
            disabled={addAccountHeadMutation.isLoading}
          >
            {addAccountHeadMutation.isLoading ? "Adding..." : "Add Head"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddAccounting;
