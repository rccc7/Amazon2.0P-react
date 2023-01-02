import React from 'react'
import moment from 'moment/moment'
import { NumericFormat } from 'react-number-format'
// import './Order.css'

function Order({ id, amount, amountShipping, items, timestamp }) {
    return (
        // This dive is gonna be relative becase there is going to be some components over other ones
        <div className='relative border rounded-md'>
            <div className='flex items-center space-x-10 p-5 
            bg-gray-100 text-sm text-gray-600'>
                <div >
                    <p className='font-bold text-xs'>ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MM YYYY')}</p>
                </div>
                <div >
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p >
                        <NumericFormat value={amount} prefix='$' className='w-16 bg-gray-100' readOnly={true} />
                        Delivery{' '}
                        <NumericFormat value={amountShipping} prefix='$' className='w-16 bg-gray-100' readOnly={true} />
                    </p>
                </div>
                <p className='text-sm whitespace-nowrap sm:text-xl 
                self-end flex-1 text-right text-blue-500'>
                    {items.length} items
                </p>
                {/* Truncate the text */}
                <p className='absolute top-2 right-2 w-40 lg:w-72 
                truncate text-sm whitespace-nowrap'>
                    ORDER # {id}
                </p>
            </div>
            <div className='p-5 sm:p-10 '>
                <div className='flex gap-6 overflow-x-auto no-scrollbar'>
                    {items.map((item) => (
                        <img src={item.image} alt="" className='h-20 object-contain' />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order