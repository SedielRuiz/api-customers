'use strict'
const User = use('App/Models/User');
const Customer = use('App/Models/Customer');

class CustomerController {

    async index ({response,request,auth}) {

		let data = await Customer.all();
	    return response.json(data);
    }

    async store ({response,request}) {

		const data = request.all();

		//VALIDACIONES
		if(data.firstName==null || data.firstName.trim()==''){
			return response.status(500).json({'error':'First Name is require'});
        }

        if(data.firstLastName==null || data.firstLastName.trim()==''){
			return response.status(500).json({'error':'First LastName is require'});
        }
        
        const customer = new Customer();
        customer.document = data.document;
        customer.first_name = data.firstName.trim();
        customer.second_name = data.secondName.trim();
        customer.first_last_name = data.firstLastName.trim();
        customer.second_last_name = data.secondLastName.trim();
        customer.email = data.email;
        customer.address = data.address;

		try {
			await customer.save()
		} catch (error) {
			return response.status(500).json(Extandar.error(error,this,'42'))
		}
	    return response.json(customer);
    }

    async update ({response,request,auth}) {

		const data = request.all();

		//VALIDACIONES
		if(data.firstName==null || data.firstName.trim()==''){
			return response.status(500).json({'error':'Es necesario el primer nombre'});
        }

        if(data.firstLastName==null || data.firstLastName.trim()==''){
			return response.status(500).json({'error':'Es necesario el primer apellido'});
        }
        
        const customer = await Customer.find(data.id);
        customer.document = data.document;
        customer.first_name = data.firstName.trim();
        customer.second_name = data.secondName.trim();
        customer.first_last_name = data.firstLastName.trim();
        customer.second_last_name = data.secondLastName.trim();
        customer.email = data.email;
        customer.address = data.address;

		try {
			await customer.save()
		} catch (error) {
			return response.status(500).json(Extandar.error(error,this,'42'))
		}
	    return response.json(customer);
    }
    
    async destroy ({request, response, auth}) {

    }

    async login ({request, response, auth}) {
		const { user } = request.all();
		
	    try {
	    	
	    	let customer = await User.query()
	    	.where('email', user.email).first()

	    	if(!customer){
	    		throw "No existe el usuario";
		    }

		    const logged = await auth.attempt(user.email, user.password, true);

		    return response.json(logged);
	    } catch (error) {
	    	return response.status(500).json(error);
		}
	}
}

module.exports = CustomerController
