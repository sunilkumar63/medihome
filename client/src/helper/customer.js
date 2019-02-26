export async function updateCustomer(data,callback) {
        await fetch('/api/customer/update', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then(res => callback(res))
        .catch(err => callback(err))
}