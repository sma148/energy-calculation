import React from 'react';
import { Grid, TextField } from '@mui/material';

const UsageInput = ({ label, value, onChange }) => {
    return (
        <Grid item xs={12}>
            <TextField
                label={label}
                type="number"
                value={value}
                onChange={onChange}
                fullWidth
            />
        </Grid>
    );
};

export default UsageInput;
