
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