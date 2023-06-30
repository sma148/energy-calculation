import React, { useState } from 'react';
import { Grid, Typography, Slider, Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const FreeElectricitySlider = ({ value, onChange }) => {
    const [isTooltipOpen, setTooltipOpen] = useState(false);

    const handleChange = (_, newValue) => {
        onChange(newValue);
    };

    const tooltipValueText = (value) => {
        return `This is your estimated percentage of the power you will use within the "free-power-window" out of your total power usage each day. (default set to 20%)`;
    };

    const handleTooltipOpen = () => {
        setTooltipOpen(true);
    };

    const handleTooltipClose = () => {
        setTooltipOpen(false);
    };

    return (
        <Grid item container xs={12} alignItems="center">
            <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                    Free Electricity Percentage
                </Typography>
            </Grid>
            <Grid item>
                <Tooltip
                    title={tooltipValueText(value)}
                    placement="top"
                    arrow
                    open={isTooltipOpen}
                    onClose={handleTooltipClose}
                    PopperProps={{
                        disablePortal: true,
                    }}
                >
                    <IconButton
                        aria-label="info"
                        size="small"
                        onMouseEnter={handleTooltipOpen}
                        onMouseLeave={handleTooltipClose}
                    >
                        <HelpOutlineIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={12}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="free-electricity-slider"
                    marks
                    min={0}
                    max={100}
                />
            </Grid>
        </Grid>
    );
};

export default FreeElectricitySlider;
