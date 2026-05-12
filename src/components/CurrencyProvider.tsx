"use client";

import React, { createContext, useContext, useState } from 'react';

type Currency = 'IDR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatMoney: (valueInIDR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('IDR');
  
  // Asumsi kurs: 1 USD = Rp 15.000
  const EXCHANGE_RATE = 15000; 

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'IDR' ? 'USD' : 'IDR'));
  };

  const formatMoney = (valueInIDR: number) => {
    if (currency === 'IDR') {
      return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        maximumFractionDigits: 0 
      }).format(valueInIDR);
    } else {
      const valueInUSD = valueInIDR / EXCHANGE_RATE;
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      }).format(valueInUSD);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatMoney }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};