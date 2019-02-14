
module.exports.new_order = (order, customer) => {
	var content = "<div style='font-size:15px; text-transform: capitalize;background-color:#CCFFAB; padding:10px '><div style='margin-bottom:5px'>Hi Dear,</div>";

    content += "<div> removed below item ##</div>";
  return content;
}

module.exports.getOrderGeneralTemplate = (data) =>{
  let html = '';
  if(data)
  html += '<div>'
  html += `<h3>Dear Customer,</h3>`
        html += '<p style = "font-size:15px; "> Order ID :' + data.order.id+ '</div>'
        html += '<p style = "font-size:15px; text-transform: capitalize;">Thanks for your Order.</p>'
        html += '<p style = "font-size:15px; text-transform: capitalize;"> ' + data.message+ '</p>'
        html += '<p style = "font-size:15px; text-transform: capitalize;">Thanks</p>'
        html += '<p style = "font-size:15px; text-transform: capitalize;">MediHome - Direct to Home</p>'
        html += '</div>'
        return html;
}

module.exports.getOrderUpdateTemplate = (order,last_status_code) =>{
  var html = '';
  if(order)
  var status  = parseInt(last_status_code)
  html += '<div>'
        html += `<h3>Dear ${order.customer[0].first_name}</h3>`
        if(status === 0){
          html += '<p style = "font-size:14px;"> Your Medihome medicine order no ' + order.id+ ' has been  cancelled.</div>'
          html += '<p style = "font-size:14px">You will get back refund amount if paid already.</p>'
        }
        else if(status === 4){
          html += '<p style = "font-size:14px; "> Your Medihome medicine order  No ' + order.id+ ' has been put on hold.</div>'
        }
        else if(status === 3){
          html += '<p style = "font-size:14px;"> Your Medihome medicine order  No ' + order.id+ ' has been shipped via courier.</div>'
       }
       else {
        html += '<p style = "font-size:14px"> Your Medihome medicine order No ' + order.id+ ' has been updated</div>'
       }
        html += "<p style='color : red'>This is auto-generated email. Please do not reply</p>"
        html += '<div style = "font-size:15px; text-transform: capitalize;">Thanks</div>'
        html += '<div style = "font-size:15px; text-transform: capitalize;">MediHome - Direct to Home</div>'
        html += '</div>'
        return html;
} 