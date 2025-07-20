const currentLocalBalance = localStorage.getItem('current_balance');
const apiBaseUrl = 'http://localhost:4000/';

if (!currentLocalBalance && currentLocalBalance !== 0) localStorage.setItem('current_balance', 10000);

function handleCurentBalance(cost, currentBalance, setCurrentBalance) {
	setCurrentBalance(localStorage.getItem('current_balance') - cost);
	localStorage.setItem('current_balance', localStorage.getItem('current_balance') - cost);
}

async function apiCall(endpoint, method, body, headers = {}) {
	const apiUrl = apiBaseUrl + endpoint;
	try {
		let apiCallResp;

		if (method === 'GET' || method === undefined) {
			apiCallResp = await fetch(apiUrl, {
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
			});
		} else {
			apiCallResp = await fetch(apiUrl, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
				body: body ? JSON.stringify(body) : undefined,
			});
		}

		const apiJsonResp = await apiCallResp.json();
		return apiJsonResp;
	} catch (error) {
		console.log(error);
		return { msg: 'Something went wrong', statusCode: 500 };
	}
}

export { currentLocalBalance, handleCurentBalance, apiCall };
