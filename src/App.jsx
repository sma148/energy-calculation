import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FreeElectricitySlider from './FreeElectricitySlider';

const App = () => {
  const [monthlyUsage, setMonthlyUsage] = useState('');
  const [dailyCharge, setDailyCharge] = useState('');
  const [kwhRate, setKwhRate] = useState('');
  const [freePercentage, setFreePercentage] = useState(0);
  const [includingGST1, setIncludingGST1] = useState(true);
  const [includingGST2, setIncludingGST2] = useState(true);
  const [electricityBill, setElectricityBill] = useState('');

  const calculateBill = () => {
    const monthlyUsageValue = parseFloat(monthlyUsage);
    const dailyChargeValue = parseFloat(dailyCharge);
    const kwhRateValue = parseFloat(kwhRate);
    const freePercentageValue = parseFloat(freePercentage);

    const gstRate1 = includingGST1 ? 1 : 1.15;
    const gstRate2 = includingGST2 ? 1 : 1.15;
    const totalCharge = monthlyUsageValue * (kwhRateValue * gstRate2 / 100);
    const freeElectricity = (totalCharge * freePercentageValue) / 100;
    const billAmount = totalCharge - freeElectricity + ((dailyChargeValue * gstRate1 / 100) * 31) + ((totalCharge) / 100);

    setElectricityBill(billAmount.toFixed(2));
  };

  return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom sx={{ mb: '3rem' }}>
                <MonetizationOnIcon
                    sx={{ fontSize: '2.5rem', verticalAlign: 'middle', marginRight: '0.5rem' }}
                />
                Electricity Bill Calculator
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
                  label="Daily Charge (Cents)"
                  type="number"
                  value={dailyCharge}
                  onChange={(e) => setDailyCharge(e.target.value)}
                  fullWidth
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={includingGST1}
                        onChange={() => setIncludingGST1(!includingGST1)}
                    />
                  }
                  label="Including GST"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  label="Rate per kWh (Cents)"
                  type="number"
                  value={kwhRate}
                  onChange={(e) => setKwhRate(e.target.value)}
                  fullWidth
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={includingGST2}
                        onChange={() => setIncludingGST2(!includingGST2)}
                    />
                  }
                  label="Including GST"
              />
            </Grid>
            <FreeElectricitySlider value={freePercentage} onChange={setFreePercentage} />
            <Grid item xs={12}>
              <Button variant="contained" onClick={calculateBill} fullWidth>
                Calculate
              </Button>
            </Grid>
            {electricityBill && (
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Estimated Electricity Bill: ${electricityBill}
                  </Typography>
                  <Typography variant="h6" align="center">
                    (Based on a 31-day month)
                  </Typography>
                </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
  );
};

export default App;
