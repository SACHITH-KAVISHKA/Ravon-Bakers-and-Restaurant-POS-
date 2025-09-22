import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { paymentMethods, restaurantConfig } from '../data/menuData';
import ReceiptPrinter from './ReceiptPrinter';

export default function PaymentModal() {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    paymentMethod,
    setPaymentMethod,
    setCashGiven,
    setDiscount,
    processPayment,
    clearOrder,
    subtotal,
    discount,
    total,
    cashGiven,
    balance,
    receiptData
  } = useOrder();

  const [cashAmount, setCashAmount] = useState('');
  const [cardAmount, setCardAmount] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  if (!isPaymentModalOpen) return null;

  const formatPrice = (price) => {
    return `${restaurantConfig.currency}${price.toFixed(2)}`;
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    // Reset amounts when payment method changes
    setCashAmount('');
    setCardAmount('');
  };

  const handleCashAmountChange = (value) => {
    setCashAmount(value);
    const numValue = parseFloat(value) || 0;
    setCashGiven(numValue);
  };

  const handleDiscountChange = (value) => {
    setDiscountAmount(value);
    const numValue = parseFloat(value) || 0;
    setDiscount(numValue);
  };

  const handleProcessPayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'cash' && cashGiven < total) {
      alert('Insufficient cash amount');
      return;
    }

    processPayment();
    setShowReceipt(true);
  };

  const handlePrintReceipt = () => {
    setShowReceipt(false);
    closePaymentModal();
    // Clear the order after printing receipt
    clearOrder();
    // Reset form
    setCashAmount('');
    setCardAmount('');
    setDiscountAmount('');
  };

  const numberButtons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', 'C']
  ];

  const handleNumberClick = (num, targetField) => {
    if (num === 'C') {
      if (targetField === 'cash') {
        setCashAmount('');
        setCashGiven(0);
      } else if (targetField === 'discount') {
        setDiscountAmount('');
        setDiscount(0);
      }
      return;
    }

    let currentValue = targetField === 'cash' ? cashAmount : discountAmount;
    let newValue = currentValue + num;

    if (targetField === 'cash') {
      setCashAmount(newValue);
      handleCashAmountChange(newValue);
    } else if (targetField === 'discount') {
      setDiscountAmount(newValue);
      handleDiscountChange(newValue);
    }
  };

  if (showReceipt && receiptData) {
    return (
      <ReceiptPrinter 
        receiptData={receiptData} 
        onClose={handlePrintReceipt}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">PAYMENT</h2>
          <button
            onClick={closePaymentModal}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Payment Methods and Details */}
          <div>
            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">SELECT PAYMENT TYPE</h3>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`
                      p-4 rounded-lg border-2 font-bold text-lg transition-all
                      ${paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400'
                      }
                    `}
                  >
                    {method.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Input Fields */}
            {paymentMethod && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">PAYMENT DETAILS</h3>
                
                {/* Discount */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Amount
                  </label>
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="0.00"
                  />
                </div>

                {/* Cash Amount (for Cash or Card+Cash) */}
                {(paymentMethod === 'cash' || paymentMethod === 'card-cash') && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cash Amount
                    </label>
                    <input
                      type="number"
                      value={cashAmount}
                      onChange={(e) => handleCashAmountChange(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                      placeholder="Enter cash amount"
                    />
                  </div>
                )}

                {/* Card Amount (for Card+Cash) */}
                {paymentMethod === 'card-cash' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Amount
                    </label>
                    <input
                      type="number"
                      value={cardAmount}
                      onChange={(e) => setCardAmount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                      placeholder="Enter card amount"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Calculator and Totals */}
          <div>
            {/* Number Pad */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">CALCULATOR</h3>
              <div className="grid grid-cols-3 gap-2">
                {numberButtons.flat().map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num, 'cash')}
                    className="
                      p-4 bg-gray-200 hover:bg-gray-300 rounded-lg
                      font-bold text-xl transition-colors
                    "
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">ORDER SUMMARY</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="font-bold text-red-600">-{formatPrice(discount)}</span>
                </div>
                
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-green-600">{formatPrice(total)}</span>
                </div>

                {paymentMethod === 'cash' && cashGiven > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>Cash Given:</span>
                      <span className="font-bold">{formatPrice(cashGiven)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Balance:</span>
                      <span className="font-bold text-blue-600">{formatPrice(balance)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Process Payment Button */}
            <button
              onClick={handleProcessPayment}
              disabled={!paymentMethod}
              className="
                w-full mt-6 bg-green-500 hover:bg-green-600 
                disabled:bg-gray-300 disabled:cursor-not-allowed
                text-white font-bold py-4 rounded-lg text-lg transition-colors
              "
            >
              PROCESS PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}