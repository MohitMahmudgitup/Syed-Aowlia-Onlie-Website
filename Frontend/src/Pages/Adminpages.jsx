import { Route, Routes } from 'react-router-dom'
import { AdminAdd } from '../AdminPages/AdminAdd.jsx'
import { AdminEditProduct } from '../AdminPages/AdminEditProduct.jsx'
import { AdminList } from '../AdminPages/AdminList.jsx'
import  AdminOrders  from '../AdminPages/AdminOrders.jsx'
import Sidebar from '../AdminComponents/Sidebers.jsx'
import Gadget from '../AdminComponents/Gadget.jsx'
import { Garments } from '../AdminComponents/garments.jsx'
import Computer from '../AdminComponents/Computer.jsx'
import { useEffect } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar.jsx'
import Footer from "../Components/Footer.jsx"
import AdminCategory from '../AdminPages/AdminCategory.jsx'
import CreateNewProduct from '../AdminPages/CreateNewProduct.jsx'
import Editcat from '../AdminComponents/Editcat.jsx'

const Adminpages = ({ admintoken ,setAdmintoken}) => {


    return (
        <div className=" bg-gray-100 absolute left-0 top-0 z-50 w-full">
            {
                admintoken ? (
                    <>
                    <AdminNavbar setAdmintoken={setAdmintoken}/>
                    <div className="flex sm:flex-row flex-col sm:w-[80vw] m-auto">
                        <Sidebar />
                        <div className="flex-1 p-2 sm:p-6">
                            <Routes>
                                <Route index element={<AdminAdd admintoken={admintoken} />} />
                                <Route path="list" element={<AdminList admintoken={admintoken} />} />
                                <Route path="orders" element={<AdminOrders admintoken={admintoken} />} />
                                <Route path="/createproduct" element={<CreateNewProduct admintoken={admintoken} />} />
                                <Route path="68a366123ff9ff3fd861d31c" element={<Computer admintoken={admintoken} />} />
                                <Route path="68a3658d3ff9ff3fd861d318" element={<Garments admintoken={admintoken} />} />
                                <Route path="category" element={<AdminCategory admintoken={admintoken} />} />
                                <Route path="products/edit/:id" element={<AdminEditProduct admintoken={admintoken} />} />
                                <Route path="category/editcat" element={<Editcat admintoken={admintoken} />} />
                            </Routes>
                        </div>
                    </div>
                    
                    <Footer/>
                    
                    </>
                  
                ):(
                    <div className='w-[100vw] h-[100vh] flex justify-center items-center '>
                        <img src="https://static.thenounproject.com/png/4147389-200.png" alt="" />
                    </div>
                )
            }

        </div>
    )
}

export default Adminpages