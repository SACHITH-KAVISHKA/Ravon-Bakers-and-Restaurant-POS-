import React from 'react';
import { useOrder } from '../context/OrderContext';
import { restaurantConfig } from '../data/menuData';

export default function OrderList() {
  const { 
    orderItems, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    openPaymentModal,
    clearOrder 
  } = useOrder();

  const formatPrice = (price) => {
    return `${restaurantConfig.currency}${price.toFixed(2)}`;
  };

  const handleQuantityChange = (id, change) => {
    const item = orderItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity);
      } else {
        removeItem(id);
      }
    }
  };

  const handleDeleteItem = (id) => {
    removeItem(id);
  };

  return (
    <div className="bg-gray-50 p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">ORDER LIST</h2>
        {orderItems.length > 0 && (
          <button
            onClick={clearOrder}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Order Items */}
      <div className="flex-1 overflow-y-auto mb-4">
        {orderItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">No items selected</p>
            <p className="text-sm mt-2">Click on items to add them to your order</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-semibold text-gray-800 flex-1 leading-tight">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {formatPrice(item.price)} each
                    </div>
                    <div className="font-bold text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtotal and Actions */}
      {orderItems.length > 0 && (
        <div className="border-t pt-4">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Subtotal:</span>
              <span className="text-xl font-bold text-green-600">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>
          
          <button
            onClick={openPaymentModal}
            className="
              w-full bg-green-500 hover:bg-green-600 text-white 
              font-bold py-4 rounded-lg text-lg transition-colors
              transform active:scale-95 touch-manipulation
            "
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      )}
    </div>
  );
}