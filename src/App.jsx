import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox, Link,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FreeElectricitySlider from './FreeElectricitySlider';

const App = () => {
  const [monthlyUsage, setMonthlyUsage] = useState('');
  const [dailyCharge, setDailyCharge] = useState('');
  const [kwhRate, setKwhRate] = useState('');
  const [freePercentage, setFreePercentage] = useState(20);
  const [includingGST1, setIncludingGST1] = useState(false);
  const [includingGST2, setIncludingGST2] = useState(false);
  const [electricityBill, setElectricityBill] = useState('');
  const [newElectricityBill, setNewElectricityBill] = useState('');

  const calculateBill = () => {
    const monthlyUsageValue = parseFloat(monthlyUsage);
    const dailyChargeValue = parseFloat(dailyCharge);
    const kwhRateValue = parseFloat(kwhRate);
    const freePercentageValue = parseFloat(freePercentage);
    const isLowUser = monthlyUsageValue < 666.67 ? true : false;
    const contactLowDaily = 103.5;
    const contactLowVariable = 30.13;
    const contactHighDaily = 237.6;
    const contactHighVariable = 22.54;

    const gstRate1 = includingGST1 ? 1 : 1.15;
    const gstRate2 = includingGST2 ? 1 : 1.15;
    const totalCharge = monthlyUsageValue * (kwhRateValue * gstRate2 / 100);
    const oldBillAmount = totalCharge + ((dailyChargeValue * gstRate1 / 100) * 31);
    setElectricityBill(oldBillAmount.toFixed(2));


    const totalChargeContact = isLowUser ?
        monthlyUsageValue * (contactLowVariable / 100):
        monthlyUsageValue * (contactHighVariable / 100);
    const freeElectricity = (totalChargeContact * freePercentageValue) / 100;
    const newBillAmount = isLowUser ?
        (totalChargeContact - freeElectricity + ((contactLowDaily / 100) * 31)):
        (totalChargeContact - freeElectricity + ((contactHighDaily / 100) * 31));

    setNewElectricityBill(newBillAmount.toFixed(2));

  };

  const handleIncludingGST1Change = () => {
    setIncludingGST1(!includingGST1);
    if (!includingGST1) {
      // Apply GST factor
      setDailyCharge((parseFloat(dailyCharge) * 1.15).toFixed(2));
    } else {
      // Remove GST factor
      setDailyCharge((parseFloat(dailyCharge) / 1.15).toFixed(2));
    }
  };

  const handleIncludingGST2Change = () => {
    setIncludingGST2(!includingGST2);
    if (!includingGST2) {
      // Apply GST factor
      setKwhRate((parseFloat(kwhRate) * 1.15).toFixed(2));
    } else {
      // Remove GST factor
      setKwhRate((parseFloat(kwhRate) / 1.15).toFixed(2));
    }
  };

  const handleFreePercentageChange = (value) => {
    setFreePercentage(value);
    calculateBill();
  };

  return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
                Contact Good-Night-Plan
              </Typography>
              <Typography variant="h4" align="center" gutterBottom sx={{ mb: '2rem' }}>
                <MonetizationOnIcon
                    sx={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '0.5rem' }}
                />
                Energy Saving Calculator
                <FlashOnIcon
                    sx={{ fontSize: '2.5rem', verticalAlign: 'middle', marginLeft: '0.5rem' }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Monthly Usage (kWh)"
                  type="number"
                  value={monthlyUsage}
                  onChange={(e) => setMonthlyUsage(e.target.value)}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Daily Charge of Your Old Electricity Company (Cents)"
                  type="number"
                  value={dailyCharge}
                  onChange={(e) => setDailyCharge(e.target.value)}
                  fullWidth
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={includingGST1}
                        onChange={handleIncludingGST1Change}
                    />
                  }
                  label="Including GST"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Rate per kWh of Your Old Electricity Company (Cents)"
                  type="number"
                  value={kwhRate}
                  onChange={(e) => setKwhRate(e.target.value)}
                  fullWidth
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={includingGST2}
                        onChange={handleIncludingGST2Change}
                    />
                  }
                  label="Including GST"
              />
            </Grid>
            <FreeElectricitySlider value={freePercentage}
                                   onChange={handleFreePercentageChange} />
            <Grid item xs={12}>
              <Button variant="contained" onClick={calculateBill} fullWidth>
                Calculate
              </Button>
            </Grid>
            {electricityBill && (
                <Grid item xs={12}>
                  <Typography variant="h5" align="center" sx={{color: 'red'}}>
                    Estimated Electricity Bill:{' '}
                  </Typography>
                  <Typography variant="h5" align="center">
                    <span style={{ color: 'red' }}>${electricityBill}</span>
                  </Typography>
                  <Typography variant="h5" align="center" sx={{color: 'blue'}}>
                    Contact Good-Night-Plan Electricity Bill:{' '}
                  </Typography>
                  <Typography variant="h5" align="center">
                    <span style={{ color: 'blue' }}>${newElectricityBill}</span>
                  </Typography>
                  <Typography variant="h3" align="center" sx={{color: 'green'}}>
                    Savings: ${(electricityBill - newElectricityBill).toFixed(2)}
                  </Typography>
                  <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mt: 2, color: 'red'}}>
                      Sign-up Now with my invitation Code and get $100 credit!
                    </Typography>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mt: 2, color: 'black'}}>
                      Code: FRDK55B
                    </Typography>
                    <Typography align='center'>
                      <Link href="https://contact.co.nz/friends/FRDK55B" variant="h5" sx={{ fontWeight: 'bold', mt: 2, color: 'red', align: 'center'}}>
                       Sign-up Link Click Here
                      </Link>
                    </Typography>
                  </Paper>
                  <Typography variant="h6" align="center">
                    (Including GST & Based on a 31-day month)
                  </Typography>
                </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
  );
};

export default App;
