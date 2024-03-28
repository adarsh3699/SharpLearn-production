const currentLocalBalance = localStorage.getItem('current_balance');
if (!currentLocalBalance && currentLocalBalance !== 0) localStorage.setItem('current_balance', 10000);

function handleCurentBalance(cost, currentBalance, setCurrentBalance) {
	setCurrentBalance(localStorage.getItem('current_balance') - cost);
	localStorage.setItem('current_balance', localStorage.getItem('current_balance') - cost);
}

// function isUserLoggedIn() {
// 	const ka = !!JSON.parse(localStorage.getItem('user_details'));
// 	console.log(ka);
// }

// isUserLoggedIn();

export { currentLocalBalance, handleCurentBalance };
