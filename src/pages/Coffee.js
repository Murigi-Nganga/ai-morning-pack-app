//Coffee ordering page

import React from 'react'
import CoffeeCards from '../components/CoffeeCards/CoffeeCards'

export default function Coffee({ orderItems, name, address, notes }) {
    return (
        <div>
            <CoffeeCards
                orderItems={orderItems}
                name={name}
                address={address}
                notes={notes}
            />
        </div>
    )
}

