import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


import logoSizeM from '../../../images/logoSizeM.png';

import './navBar.css';

const drawerWidth = 240;

function NavBar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const container = window !== undefined ? () => window().document.body : undefined;

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const [settingsDrawerMenu, setSettingsDrawerMenu] = useState([
		{
			name: 'Home',
			isSelected: true,
			icon: <HomeIcon />,
			page: '/',
		},
		{
			name: 'Courses',
			isSelected: false,
			icon: <MenuBookIcon />,
			// page: <AccountSettings />,
		},
		{
			name: 'Contact',
			isSelected: false,
			icon: <ContactSupportIcon />,
			// page: <AboutSettings />,
		},
		{
			name: 'Cart',
			isSelected: false,
			icon: <ShoppingCartOutlinedIcon />,
			page: '/cart',
		},
	]);


	const drawer = (
		<Box sx={{ textAlign: 'center' }}>
			<div className='underMenuBrandName'>
				<img src={logoSizeM} height='40px' alt="logo" /> SharpLearn
			</div>
			<Divider />
			<List className='phoneMenuList'>
				{settingsDrawerMenu.map((item, index) => (
					<NavLink to={item?.page} key={index} >
						<ListItemButton selected={item.isSelected} sx={{ py: 1.7, pl: 4 }}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</NavLink>
				))}
			</List>
		</Box >
	);

	return (
		<Box className='navBar' sx={{ display: 'flex' }}>
			{/* <CssBaseline /> */}
			<AppBar component="nav">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					<div className="brandName">
						<img src={logoSizeM} alt="logo" /> <span> SharpLearn</span>
					</div>

					<NavLink to='/cart' className='phoneCartBtn'   >
						<Button sx={{ color: '#fff', display: { xs: 'flex', sm: 'none' } }}>
							<AddShoppingCartIcon color="primary" fontSize='medium' /> Cart
						</Button>
					</NavLink>

					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{settingsDrawerMenu.map((item, index) => (
							<NavLink to={item?.page} key={index} >
								<Button
									sx={item.name === 'Cart' ? { ml: 2, color: '#fff' } : { color: '#fff' }}
								>
									{item.name === 'Cart' ? (
										<>
											{' '}
											<AddShoppingCartIcon color="primary" fontSize="large" />
											Cart{' '}
										</>
									) : (
										item.name
									)}
								</Button>
							</NavLink>
						))}
					</Box>
				</Toolbar>
			</AppBar>

			{/* Phone Menu Drawer ↓ */}
			<Box component="nav" >
				<Drawer
					container={container}
					className='phoneMenuDrawer'
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box >
	);
}

NavBar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default NavBar;
