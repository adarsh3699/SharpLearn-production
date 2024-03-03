const currentLocalBalance = localStorage.getItem('current_balance');
if (!currentLocalBalance && currentLocalBalance !== 0) localStorage.setItem('current_balance', 10000);

function handleCurentBalance(cost, currentBalance, setCurrentBalance) {
	setCurrentBalance(currentBalance - cost);
	localStorage.setItem('current_balance', currentBalance - cost);
}

export { currentLocalBalance, handleCurentBalance };
