// {Name: Coffee}
// {Description: Gives responses to questions related to coffee ordering and cater for the ordering process.}
// TODO: Complete highlight of coffees and desserts

const coffees = ['Americano', 'Cappuccino', 'Latte']
const desserts = ['Brownie', 'Cheesecake', 'Blueberry Cake']
const coffeeChoices = coffees.join('|')
const dessertChoices = desserts.join('|')
const allChoices = []
allChoices.push(coffees)
allChoices.push(desserts)
allChoices.join('|')
let hasChosenCoffee = false
let hasChosenDessert = false

let orderItems = []  

intent('(What\'s|What do you have) on the menu',
       'What do you offer',
       'What can I order',
      reply('We have coffee and dessert on the menu'))

intent('What (kind_|type_|) (of|) $(G coffee_ | dessert_) do you have?', async (p)=> {
    if(p.G.value === 'coffee' || p.G.value === 'coffees') {
        orderItems = []
        p.play({command: 'addOrder', orderItems: orderItems})
        for(let i = 0; i < coffees.length; i++){
//             p.play({ command: 'highlightCoffee', coffee: coffees[i]});
            p.play(`${coffees[i]}`);
        }
        p.play('What coffee would you like today?')
        p.then(addCoffee)
    } else {
        orderItems = []
        p.play({command: 'addOrder', orderItems: orderItems})
        for(let i = 0; i < desserts.length; i++){
//             p.play({ command: 'highlightDessert', dessert: desserts[i]});
            p.play(`${desserts[i]}`);
        }
        p.play('What dessert would you like today?')
        p.then(addDessert)
    }
})

intent('Clear my order (items|)',
      'Clear the items in (my|the|) order (list|)',
       'Delete (my|the|) order', p => {
    orderItems = []
    p.play({command: 'addOrder', orderItems: orderItems})
    p.play('Clearing the items')
})


const addCoffee = context(() => {
    intent(`(yes|sure|yeah|) (I'd like) (a|to have a|) $(C ${coffeeChoices}) (please|)`, async (p) => {
        p.play(`(Okay|Alright|Sure), adding a ${p.C.value} to your order`)
//         p.play({ command: 'highlightCoffee', coffee: coffees[coffees.indexOf(p.C.value)], 
//                 selectedItems: selectedItems});
        orderItems.push(p.C.value)
        p.play({command: 'addOrder', orderItems: orderItems})
        hasChosenCoffee = true
        if(hasChosenDessert === false) {
            p.play('Would you like to have dessert with it?')
            p.then(addDessert)
        } else {
            p.play('(Would you like anything else|Is there anything else you would like)?')
            p.then(addExtra)
        }
    })
    
    intent('(no|nothing|none)', (p) => {
        p.play('(Okay|Alright|Sure), (wonderful|beautiful).')
        p.play('(Would you like anything else|Is there anything else you would like)?')
        p.then(addExtra)
    })
})

const addDessert = context(() => {
    intent(`(yes|sure|yeah|) (I'd like) (a|to have a|) $(C ${dessertChoices}) (please|)`, async (p) => {
//         p.play({ command: 'highlightDessert', dessert: desserts[desserts.indexOf(p.C.value)]});
        p.play(`(Okay|Alright|Sure), adding a ${p.C.value} to your order`)
        orderItems.push(p.C.value)
        p.play({command: 'addOrder', orderItems: orderItems})
        hasChosenDessert = true
        if(hasChosenCoffee === false) {
            p.play('Would you like to have coffee with it?')
            p.then(addCoffee)
        } else {
            p.play('(Would you like anything else|Is there anything else you would like)?')
            p.then(addExtra)
        }
    })
    
    intent('(no|nothing|none)', (p) => {
        p.play('(Okay|Alright|Sure), (wonderful|beautiful).')
        p.play('(Would you like anything else|Is there anything else you would like)?')
        p.then(addExtra)
    })
})

const addExtra = context(() => {
    
    intent(`(yes|sure|yeah|) (I'd like) (a|to have a|) $(C ${allChoices}) (please|)`, async (p) => {
        if(coffees.includes(p.C.value)) {
//            p.play({ command: 'highlightCoffee', coffee: coffees[coffees.indexOf(p.C.value)]}); 
            orderItems.push(p.C.value)
            p.play({command: 'addOrder', orderItems: orderItems})
           hasChosenCoffee = true
        } else if (desserts.includes(p.C.value)) {
//             p.play({ command: 'highlightDessert', dessert: desserts[desserts.indexOf(p.C.value)]});
            orderItems.push(p.C.value)
            p.play({command: 'addOrder', orderItems: orderItems})
            hasChosenDessert = true
        } else {
            
        }
        
        p.play(`(Okay|Alright|Sure), adding a ${p.C.value} to your order`)
        p.play('(Would you like anything else|Is there anything else you would like)?')
        p.then(addExtra)
    })
    
    intent('(no|nothing)', (p) => {
        p.play('(Okay|Alright|Sure), (wonderful|beautiful).')
        if(hasChosenCoffee === false && hasChosenDessert === false) {
          p.play('Thanks for passing by. Feel free to return incase you need to grab a coffee or dessert')
          return
        }
        p.play('Could you provide your name for the order?')
        p.then(addName)
    })
})

//Pass these data to the command that handles filling in all the forms.
let name
let address
let extraNotes

const addName = context(() => {
    intent('(Yes|Sure|Alright|Okay|) (it is|) $(name* (.*))', (p)=> {
        p.play({command: 'addName', name: p.name.value})
        p.play(`(Okay|Alright), thanks ${p.name.value}`)
        p.play('Can I have the address of delivering your order ?')
        p.then(addAddress)
    })
})

const addAddress = context(() => {
    intent('(Yes|Sure|Alright|Okay|) (it is|) $(address* (.*))', (p)=> {
        p.play({command: 'addAddress', address: p.address.value})
        p.play(`Your order will be delivered to ${p.address.value}`)
        p.play('Do you have any special note or request for your order ?')
        p.then(addNote)
    })
})

const addNote = context(() => {
    intent('(Yes|) $(note* (.*))', (p)=> {
        p.play({command: 'addNotes', notes: p.note.value})
        p.play(`(Okay|Alright), your (note|request) is ${p.note.value}`)
        p.play("We're getting your order ready.")
        p.play("Have a nice day!")
        p.resolve()
    })
    intent("(I don't have any|No|Nothing)", (p)=> {
        p.play('(Okay|Alright)')
        p.play("We're getting your order ready.")
        p.play("Have a nice day!")
        p.resolve()
    })
})