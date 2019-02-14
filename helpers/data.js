module.exports.getOrderStatusLabel  =(status_id,callback) => {
	let status = [ { 0 : 'cancelled', 1 : 'pending' , 2 : 'preparation' , 3: 'shipped' , 4 : 'holded', 5 : 'completed' }]
	callback(status[status_id])
}