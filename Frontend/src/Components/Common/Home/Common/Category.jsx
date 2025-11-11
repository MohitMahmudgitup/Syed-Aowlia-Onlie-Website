import React from 'react'

import CategoryItem from '../../../CategoryItem.jsx';
import Titel from '../../../Titel.jsx';

const Category = () => {
  return (
      <div className=''>
        <div className="sm:block hidden text-3xl pl-2">
          <Titel text2={"CATEGORIES"}/>
        </div>
        <CategoryItem/>
    </div>
  )
}

export default Category
