import React from 'react';
import { useOrder } from '../context/OrderContext';
import { categories } from '../data/menuData';

export default function CategoryPanel() {
  const { currentCategory, setCategory } = useOrder();

  return (
    <div className="bg-gray-100 p-2 flex flex-col gap-2 overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">CATEGORIES</h2>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setCategory(category.id)}
          className={`
            px-4 py-3 min-h-[60px] text-white font-bold text-sm rounded-lg
            transition-all duration-200 transform active:scale-95
            ${currentCategory === category.id 
              ? `${category.color} ring-4 ring-blue-500 ring-opacity-50 shadow-lg` 
              : `${category.color} hover:brightness-110 shadow-md`
            }
            touch-manipulation
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}