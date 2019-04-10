module.exports.getOrderStatusLabel  =(status_id,callback) => {
	let status = [ { 0 : 'cancelled', 1 : 'pending' , 2 : 'preparation' , 3: 'shipped' , 4 : 'holded', 5 : 'completed' }]
	callback(status[status_id])
}

exports.generateInvoice = (order) =>{ console.log(order)
return '<html><head><title>PDF Test</title></head><body><h1>Welcome</h1><p>This is a test to see if we can get <b>PDF generation</b> to work on the server side.</p><p>PDF files can be very tricky to do on the server so this will take a bit of <u>hit and trail</u> before we can be confident it works fine.</p></body></html>';
}