const currentLocalBalance = localStorage.getItem('current_balance');
if (!currentLocalBalance && currentLocalBalance !== 0) localStorage.setItem('current_balance', 10000);

function handleCurentBalance(cost, currentBalance, setCurrentBalance) {
	setCurrentBalance(localStorage.getItem('current_balance') - cost);
	localStorage.setItem('current_balance', localStorage.getItem('current_balance') - cost);
}

export { currentLocalBalance, handleCurentBalance };
