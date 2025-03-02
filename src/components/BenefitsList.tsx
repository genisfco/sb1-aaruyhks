import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { BenefitPayment } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle, Clock, Edit, DollarSign } from 'lucide-react';
import { BenefitPaymentModal } from './BenefitPaymentModal';
import { BenefitEditModal } from './BenefitEditModal';

export const BenefitsList: React.FC = () => {
  const { benefits } = useProperties();
  const [selectedBenefitId, setSelectedBenefitId] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleRegisterPayment = (id: string) => {
    setSelectedBenefitId(id);
    setIsPaymentModalOpen(true);
  };

  const handleEditBenefit = (id: string) => {
    setSelectedBenefitId(id);
    setIsEditModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedBenefitId(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBenefitId(null);
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDateDisplay = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  const statusColors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  const statusIcons = {
    paid: <CheckCircle className="w-5 h-5" />,
    pending: <Clock className="w-5 h-5" />,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Benefícios</h2>
        
        {benefits.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum benefício cadastrado.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{benefit.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      statusColors[benefit.status]
                    }`}
                  >
                    {statusIcons[benefit.status]}
                    {benefit.status === 'paid' ? 'Recebido' : 'Pendente'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Valor Mensal:</span> {formatCurrency(benefit.amount)}
                    </p>
                    {benefit.paymentDate && (
                      <p className="text-sm">
                        <span className="font-medium">Data de Recebimento:</span> {formatDateDisplay(benefit.paymentDate)}
                      </p>
                    )}
                  </div>
                  <div>
                    {benefit.paymentAmount && (
                      <p className="text-sm">
                        <span className="font-medium">Valor Recebido:</span> {formatCurrency(benefit.paymentAmount)}
                      </p>
                    )}
                    {benefit.notes && (
                      <p className="text-sm">
                        <span className="font-medium">Observações:</span> {benefit.notes}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditBenefit(benefit.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  
                  {benefit.status === 'pending' && (
                    <button
                      onClick={() => handleRegisterPayment(benefit.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <DollarSign className="w-4 h-4" />
                      Registrar Recebimento
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isPaymentModalOpen && selectedBenefitId && (
        <BenefitPaymentModal
          benefitId={selectedBenefitId}
          onClose={closePaymentModal}
        />
      )}
      
      {isEditModalOpen && selectedBenefitId && (
        <BenefitEditModal
          benefitId={selectedBenefitId}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};