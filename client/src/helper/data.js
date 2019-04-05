
export function formatPrice(price, callback) {
	return  "\u20B9"+price
}
export function getConfigValue(section_id,field_name) {
	var data = {section_id: "general" , field_name : field_name}
	fetch('/admin/config/fetch/', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
          }
      })
     .then( rs => rs.json())
     .then(result =>{ 
       return result;
      })
}

export async function customerHtml(callback) {
 var options = []
fetch('/api/customers/active').then(res => res.json()).then(customers =>{
  customers.map(customer =>{
    let customer_tmp_option = {}
     customer_tmp_option.label  = customer.full_name
     customer_tmp_option.value  = customer.id
     options.push(customer_tmp_option)
  })
})
callback(options)
}