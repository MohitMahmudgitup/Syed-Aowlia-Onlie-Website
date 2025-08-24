import React from 'react'
import CartItem from '../AdminComponents/CartItem.jsx'
import { Route, Routes } from 'react-router-dom'

export const AdminAdd = () => {
  return (
    <div>
      <h1 className='text-2xl mb-2'>Dashboard</h1>
      <CartItem/>
    </div>
  )
}

