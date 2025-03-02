import React from 'react';
import { useForm } from 'react-hook-form';
import { useProperties } from '../context/PropertyContext';
import { X } from 'lucide-react';
import { Property } from '../types';

interface PropertyEditFormData {
  name: string;
  tenant: string;
  rentAmount: number;
  dueDay: number;
  utilityMeterNumber?: string;
  notes?: string;
  status: 'paid' | 'pending' | 'late' | 'vacant';
}

interface PropertyEditModalProps {
  propertyId: string;
  onClose: () => void;
}

export const PropertyEditModal: React.FC<PropertyEditModalProps> = ({ propertyId, onClose }) => {
  const { properties, updateProperty } = useProperties();
  const property = properties.find((p) => p.id === propertyId);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<PropertyEditFormData>({
    defaultValues: {
      name: property?.name || '',
      tenant: property?.tenant || '',
      rentAmount: property?.rentAmount || 0,
      dueDay: property?.dueDay || 1,
      utilityMeterNumber: property?.utilityMeterNumber || '',
      notes: property?.notes || '',
      status: property?.status || 'pending',
    }
  });

  const watchTenant = watch('tenant');
  const isVacant = watchTenant.toUpperCase() === 'VAGA';

  if (!property) return null;

  const onSubmit = (data: PropertyEditFormData) => {
    // If tenant is "VAGA", set status to vacant
    if (data.tenant.toUpperCase() === 'VAGA') {
      data.status = 'vacant';
    }
    
    updateProperty(propertyId, data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Editar Imóvel</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Imóvel
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ex: CASA 01"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="tenant" className="block text-sm font-medium text-gray-700 mb-1">
              Inquilino
            </label>
            <input
              id="tenant"
              type="text"
              placeholder="Nome do inquilino ou VAGA"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('tenant', { required: 'Inquilino é obrigatório' })}
            />
            {errors.tenant && <p className="mt-1 text-sm text-red-600">{errors.tenant.message}</p>}
          </div>

          <div>
            <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Valor do Aluguel (R$)
            </label>
            <input
              id="rentAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('rentAmount', { 
                required: 'Valor é obrigatório',
                valueAsNumber: true,
                min: { value: 0, message: 'Valor deve ser positivo' }
              })}
            />
            {errors.rentAmount && <p className="mt-1 text-sm text-red-600">{errors.rentAmount.message}</p>}
          </div>

          <div>
            <label htmlFor="dueDay" className="block text-sm font-medium text-gray-700 mb-1">
              Dia de Vencimento
            </label>
            <input
              id="dueDay"
              type="number"
              min="1"
              max="31"
              placeholder="Dia do mês"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('dueDay', { 
                required: 'Dia de vencimento é obrigatório',
                valueAsNumber: true,
                min: { value: 1, message: 'Dia deve ser entre 1 e 31' },
                max: { value: 31, message: 'Dia deve ser entre 1 e 31' }
              })}
            />
            {errors.dueDay && <p className="mt-1 text-sm text-red-600">{errors.dueDay.message}</p>}
          </div>

          {!isVacant && (
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('status')}
                disabled={isVacant}
              >
                <option value="pending">Pendente</option>
                <option value="paid">Pago</option>
                <option value="late">Atrasado</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="utilityMeterNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Nº Instalação Luz (opcional)
            </label>
            <input
              id="utilityMeterNumber"
              type="text"
              placeholder="Número da instalação"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('utilityMeterNumber')}
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Observações (opcional)
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Informações adicionais"
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