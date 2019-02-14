 export  default class customer {
    static customer=() =>{
        var customer = localStorage.getItem("customer");
        return JSON.parse(customer)
    }
    
    static customer_id=() =>{
        var customer = localStorage.getItem("customer");
        return "dsdsds";//JSON.parse(customer)
    }

}