import React from 'react';
import { restaurantConfig } from '../data/menuData';
import { useOrder } from '../context/OrderContext';

export default function ReceiptPrinter({ receiptData, onClose }) {
  const { clearOrder } = useOrder();
  
  if (!receiptData) return null;

  const formatPrice = (price) => {
    return `${restaurantConfig.currency}${price.toFixed(2)}`;
  };

  const formatDateTime = (date) => {
    return {
      date: date.toLocaleDateString('en-GB'),
      time: date.toLocaleTimeString('en-GB', { 
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
  };

  const handlePrint = () => {
    window.print();
    // Clear order after printing
    clearOrder();
    onClose();
  };

  const handleClose = () => {
    // Clear order when closing without printing
    clearOrder();
    onClose();
  };

  const { date, time } = formatDateTime(receiptData.timestamp);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Receipt Content */}
        <div id="receipt-content" className="receipt-paper">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold mb-2">{restaurantConfig.name}</h1>
            <div className="text-sm text-gray-600">
              <p>BRANCH: {restaurantConfig.branch}</p>
              <p>TERMINAL: {restaurantConfig.terminal}</p>
            </div>
            <div className="border-b border-dashed border-gray-400 my-4"></div>
          </div>

          {/* Receipt Info */}
          <div className="text-sm mb-4">
            <div className="flex justify-between">
              <span>RECEIPT NO:</span>
              <span>{receiptData.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>DATE:</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between">
              <span>TIME:</span>
              <span>{time}</span>
            </div>
          </div>

          <div className="border-b border-dashed border-gray-400 my-4"></div>

          {/* Items */}
          <div className="mb-4">
            <div className="text-sm font-semibold mb-2">ITEMS:</div>
            {receiptData.items.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span className="flex-1 pr-2">{item.name}</span>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <span className="w-16 text-right">{formatPrice(item.price)}</span>
                  <span className="w-20 text-right font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-b border-dashed border-gray-400 my-4"></div>

          {/* Totals */}
          <div className="text-sm mb-4">
            <div className="flex justify-between">
              <span>SUB TOTAL:</span>
              <span>{formatPrice(receiptData.subtotal)}</span>
            </div>
            {receiptData.discount > 0 && (
              <div className="flex justify-between">
                <span>DISCOUNT:</span>
                <span>-{formatPrice(receiptData.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
              <span>TOTAL:</span>
              <span>{formatPrice(receiptData.total)}</span>
            </div>
          </div>

          <div className="border-b border-dashed border-gray-400 my-4"></div>

          {/* Payment Info */}
          <div className="text-sm mb-4">
            <div className="flex justify-between">
              <span>PAYMENT METHOD:</span>
              <span className="uppercase">{receiptData.paymentMethod.replace('-', ' & ')}</span>
            </div>
            {receiptData.paymentMethod === 'cash' && receiptData.cashGiven > 0 && (
              <>
                <div className="flex justify-between">
                  <span>CASH GIVEN:</span>
                  <span>{formatPrice(receiptData.cashGiven)}</span>
                </div>
                <div className="flex justify-between">
                  <span>BALANCE:</span>
                  <span>{formatPrice(receiptData.balance)}</span>
                </div>
              </>
            )}
          </div>

          <div className="border-b border-dashed border-gray-400 my-4"></div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-600">
            <p>Thank you for your business!</p>
            <p>Please come again</p>
            <div className="mt-4">
              <p>Copyright © 2023 IMS Computer Systems</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="
              flex-1 bg-green-500 hover:bg-green-600 text-white 
              font-bold py-3 rounded-lg transition-colors
            "
          >
            Print Receipt
          </button>
          <button
            onClick={handleClose}
            className="
              flex-1 bg-gray-500 hover:bg-gray-600 text-white 
              font-bold py-3 rounded-lg transition-colors
            "
          >
            Close
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.3;
          }
          .receipt-paper {
            max-width: 80mm;
            margin: 0 auto;
            padding: 5mm;
          }
        }
      `}</style>
    </div>
  );
}