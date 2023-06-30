import React from 'react';
import { Grid, Typography } from '@mui/material';

const BillAmount = ({ electricityBill }) => {
    return (
        <Grid item xs={12}>
            <Typography variant="h5" align="center">
                Estimated Electricity Bill: ${electricityBill}
            </Typography>
        </Grid>
    );
};

export default BillAmount;
