import { Route, Routes } from 'react-router-dom'
import { AdminAdd } from '../AdminItems/AdminAdd.jsx'
import { AdminEditProduct } from '../AdminItems/AdminEditProduct.jsx'
import { AdminList } from '../AdminItems/AdminList.jsx'
import { AdminOrders } from '../AdminItems/AdminOrders.jsx'
import Sidebar from '../Components/Sidebers.jsx'
import Gadget from '../AdminComponents/Gadget.jsx'
import { Garments } from '../AdminComponents/garments.jsx'
import Computer from '../AdminComponents/Computer.jsx'

const Adminpages = () => {
    return (
        <div className="min-h-screen bg-gray-100 absolute left-0 top-0 z-50 w-full">
            <div className="flex w-[80vw] m-auto">
                <Sidebar />
                <div className="flex-1 p-6">
                    <Routes>
                        <Route index element={<AdminAdd />} />          
                        <Route path="list" element={<AdminList />} />     
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path=":id" element={<Gadget />} />
                        <Route path="68a366123ff9ff3fd861d31c" element={<Computer />} />
                        <Route path="68a3658d3ff9ff3fd861d318" element={<Garments />} />
                        <Route path="products/edit/:id" element={<AdminEditProduct />} />
                    </Routes>

                </div>
            </div>
        </div>
    )
}

export default Adminpages