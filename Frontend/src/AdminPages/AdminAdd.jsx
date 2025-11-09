import React from 'react'
import CartItem from '../AdminComponents/CartItem.jsx'
import AllAmount from '../AdminComponents/AllAmount.jsx'

export const AdminAdd = ({ admintoken }) => {
  return (
    <div className="w-full px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="w-full sm:w-auto">
          <CartItem />
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        <AllAmount admintoken={admintoken} />
      </div>
    </div>
  )
}
