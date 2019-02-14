var nodemailer = require('nodemailer');
var email_template_helper = require('./email_templates')
const prefix = "MediHome :: "

module.exports.newOrder = (order,customer,callback) =>{
    let to = "nickdev093@gmail.com";
    let sub =prefix+"New Order Email";
    let html = email_template_helper.new_order();
	this._sendEmail(to,sub,html , function(rs){
		callback(rs)
	});
}
module.exports.orderEmail = (data,callback)  =>{
    let to = "nealcoder93@gmail.com";
	let sub =prefix+"Order Update Email";
	let html ='';
	if(data)
		html = email_template_helper.getOrderGeneralTemplate(data);
		this._sendEmail(to,sub,html , function(rs){
			callback(rs)
		});
}
module.exports.orderUpdateEmail = (data,status_code,callback)  =>{
	let to = data.customer[0].email_address
	let sub =prefix+"Order Update Email";
	let html ='';
	if(data)
		html = email_template_helper.getOrderUpdateTemplate(data,status_code);
		this._sendEmail(to,sub,html , function(rs){
			callback(rs)
		});
}
module.exports._sendEmail =  ($to,$sub,$html , cb) =>{
		var transporter = nodemailer.createTransport({
		 service: 'gmail',
		 secure : 'false',
		 auth: {
		        user: 'nickdev093@gmail.com',
		        pass: 'nitish95@'
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		const mailOptions = {
		  from: 'nickdev093@gmail.com', // sender address
		  to: $to,
		  subject: $sub,
		  html: $html
		};

		transporter.sendMail(mailOptions, function (err, info) {
		   if(err) {
				cb(false)
				 throw err;				 
			 }
		   else
		     console.log('email sent');
		 	cb(true)
		});
}
