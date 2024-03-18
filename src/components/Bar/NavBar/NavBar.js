import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { currentLocalBalance } from '../../../utils';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import './navBar.css';

const drawerWidth = 240;

function NavBar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const currentBalance = currentLocalBalance || 10000;

	const container = window !== undefined ? () => window().document.body : undefined;

	const handleDrawerToggle = useCallback(() => {
		setMobileOpen((prevState) => !prevState);
	}, []);

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
			page: '/All_Courses',
		},
		{
			name: 'About',
			isSelected: false,
			icon: <InfoIcon />,
			page: '/',
		},
		{
			name: 'Contact',
			isSelected: false,
			icon: <ContactSupportIcon />,
			page: '/contact',
		},
		{
			name: 'Cart',
			isSelected: false,
			icon: <ShoppingCartOutlinedIcon />,
			page: '/cart',
		},
	]);

	const handleSelectedMenu = useCallback(
		(index) => {
			handleDrawerToggle();
			const newSettingsDrawerMenu = settingsDrawerMenu.map(function (items, i) {
				return i === index ? { ...items, isSelected: true } : { ...items, isSelected: false };
			});

			setSettingsDrawerMenu(newSettingsDrawerMenu);
		},
		[settingsDrawerMenu, handleDrawerToggle]
	);

	const drawer = (
		<Box sx={{ textAlign: 'center' }}>
			<div className="underMenuBrandName">SharpLearn</div>
			<Divider />
			<List className="phoneMenuList">
				{settingsDrawerMenu.map((item, index) => (
					<NavLink to={item?.page} key={index}>
						<ListItemButton
							selected={item.isSelected}
							onClick={() => handleSelectedMenu(index)}
							sx={{ py: 1.7, pl: 4 }}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</NavLink>
				))}
				<div className="phoneMemuBalance">
					Balance <span>₹{currentBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
				</div>
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			{/* <CssBaseline /> */}
			<AppBar component="nav">
				<Toolbar className="navBar">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					<NavLink to="/" className="brandName">
						SharpLearn
					</NavLink>

					<Box className="otherMenus" sx={{ display: { xs: 'none', sm: 'flex' } }}>
						{settingsDrawerMenu.map((item, index) => (
							<NavLink to={item?.page} key={index} className="otherMenusBtn">
								<Button sx={{ color: '#fff' }}>{item.name}</Button>
							</NavLink>
						))}
					</Box>
					<form className="searchBar">
						<input type="text" placeholder="Search for courses" />
						<button type="submit">Search</button>
					</form>
					<NavLink to="/cart" className="phoneCartBtn">
						<Button sx={{ color: '#fff', display: { xs: 'flex', sm: 'none' } }}>
							<AddShoppingCartIcon color="primary" fontSize="medium" /> Cart
						</Button>
					</NavLink>
				</Toolbar>
			</AppBar>

			{/* Phone Menu Drawer ↓ */}
			<Box component="nav">
				<Drawer
					container={container}
					className="phoneMenuDrawer"
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
		</Box>
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
