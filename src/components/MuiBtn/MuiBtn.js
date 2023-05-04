import * as React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// import './MuiBtn.css';

export default function MuiBtn({ BtnTitle, onBtnClick, isBtnLoading, color, sx, style }) {
    return (
        <Button
            variant="contained"
            color={color}
            id="basic-button"
            aria-haspopup="true"
            onClick={onBtnClick}
            disabled={isBtnLoading}
            style={style}
            sx={sx}
        >
            {isBtnLoading ? <CircularProgress size={30} /> : BtnTitle}
        </Button>
    );
}