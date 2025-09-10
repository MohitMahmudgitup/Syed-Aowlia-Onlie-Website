import React, { useState } from 'react'
import Gadget from '../AdminComponents/Gadget'
import { Garments } from '../AdminComponents/T-shirt';
import Moblie from '../AdminComponents/Moblie';

const CreateNewProduct = ({admintoken}) => {
    const [inputType, setInputType] = useState("");
    const handleChange = (e) => {
        setInputType(e.target.value);
    };
    return (
        <div>
            {/* input type */}
            <select name="" id="id"
                value={inputType}
                onChange={handleChange}
                className='border px-5 py-2 outline-none  rounded-full'>
                <option value="">Select the Type</option>
                <option value="gadget">Gadget</option>
                <option value="shirt">T-shirt/shirt</option>
                <option value="mobile">Moblie</option>
                {/* <option value="garments">Computer</option> */}
            </select>

            <div className='mt-6'>
                {(() => {
                    switch (inputType) {
                        case "gadget":
                            return <Gadget admintoken={admintoken} />;
                        case "shirt":
                            return <Garments  admintoken={admintoken}/>;
                            case "mobile":
                            return <Moblie  admintoken={admintoken}/>;
                        default:
                            return null;
                    }
                })()}

            </div>
        </div>
    )
}

export default CreateNewProduct
