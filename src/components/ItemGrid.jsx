import React from 'react';
import { useOrder } from '../context/OrderContext';
import { menuItems, restaurantConfig } from '../data/menuData';

export default function ItemGrid() {
  const { currentCategory, addItem } = useOrder();

  // Filter items by current category
  const filteredItems = menuItems.filter(item => item.category === currentCategory);

  const handleAddItem = (item) => {
    addItem(item);
  };

  const formatPrice = (price) => {
    return price > 0 ? `${restaurantConfig.currency}${price.toFixed(2)}` : 'Price TBD';
  };

  return (
    <div className="bg-white p-4 overflow-y-auto">
      <div className="grid grid-cols-3 gap-3 auto-rows-fr">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleAddItem(item)}
            className="
              bg-blue-500 hover:bg-blue-600 text-white font-bold
              p-4 rounded-lg shadow-md transition-all duration-200
              transform active:scale-95 min-h-[100px]
              flex flex-col justify-center items-center
              touch-manipulation text-center
            "
          >
            <div className="text-sm mb-2 leading-tight">
              {item.name}
            </div>
            <div className="text-lg font-bold">
              {formatPrice(item.price)}
            </div>
          </button>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="col-span-3 text-center text-gray-500 py-12">
            <p className="text-xl">No items available in this category</p>
            <p className="text-sm mt-2">Please select a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}