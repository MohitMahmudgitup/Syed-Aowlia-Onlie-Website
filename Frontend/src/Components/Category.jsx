import React from 'react'

import CategoryItem from './CategoryItem.jsx';
import Titel from './Titel.jsx';

const Category = () => {
  return (
      <div className='px-2 pb-2'>
        <div className="text-3xl pl-2">
          <Titel text2={"CATEGORIES"}/>
        </div>
        <CategoryItem/>
    </div>
  )
}

export default Category
