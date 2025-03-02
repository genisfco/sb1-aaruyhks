import React from 'react';
import { useForm } from 'react-hook-form';
import { useProperties } from '../context/PropertyContext';
import { X } from 'lucide-react';

interface BenefitFormData {
  name: string;
  amount: number;
  notes?: string;
}

interface BenefitEditModalProps {
  benefitId: string;
  onClose: () => void;
}

export const BenefitEditModal: React.FC<BenefitEditModalProps> = ({ benefitId, onClose }) => {
  const { benefits, updateBenefit } = useProperties();
  const benefit = benefits.find((b) => b.id === benefitId);

  const { register, handleSubmit, formState: { errors } } = useForm<BenefitFormData>({
    defaultValues: {
      name: benefit?.name || '',
      amount: benefit?.amount || 0,
      notes: benefit?.notes || '',
    }
  });

  if (!benefit) return null;

  const onSubmit = (data: BenefitFormData) => {
    updateBenefit(benefitId, data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Editar Benefício</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Benefício
            </label>
            <input
              id="name"
              type="text"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Valor Mensal (R$)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('amount', { 
                required: 'Valor é obrigatório',
                valueAsNumber: true,
                min: { value: 0, message: 'Valor deve ser positivo' }
              })}
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Observações (opcional)
            </label>
            <textarea
              id="notes"
              rows={3}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('notes')}
            ></textarea>
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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};