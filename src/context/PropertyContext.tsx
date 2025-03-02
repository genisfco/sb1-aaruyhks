import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property, BenefitPayment } from '../types';
import { initialProperties, initialBenefits } from '../data/initialData';

interface PropertyContextType {
  properties: Property[];
  benefits: BenefitPayment[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  registerPayment: (id: string, paymentDate: string, amount: number) => void;
  registerBenefitPayment: (id: string, paymentDate: string, amount: number) => void;
  updateBenefit: (id: string, benefit: Partial<BenefitPayment>) => void;
  totalReceived: number;
  pendingAmount: number;
  totalBenefitsReceived: number;
  totalIncome: number;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [benefits, setBenefits] = useState<BenefitPayment[]>(initialBenefits);

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
    };
    setProperties([...properties, newProperty]);
  };

  const updateProperty = (id: string, updatedProperty: Partial<Property>) => {
    setProperties(
      properties.map((property) =>
        property.id === id ? { ...property, ...updatedProperty } : property
      )
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  const registerPayment = (id: string, paymentDate: string, amount: number) => {
    setProperties(
      properties.map((property) =>
        property.id === id
          ? {
              ...property,
              paymentDate,
              paymentAmount: amount,
              status: 'paid',
            }
          : property
      )
    );
  };

  const registerBenefitPayment = (id: string, paymentDate: string, amount: number) => {
    setBenefits(
      benefits.map((benefit) =>
        benefit.id === id
          ? {
              ...benefit,
              paymentDate,
              paymentAmount: amount,
              status: 'paid',
            }
          : benefit
      )
    );
  };

  const updateBenefit = (id: string, updatedBenefit: Partial<BenefitPayment>) => {
    setBenefits(
      benefits.map((benefit) =>
        benefit.id === id ? { ...benefit, ...updatedBenefit } : benefit
      )
    );
  };

  // Calculate total received from properties
  const totalReceived = properties.reduce(
    (sum, property) => sum + (property.paymentAmount || 0),
    0
  );

  // Calculate total received from benefits
  const totalBenefitsReceived = benefits.reduce(
    (sum, benefit) => sum + (benefit.paymentAmount || 0),
    0
  );

  // Calculate total income (properties + benefits)
  const totalIncome = totalReceived + totalBenefitsReceived;

  // Calculate pending amount
  const pendingAmount = properties.reduce(
    (sum, property) => 
      property.status === 'pending' || property.status === 'late' 
        ? sum + property.rentAmount 
        : sum,
    0
  );

  return (
    <PropertyContext.Provider
      value={{
        properties,
        benefits,
        addProperty,
        updateProperty,
        deleteProperty,
        registerPayment,
        registerBenefitPayment,
        updateBenefit,
        totalReceived,
        pendingAmount,
        totalBenefitsReceived,
        totalIncome,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};