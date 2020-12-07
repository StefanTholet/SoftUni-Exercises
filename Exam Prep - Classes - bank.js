class Bank {
    constructor(bankName) {
        this.bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {
        const {firstName, lastName, personalId} = customer;
        const checkIfCustomerExists = this.allCustomers.find(x => x.firstName == firstName && x.lastName == lastName || x.personalId == personalId);
        if (checkIfCustomerExists) {
            throw new Error(`${firstName} ${lastName} is already our customer!`);
        }
        this.allCustomers.push(customer);
        return customer;
    }

    depositMoney(personalId, amount) {
        const customer = this.checkById(personalId);
       
        customer.totalMoney = customer.totalMoney ? customer.totalMoney : 0;
        customer.totalMoney += amount;
        customer.transactions = customer.transactions ? customer.transactions : [];
        const transaction = `${customer.transactions.length + 1}. ${customer.firstName} ${customer.lastName} made deposit of ${amount}$!`;
        customer.transactions.push(transaction);
        return customer.totalMoney+'$';
    }

    withdrawMoney (personalId, amount) {
        const customer = this.checkById(personalId);
    
        if (customer.totalMoney < amount || !customer.hasOwnProperty('totalMoney')) {
            throw new Error(`${customer.firstName} ${customer.lastName} does not have enough money to withdraw that amount!`)
        }
        customer.totalMoney -= amount;
        const transaction = `${customer.transactions.length + 1}. ${customer.firstName} ${customer.lastName} withdrew ${amount}$!`;
        customer.transactions.push(transaction);
        return customer.totalMoney+'$';
    }

    customerInfo (personalId) {
        const customer = this.checkById(personalId);
        
        const result = [];
        result.push(`Bank name: ${this.bankName}`)
        result.push(`Customer name: ${customer.firstName} ${customer.lastName}`)
        result.push(`Customer ID: ${customer.personalId}`)
        result.push(`Total Money: ${customer.totalMoney}$`)
        result.push('Transactions:')
        result.push(customer.transactions.reverse().join('\n'));
        return result.join('\n');
    }

    checkById(personalId) {
        const customer = this.allCustomers.find(x => x.personalId == personalId);
        if (customer) {
            return customer;
         } else {
            throw new Error('We have no customer with this ID!');
         }
    }
}


let bank = new Bank("SoftUni Bank");

console.log(bank.newCustomer({firstName: "Svetlin", lastName: "Nakov", personalId: 6233267}));
console.log(bank.newCustomer({firstName: "Svetlin", lastName: "Nakov", personalId: 6233267}));
console.log(bank.newCustomer({firstName: "Mihaela", lastName: "Mileva", personalId: 4151596}));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596,555);

 console.log(bank.withdrawMoney(6233267, 125));

 console.log(bank.customerInfo(6233267));


// { firstName: "Svetlin", lastName: "Nakov", personalId: 6233267 } 
// { firstName: "Mihaela", lastName: "Mileva", personalId: 4151596 }
// 500$
// 375$
// Bank name: SoftUni Bank
// Customer name: Svetlin Nakov
// Customer ID: 6233267
// Total Money: 375$
// Transactions:
// 3. Svetlin Nakov withdrew 125$!
// 2. Svetlin Nakov made depostit of 250$!
// 1. Svetlin Nakov made depostit of 250$!
