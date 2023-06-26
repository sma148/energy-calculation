import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const App = () => {
  const [monthlyUsage, setMonthlyUsage] = useState('');
  const [dailyCharge, setDailyCharge] = useState('');
  const [kwhRate, setKwhRate] = useState('');
  const [freePercentage, setFreePercentage] = useState('');
  const [electricityBill, setElectricityBill] = useState('');

  const calculateBill = () => {
    const monthlyUsageValue = parseFloat(monthlyUsage);
    const dailyChargeValue = parseFloat(dailyCharge);
    const kwhRateValue = parseFloat(kwhRate);
    const freePercentageValue = parseFloat(freePercentage);

    const totalCharge = monthlyUsageValue * (kwhRateValue / 100);
    const freeElectricity = (totalCharge * freePercentageValue) / 100;
    const billAmount = totalCharge - freeElectricity + ((dailyChargeValue / 100) * 31);

    setElectricityBill(billAmount.toFixed(2));
  };

  return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{
            mb: '3rem'
          }}>
            Electricity Bill Calculator
          </Typography>
          <Grid container spacing={2}>
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
                  label="Daily Charge (Cents) (including GST)"
                  type="number"
                  value={dailyCharge}
                  onChange={(e) => setDailyCharge(e.target.value)}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Rate per kWh (Cents) (including GST)"
                  type="number"
                  value={kwhRate}
                  onChange={(e) => setKwhRate(e.target.value)}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Free Electricity Percentage (0 - 100)"
                  type="number"
                  value={freePercentage}
                  onChange={(e) => setFreePercentage(e.target.value)}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={calculateBill} fullWidth>
                Calculate
              </Button>
            </Grid>
            {electricityBill && (
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Electricity Bill: ${electricityBill}
                  </Typography>
                </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
  );
};

export default App;
