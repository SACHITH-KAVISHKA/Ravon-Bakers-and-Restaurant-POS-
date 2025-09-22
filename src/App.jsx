import React from 'react';
import { OrderProvider } from './context/OrderContext';
import CategoryPanel from './components/CategoryPanel';
import ItemGrid from './components/ItemGrid';
import OrderList from './components/OrderList';
import PaymentModal from './components/PaymentModal';
import { restaurantConfig } from './data/menuData';
import './App.css';

function App() {
  return (
    <OrderProvider>
      <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
        {/* Header */}
        <header className="bg-green-600 text-white p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{restaurantConfig.name}</h1>
            <div className="text-sm">
              <span className="mr-4">Branch: {restaurantConfig.branch}</span>
              <span>{new Date().toLocaleDateString('en-GB')} - {new Date().toLocaleTimeString('en-GB', { hour12: true })}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Side - Order List */}
          <div className="w-1/4 min-w-[300px] border-r border-gray-300">
            <OrderList />
          </div>

          {/* Middle - Item Grid */}
          <div className="flex-1">
            <ItemGrid />
          </div>

          {/* Right Side - Category Panel */}
          <div className="w-1/5 min-w-[200px] border-l border-gray-300">
            <CategoryPanel />
          </div>
        </main>

        {/* Payment Modal */}
        <PaymentModal />
      </div>
    </OrderProvider>
  );
}

export default App;
