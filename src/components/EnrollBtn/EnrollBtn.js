import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

import './enrollBtn.css';

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(purple[500]),
	backgroundColor: purple[500],
	'&:hover': {
		backgroundColor: purple[700],
	},
}));

export default function EnrollBtn() {
	return (
		<Stack className="buyAndCartBtn" spacing={3} direction="row">
			<Button variant="contained" className="buyBtn" sx={{ py: 1, px: 4, fontSize: 18 }} color="success">
				Buy Now
			</Button>
			<ColorButton variant="contained" className="CartBtn" sx={{ py: 1, px: 4, fontSize: 18 }}>
				Add To Cart
			</ColorButton>
		</Stack>
	);
}
