// src/pages/AdminOrders.jsx
import React, { useState } from 'react';
import { MdOutlineViewInAr } from "react-icons/md";

export const AdminOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy data for UI preview
  const orders = [
    {
      _id: "1",
      address: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "123456789",
        country: "USA",
        city: "New York",
        street: "123 Main St",
        zipCode: "10001",
      },
      amount: 2500,
      status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
      date: new Date(),
      items: [
        { name: "Sneaker X", quantity: 1, size: "42", price: 1500 },
        { name: "T-shirt Y", quantity: 2, size: "M", price: 1000 },
      ],
    },
  ];

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-center">Customer</th>
              <th className="py-3 px-4 text-center">Total Price</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-3 px-4 text-center font-medium">
                  {`${order.address.firstName} ${order.address.lastName}`}
                </td>
                <td className="py-3 px-4 text-center">৳ {order.amount}</td>
                <td className="py-3 px-4 text-center">
                  <select
                    value={order.status}
                    className="bg-gray-800 text-white rounded-md px-5 py-1 text-sm"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="text-center flex justify-center items-center w-full"
                    onClick={() => handleViewClick(order)}
                  >
                    <MdOutlineViewInAr className="text-gray-800 text-center text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Order Details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 max-w-[85vw] md:max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="overflow-y-scroll h-36 bg-gray-200 px-2 py-1 rounded-md scrollbar-custom">
              {selectedOrder.items.map((item, index) => (
                <div key={index}>
                  <p className="font-medium">
                    <span className="font-bold text-black">Product Name: </span>
                    {item.name}
                  </p>
                  <span className="text-gray-500">
                    Qty: {item.quantity} | Size: {item.size} | Price: ৳{item.price}
                  </span>
                </div>
              ))}
            </div>
            <p><strong>Customer Name:</strong> {`${selectedOrder.address.firstName} ${selectedOrder.address.lastName}`}</p>
            <p><strong>Items:</strong> {selectedOrder.items.length}</p>
            <p><strong>Total Price:</strong> ৳{selectedOrder.amount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Payment:</strong> {selectedOrder.payment ? "Done" : "Not Done"}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
            <p><strong>Address:</strong></p>
            <div className="px-2 py-1 rounded-t-md">
              <p>Email: {selectedOrder.address.email}</p>
              <p>Phone: {selectedOrder.address.phone}</p>
              <p>Country: {selectedOrder.address.country}</p>
              <p>City: {selectedOrder.address.city}</p>
              <p>Street: {selectedOrder.address.street}</p>
              <p>ZipCode: {selectedOrder.address.zipCode}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
