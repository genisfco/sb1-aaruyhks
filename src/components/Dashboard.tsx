import React from 'react';
import { useProperties } from '../context/PropertyContext';
import { Home, DollarSign, AlertTriangle, Calendar, Wallet } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { properties, totalReceived, pendingAmount, totalBenefitsReceived, totalIncome } = useProperties();

  // Calculate statistics
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.status !== 'vacant').length;
  const paidProperties = properties.filter(p => p.status === 'paid').length;
  const pendingProperties = properties.filter(p => p.status === 'pending').length;
  const lateProperties = properties.filter(p => p.status === 'late').length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Get current month and year in Portuguese
  const currentDate = new Date();
  const month = currentDate.toLocaleString('pt-BR', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 capitalize">
          Resumo de {month} {year}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-red'-600">Imóveis Ocupados</p>
                <p className="text-xl font-semibold">{occupiedProperties} de {totalProperties}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600">Total Recebido (Aluguéis)</p>
                <p className="text-xl font-semibold">{formatCurrency(totalReceived)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">Pendentes</p>
                <p className="text-xl font-semibold">{pendingProperties}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-600">Atrasados</p>
                <p className="text-xl font-semibold">{lateProperties}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Resumo Financeiro</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="font-medium">Total de Aluguéis</span>
            <span>{formatCurrency(properties.reduce((sum, p) => sum + p.rentAmount, 0))}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="font-medium">Total Recebido (Aluguéis)</span>
            <span className="text-green-600">{formatCurrency(totalReceived)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="font-medium">Total Recebido (Benefícios)</span>
            <span className="text-green-600">{formatCurrency(totalBenefitsReceived)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="font-medium">Total Pendente</span>
            <span className="text-yellow-600">{formatCurrency(pendingAmount)}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="font-medium">Taxa de Ocupação</span>
            <span>{Math.round((occupiedProperties / totalProperties) * 100)}%</span>
          </div>
          
          <div className="flex justify-between items-center pt-2 font-bold">
            <span>Receita Total</span>
            <span className="text-blue-600">{formatCurrency(totalIncome)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};