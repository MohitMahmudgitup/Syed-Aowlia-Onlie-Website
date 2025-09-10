import React from 'react'
import CartItem from '../AdminComponents/CartItem.jsx'
import { Route, Routes } from 'react-router-dom'
import AllAmount from '../AdminComponents/AllAmount.jsx'

export const AdminAdd = ({admintoken}) => {
  return (
    <>
    <div className='flex sm:flex-row  items-center justify-between'>
      <h1 className='text-2xl mb-2'>Dashboard</h1>
      <CartItem/>
    </div>
      <AllAmount admintoken={admintoken}/>
    </>
  )
}
