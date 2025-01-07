import  { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddAccounting = () => {
  const [date, setDate] = useState(null);
  const [accountType, setAccountType] = useState('');
  const [accountHead, setAccountHead] = useState('');
  const [amount, setAmount] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newAccountHeadType, setNewAccountHeadType] = useState('Debit');
  const [newAccountHeadName, setNewAccountHeadName] = useState('');

  const accountTypes = ['Income', 'Expense'];
  const accountHeads = ['Transportation', 'Office maintenance', 'Courier cost', 'Stationary', 'Food'];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      date,
      accountType,
      accountHead,
      amount,
    });
  };

  const handleAddHead = () => {
    console.log({
      type: newAccountHeadType,
      name: newAccountHeadName,
    });
    setOpenModal(false); // Close the modal
    setNewAccountHeadName(''); // Reset the input
  };

  return (
    <Box display="flex" justifyContent="space-between" p={4}>
      {/* Left Side: Form */}
      <Box component="form" onSubmit={handleSubmit} maxWidth={400}>
        <Typography variant="h6" gutterBottom>
          Add Accounting
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Choose Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <TextField
          select
          label="Account Type"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          fullWidth
          margin="normal"
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
        >
          {accountHeads.map((head) => (
            <MenuItem key={head} value={head}>
              {head}
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
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>

      {/* Right Side: Account Heads */}
      <Box ml={4}>
        <Typography variant="h6" gutterBottom>
          Account Heads
        </Typography>
        <List>
          {accountHeads.map((head, index) => (
            <ListItem key={index}>
              <ListItemText primary={head} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography
          color="primary"
          variant="body2"
          sx={{ cursor: 'pointer' }}
          onClick={() => setOpenModal(true)}
        >
          Add Accounts Head
        </Typography>
      </Box>

      {/* Modal for Adding Account Head */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add Account Head</DialogTitle>
        <DialogContent>
          <RadioGroup
            row
            value={newAccountHeadType}
            onChange={(e) => setNewAccountHeadType(e.target.value)}
          >
            <FormControlLabel value="Debit" control={<Radio />} label="Debit" />
            <FormControlLabel value="Credit" control={<Radio />} label="Credit" />
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
          <Button variant="contained" onClick={handleAddHead}>
            Add Head
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddAccounting;
