const { program } = require('commander');
const { prompt } = require('inquirer');
const { addCustomer, findCustomer } = require('./model/customerModel');

program.version('1.0.0').description('Client')

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer First name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer Last name'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone no:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer Email'
    }
]

// program.command('add <firstname> <lastname>')
//     .alias('a')
//     .description('Add a customer')
//     .action((firstname, lastname) => {
//         addCustomer({ firstname, lastname }).then(cust => {
//             console.info(`User "${cust.firstname}" added`);
//         }).catch(error => {
//             console.log(error)
//         })

//     });

program.command('add')
    .alias('a')
    .description('Add a Customer')
    .action(() => {
        prompt(questions).then(answers => {
            addCustomer(answers).then(cust => {
                console.info(`User "${cust.firstname}" added`);
            }).catch(error => {
                console.log(error)
            })
        })
    })

program.command('find <name>')
    .alias('f')
    .description('Find user')
    .action((name) => {
        findCustomer(name).then(cust => {
            console.log(`${cust.length}`)
        }).catch(error => {
            console.log(error)
        })
    })

program.parse(process.argv);