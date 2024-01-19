import * as React from 'react';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  FormControl,
  Select,
  MenuItem,
  Modal,
  Button,
  Box,
  Typography,
  TextField,
} from '@mui/material';

const  DurationSelector = ({ months, handleMonthChange,setDateRange,setCalling,calling }) =>{
  const [customDate, setCustomDate] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  


  const monthsData = [
    {
      id: 1,
      month: 1,
      name: 'This Month',
    },
    {
      id: 2,
      month: 3,
      name: 'Last 3 Months',
    },
    {
      id: 3,
      month: 6,
      name: 'Last 6 Months',
    },
    {
      id: 4,
      month: 12,
      name: 'Last 1 Year',
    },
    {
      id: 5,
      month: 0,
      name: 'Custom date range >',
    },
  ];

  // const handleMonthSelection = (selectedMonth) => {

  //   if (selectedMonth === 0) {
  //     setOpenModal(true);
  //     handleMonthChange(selectedMonth);
  //     setCustomDate(true);
  //   } else {
  //     handleMonthChange(selectedMonth);
  //     setCustomDate(false);
  //     setFromDate(null)
  //     setToDate(null)
  //     setDateRange({startDate:null,endDate:null})
  //   }
  // };
  // const handleMonthSelection = (selectedMonth) => {
  //   if (selectedMonth === 0 || customDate == false) {
  //     setOpenModal(true);
  //     handleMonthChange(selectedMonth);
  //     setCustomDate(true);
  //   } else {
  //     handleMonthChange(selectedMonth);
  //     setCustomDate(false);
  //     setFromDate(null);
  //     setToDate(null);
  //     setDateRange({ startDate: null, endDate: null });
  //   }
  // };
  const handleMonthSelection = (selectedMonth) => {
    if (selectedMonth === 0 ) {
      setOpenModal(true);
      handleMonthChange(selectedMonth);
      setCustomDate(true);
    } else {
      handleMonthChange(selectedMonth);
      setCustomDate(false);
      setFromDate(null);
      setToDate(null);
      setDateRange({ startDate: null, endDate: null });
      setOpenModal(false); // Close modal for predefined date ranges
    }
  };

  const handleFromDateChange = (date) => {
    const newDate = date?.format('YYYY-MM-DD')
    setFromDate(newDate);
  };

  const handleToDateChange = (date) => {
    const newDate = date?.format('YYYY-MM-DD')
    setToDate(newDate);
  
  };
  const handleApply = ()=>{
    handleCustomDateSelection();
  }

 
  // const handleCustomDateSelection = () => {
  //   setDateRange({ startDate: fromDate, endDate: toDate });
  //   setCustomDate(false);
  //   setOpenModal(false);
  //   setCalling(!calling);
  // };
  const handleCustomDateSelection = () => {
    setDateRange({ startDate: fromDate, endDate: toDate });
    setCustomDate(false);
    setOpenModal(false);
    setCalling(!calling);
  };

  return (
    <React.Fragment>
      <div className="marginx">
        <FormControl>
          <Select
           
            labelId="duration-label"
            value={months}
            onChange={(event) => handleMonthSelection(event.target.value)}
            sx={{
              height: '2.4em',
              backgroundColor: '#FFFF',
              width: 200,
              textAlign: 'center',
            }}
          >
            {monthsData?.map((item) => (
              <MenuItem
                key={item?.id}
                value={item?.month}
                sx={{
                  backgroundColor: '#FFFF',
                  ':hover': {
                    backgroundColor: '#FFFF',
                    color: 'black',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#FFFF !important',
                    color: 'black',
                  },
                }}
              >
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              p: 4,
              zIndex: 9999,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Select Custom Dates
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="From Date"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  format="YYYY-MM-DD"
                  renderInput={(params) => <TextField {...params} />}
                  // Other props and styling for the DatePicker component
                  // Add required props for date selection
                />
                <DatePicker
                  label="To Date"
                  value={toDate}
                  format="YYYY-MM-DD"
                  onChange={handleToDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  // Other props and styling for the DatePicker component
                  // Add required props for date selection
                />
                <Button onClick={handleCustomDateSelection}>Submit</Button>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
}
export default DurationSelector;




