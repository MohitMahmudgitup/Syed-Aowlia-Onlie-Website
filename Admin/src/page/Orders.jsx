import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backend } from '../App'; // Adjust the import based on your project structure
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles
import { MdOutlineViewInAr } from "react-icons/md";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${backend}/api/order/list`, {}, {
        headers: { token },
      });
  
      if (!response || !response.data) {
        throw new Error('No response from the server');
      }
  
      setOrders(response.data.data || []); // Ensure orders is always an array
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.message || 'Failed to fetch orders.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const statusHandler = async (event, orderId) => {
    console.log("Order ID:", orderId);
    console.log("New Status:", event.target.value);
  
    try {
      const response = await axios.post(`${backend}/api/order/status`, 
        { orderId, status: event.target.value }, 
        { headers: { token } }
      );
  
      if (!response || !response.data) {
        throw new Error('No response from the server');
      }
  
      console.log("Response:", response.data);
  
      if (response.data.success) {
        await fetchOrders(); 
      } else {
        toast.error('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to update order status.');
    }
  };
  
  


  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to open the modal and set the selected order
  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center py-6 ">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                {/* <th className="py-3 px-4 text-center">Order ID</th> */}
                <th className="py-3 px-4 text-center">Customer</th>
                <th className="py-3 px-4 text-center">Total Price</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Skeleton rows */}
              {Array.from({ length: 4 }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-3"><Skeleton /></td>
                  <td className="py-3 px-3"><Skeleton /></td>
                  <td className="py-3 px-3"><Skeleton /></td>
                  <td className="py-3 px-3"><Skeleton /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-6 ">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              {/* <th className="py-3 px-4 text-center">Order ID</th> */}
              <th className="py-3 px-4 text-center">Customer</th>
              <th className="py-3 px-4 text-center">Total Price</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
  {orders.slice().reverse().map((order) => (
    <tr key={order._id} className="border-b">
      <td className="py-3 px-4 text-center font-medium">
        {`${order.address.firstName} ${order.address.lastName}`}
      </td>
      <td className="py-3 px-4 text-center">৳ {order.amount}</td>
      <td className="py-3 px-4 text-center">
        <select 
          onChange={(event) => statusHandler(event, order._id)} 
          value={order.status} 
          className='bg-gray-800 text-white rounded-md px-5 py-1 text-sm'
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
          <MdOutlineViewInAr className='text-gray-800 text-center text-2xl'/>
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* Modal for order details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 max-w-[85vw] md:max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            {selectedOrder && (
              <div>
                <div className="overflow-y-scroll h-36 bg-gray-200 px-2 py-1 rounded-md scrollbar-custom">
                {
                  selectedOrder.items.map((item,index)=>{
                    if(index === selectedOrder.items.length - 1){
                      return <div key={index}><p className='font-medium md:text-[1.2vw] '> <span className='font-bold md:text-[1.3] text-black'>Product Name: </span> {item.name} </p>   <span className='text-gray-500'>Qty: {item.quantity} Size: {item.size}  Price: ৳{item.price}</span></div>
                    }else{
                      return <div key={index}><p className='font-medium md:text-[1.2vw] '> <span className='font-bold md:text-[1.3] text-black'>Product Name: </span> {item.name}  </p>  <span className='text-gray-500'>Qty: {item.quantity} Size: {item.size}  Price: ৳{item.price}</span>,</div>

                    }

                  })
                  
                }
                </div>
               
                {/* <p><strong>Order ID:</strong> {selectedOrder._id}</p> */}
                <p><strong>Customer Name:</strong> {`${selectedOrder.address.firstName} ${selectedOrder.address.lastName}`}</p>
                <p><strong>Items:</strong> {selectedOrder.items.length}</p>
                <p><strong>Total Price:</strong> ৳{selectedOrder.amount}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
                <p><strong>Payment:</strong> {selectedOrder.payment ? "Done" :  "Not Done"}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
})}</p>

                <p><strong>Address:</strong></p>
                <div className=' px-2 py-1 rounded-t-md'>
                  <p className='font-medium'>Email : <span className='font-normal text-gray-600'>{selectedOrder.address.email}</span></p>
                  <p className='font-medium'>Phone : <span className='font-normal text-gray-600'>{selectedOrder.address.phone}</span></p>

                  <p className='font-medium'>Country : <span className='font-normal text-gray-600'>{selectedOrder.address.country}</span></p>

                  <p className='font-medium'>City : <span className='font-normal text-gray-600'>{selectedOrder.address.city}</span></p>

                  <p className='font-medium'>Street : <span className='font-normal text-gray-600'>{selectedOrder.address.street}</span></p>

                  <p className='font-medium'>ZipCode : <span className='font-normal text-gray-600'>{selectedOrder.address.zipCode}</span></p>

                </div>
                {/* Add more fields as necessary */}
              </div>
            )}
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
}

export default Orders;
