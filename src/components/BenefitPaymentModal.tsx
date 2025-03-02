import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { X } from 'lucide-react';

interface BenefitPaymentModalProps {
  benefitId: string;
  onClose: () => void;
}

export const BenefitPaymentModal: React.FC<BenefitPaymentModalProps> = ({ benefitId, onClose }) => {
  const { benefits, registerBenefitPayment } = useProperties();
  const benefit = benefits.find((b) => b.id === benefitId);

  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentAmount, setPaymentAmount] = useState(benefit?.amount.toString() || '0');

  if (!benefit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerBenefitPayment(benefitId, paymentDate, parseFloat(paymentAmount));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Registrar Recebimento de Benefício</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Benefício
            </label>
            <div className="py-2 px-3 bg-gray-100 rounded-md">
              {benefit.name}
            </div>
          </div>

          <div>
            <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-1">
              Data do Recebimento
            </label>
            <input
              type="date"
              id="paymentDate"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Valor Recebido (R$)
            </label>
            <input
              type="number"
              id="paymentAmount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              step="0.01"
              min="0"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirmar Recebimento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};