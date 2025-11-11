import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { FiShoppingCart } from "react-icons/fi";
import { MdBorderColor } from "react-icons/md";
import { MdInventory2 } from "react-icons/md"; // icon for stock
import axios from "axios";
import { toast } from "react-toastify";

const AllAmount = ({ admintoken }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { backend } = useContext(ShopContext);

 const fetchAllProduct = async () => {
  try {
    const res = await axios.get(backend + "/api/product");
    setProducts(res.data?.products || []);
  } catch (error) {
    toast.error("Failed to load products. Please try again.");
  }
};

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${backend}/api/order/list`,
        {},
        { headers: { admintoken } }
      );

      if (!response || !response.data) {
        throw new Error("No response from the server");
      }

      setOrders(response.data.data || []);
    } catch (error) {
      toast.error("Error fetching orders:", error);
    }
  };

  const TotalProducts = products.length;
  const TotalOrders = orders.length;

  const TotalStock = products.reduce((sum, p) => sum + (p.stock ), 0);

  useEffect(() => {
    fetchAllProduct();
    fetchOrders();
  }, [backend]);

  return (
    <div className="flex flex-wrap gap-4 mt-4 ">

      {/* TotalProducts */}
      <div className="flex items-center gap-4">
        <div
          className="w-52 gap-2 px-3 flex items-center justify-between py-3 rounded-xl"
          style={{
            background:
              "linear-gradient(20deg, rgba(0, 157, 189, 1) 0%, rgba(17, 144, 255, 1) 50%, rgba(237, 221, 83, 1) 100%)",
          }}
        >
          <div>
            <p className="text-lg text-white">Total Products</p>
            <div className="text-4xl text-white font-semibold ">
              {TotalProducts}
            </div>
          </div>
          <FiShoppingCart size={33} color="white" />
        </div>
      </div>

      {/* TotalOrders */}
      <div className="flex items-center gap-4">
        <div
          className="w-52 gap-2 px-3 flex items-center justify-between py-3 rounded-xl"
          style={{
            background:
              "linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)",
          }}
        >
          <div>
            <p className="text-lg text-white">Total Orders</p>
            <div className="text-4xl text-white font-semibold ">
              {TotalOrders}
            </div>
          </div>
          <MdBorderColor size={33} color="white" />
        </div>
      </div>

      {/* ✅ TotalStock */}
      <div className="flex items-center gap-4">
        <div
          className="w-52 gap-2 px-3 flex items-center justify-between py-3 rounded-xl"
          style={{
            background:
              "linear-gradient(45deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
          }}
        >
          <div>
            <p className="text-lg text-white">Total Stock</p>
            <div className="text-4xl text-white font-semibold ">
              {TotalStock}
            </div>
          </div>
          <MdInventory2 size={33} color="white" />
        </div>
      </div>
    </div>
  );
};

export default AllAmount;
