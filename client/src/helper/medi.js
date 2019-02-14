export function MyHelperFunc_1(data, callback) {
	let response = do_ajax(data);
	if( response.status == 1 ){
		callback(response); // pass the response
	}
}