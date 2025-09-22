import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  orderItems: [],
  currentCategory: 'savoury',
  isPaymentModalOpen: false,
  paymentMethod: null,
  subtotal: 0,
  discount: 0,
  total: 0,
  cashGiven: 0,
  balance: 0,
  orderNumber: null,
  receiptData: null
};

// Action types
export const ORDER_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_ORDER: 'CLEAR_ORDER',
  SET_CATEGORY: 'SET_CATEGORY',
  OPEN_PAYMENT_MODAL: 'OPEN_PAYMENT_MODAL',
  CLOSE_PAYMENT_MODAL: 'CLOSE_PAYMENT_MODAL',
  SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
  SET_CASH_GIVEN: 'SET_CASH_GIVEN',
  SET_DISCOUNT: 'SET_DISCOUNT',
  CALCULATE_TOTALS: 'CALCULATE_TOTALS',
  PROCESS_PAYMENT: 'PROCESS_PAYMENT'
};

// Reducer function
function orderReducer(state, action) {
  switch (action.type) {
    case ORDER_ACTIONS.ADD_ITEM: {
      const existingItem = state.orderItems.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          orderItems: state.orderItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          orderItems: [...state.orderItems, { ...action.payload, quantity: 1 }]
        };
      }
    }

    case ORDER_ACTIONS.UPDATE_QUANTITY: {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          orderItems: state.orderItems.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        orderItems: state.orderItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    }

    case ORDER_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        orderItems: state.orderItems.filter(item => item.id !== action.payload.id)
      };
    }

    case ORDER_ACTIONS.CLEAR_ORDER: {
      return {
        ...state,
        orderItems: [],
        subtotal: 0,
        total: 0,
        discount: 0,
        cashGiven: 0,
        balance: 0,
        paymentMethod: null,
        isPaymentModalOpen: false
      };
    }

    case ORDER_ACTIONS.SET_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload
      };
    }

    case ORDER_ACTIONS.OPEN_PAYMENT_MODAL: {
      const subtotal = state.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return {
        ...state,
        isPaymentModalOpen: true,
        subtotal,
        total: subtotal - state.discount
      };
    }

    case ORDER_ACTIONS.CLOSE_PAYMENT_MODAL: {
      return {
        ...state,
        isPaymentModalOpen: false
      };
    }

    case ORDER_ACTIONS.SET_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload
      };
    }

    case ORDER_ACTIONS.SET_CASH_GIVEN: {
      const balance = action.payload - state.total;
      return {
        ...state,
        cashGiven: action.payload,
        balance: balance >= 0 ? balance : 0
      };
    }

    case ORDER_ACTIONS.SET_DISCOUNT: {
      const newTotal = state.subtotal - action.payload;
      return {
        ...state,
        discount: action.payload,
        total: newTotal >= 0 ? newTotal : 0
      };
    }

    case ORDER_ACTIONS.CALCULATE_TOTALS: {
      const subtotal = state.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total = subtotal - state.discount;
      return {
        ...state,
        subtotal,
        total: total >= 0 ? total : 0
      };
    }

    case ORDER_ACTIONS.PROCESS_PAYMENT: {
      const orderNumber = Math.floor(Math.random() * 1000) + 100;
      const receiptData = {
        orderNumber,
        items: state.orderItems,
        subtotal: state.subtotal,
        discount: state.discount,
        total: state.total,
        paymentMethod: state.paymentMethod,
        cashGiven: state.cashGiven,
        balance: state.balance,
        timestamp: new Date()
      };

      return {
        ...state,
        orderNumber,
        receiptData,
        isPaymentModalOpen: false
      };
    }

    default:
      return state;
  }
}

// Create context
const OrderContext = createContext();

// Context provider component
export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Action creators
  const addItem = (item) => {
    dispatch({ type: ORDER_ACTIONS.ADD_ITEM, payload: item });
    setTimeout(() => dispatch({ type: ORDER_ACTIONS.CALCULATE_TOTALS }), 0);
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: ORDER_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
    setTimeout(() => dispatch({ type: ORDER_ACTIONS.CALCULATE_TOTALS }), 0);
  };

  const removeItem = (id) => {
    dispatch({ type: ORDER_ACTIONS.REMOVE_ITEM, payload: { id } });
    setTimeout(() => dispatch({ type: ORDER_ACTIONS.CALCULATE_TOTALS }), 0);
  };

  const clearOrder = () => {
    dispatch({ type: ORDER_ACTIONS.CLEAR_ORDER });
  };

  const setCategory = (category) => {
    dispatch({ type: ORDER_ACTIONS.SET_CATEGORY, payload: category });
  };

  const openPaymentModal = () => {
    dispatch({ type: ORDER_ACTIONS.OPEN_PAYMENT_MODAL });
  };

  const closePaymentModal = () => {
    dispatch({ type: ORDER_ACTIONS.CLOSE_PAYMENT_MODAL });
  };

  const setPaymentMethod = (method) => {
    dispatch({ type: ORDER_ACTIONS.SET_PAYMENT_METHOD, payload: method });
  };

  const setCashGiven = (amount) => {
    dispatch({ type: ORDER_ACTIONS.SET_CASH_GIVEN, payload: amount });
  };

  const setDiscount = (amount) => {
    dispatch({ type: ORDER_ACTIONS.SET_DISCOUNT, payload: amount });
    setTimeout(() => dispatch({ type: ORDER_ACTIONS.CALCULATE_TOTALS }), 0);
  };

  const processPayment = () => {
    dispatch({ type: ORDER_ACTIONS.PROCESS_PAYMENT });
  };

  const value = {
    ...state,
    addItem,
    updateQuantity,
    removeItem,
    clearOrder,
    setCategory,
    openPaymentModal,
    closePaymentModal,
    setPaymentMethod,
    setCashGiven,
    setDiscount,
    processPayment
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

// Custom hook to use the order context
export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}