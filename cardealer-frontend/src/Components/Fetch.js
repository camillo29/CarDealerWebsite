export const handleCancelReservation = (carId, refetch, setRefetch, cookie) => {
	const url = 'http://localhost:8000/api/addReservationToCar'
	let payload = {
		carId: carId,
		personId: null,
	}
	let options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'x-access-token': cookie.userToken.token,
		}, body: JSON.stringify(payload)
	}

	fetch(url, options)
		.then(response => response.json())
		.then(result => {
			console.log(result) //DEBUG
			setRefetch(!refetch);
			return;
		});
}

export const fetchPerson = (cookie, setPerson) => {
	if (cookie.userId && cookie.userToken) {
		const url = 'http://localhost:8000/api/getPersonByUserId/' + cookie.userId.userId;
		let options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'x-access-token': cookie.userToken.token,
			}
		}
		fetch(url, options)
			.then(response => response.json())
			.then(result => {
				setPerson(result);
			});
	}
}