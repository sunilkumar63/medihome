export function sendMedicineEmail(order) {
	console.log(order)
}

export async function notifyCustomer(data, callback) {
	await fetch('/api/email', {
	method: 'POST',
	body: JSON.stringify(data),
	headers: {
		'Content-Type': 'application/json'
	  }
	  })	
	 .then( result => result.json())
	 .then( result =>callback(result))
}