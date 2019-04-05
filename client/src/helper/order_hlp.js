import { promised } from "q";

export async function updateOrderStatus(order_id,status ,callback) {
	await fetch('/api/order/updatestatus/'+order_id+"/"+status)
        .then(data => data.json())
        .then(res => callback(res))
        .catch(err => callback(err))
}
export async function shipOrder(order_data,callback) {
			await fetch('/api/order/'+order_data.order_id+'/ship', {
				method: 'POST',
				body: JSON.stringify(order_data),
				headers: {
				    'Content-Type': 'application/json'
				  }
			      })
			      .then(res => res.json())
			      .then(res =>{ callback(res) ;console.log(res) })
			      .catch(err => console.log(err))
}

export async function fetchOrderStatus(id,callback) {
	let status = [{ 0 : 'pending' , 1 : 'preparing' , 3: 'shipped' , 4 : 'hold', 5 : 'completed' , 0 : 'cancelled'}]
	callback(status[id])
}
export function  statusObject(callback)  {
	callback({ 1 : 'pending' , 2 : 'preparing' , 3: 'shipped' , 4 : 'hold',5 : 'unhold', 6 : 'completed' , 0 : 'cancelled' })
}