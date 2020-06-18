const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/customer-cli', { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log(`connected to DB`);
}).catch((e) => {
    console.log('error connecting')
});

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String
    }
})

const CustomerModel = mongoose.model('customer', customerSchema);

const addCustomer = async (customer) => {
    try {
        const chkDup = await CustomerModel.findOne({ $and: [{ firstname: customer.firstname }, { lastname: customer.lastname }] });
        if (chkDup) {
            throw 'User name exist!!'
        }
        const cust = new CustomerModel(customer);
        await cust.save();
        return cust;
    } catch (error) {
        throw { error }
    }
}

const findCustomer = async (name) => {
    try {
        const search = new RegExp(name, 'i')
        const cust = await CustomerModel.find({ $or: [{ firstname: search }, { lastname: search }] });
        if (cust.length < 1) {
            throw 'No Customer Found!!'
        }
        return cust;
    } catch (error) {
        throw { error }
    }
}

const deleteCustomer = async (_id) => {
    try {
        const cust = await CustomerModel.findByIdAndRemove(_id);
        if (!cust) {
            throw 'No Customer found!!';
        }
        return cust;
    } catch (errro) {
        throw { error }
    }
}

module.exports = {
    addCustomer,
    findCustomer,
    deleteCustomer
};