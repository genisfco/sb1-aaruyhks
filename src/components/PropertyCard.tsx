import React from 'react';
import { Property } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle, AlertCircle, Clock, Home, Edit } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onRegisterPayment: (id: string) => void;
  onEditProperty: (id: string) => void;
}

const statusColors = {
  paid: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  late: 'bg-red-100 text-red-800',
  vacant: 'bg-gray-100 text-gray-800',
};

const statusIcons = {
  paid: <CheckCircle className="w-5 h-5" />,
  pending: <Clock className="w-5 h-5" />,
  late: <AlertCircle className="w-5 h-5" />,
  vacant: <Home className="w-5 h-5" />,
};

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onRegisterPayment, onEditProperty }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{property.name}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              statusColors[property.status]
            }`}
          >
            {statusIcons[property.status]}
            {property.status === 'paid'
              ? 'Pago'
              : property.status === 'pending'
              ? 'Pendente'
              : property.status === 'late'
              ? 'Atrasado'
              : 'Vago'}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Inquilino:</span> {property.tenant}
          </p>
          <p>
            <span className="font-medium">Valor do Aluguel:</span> {formatCurrency(property.rentAmount)}
          </p>
          <p>
            <span className="font-medium">Dia de Vencimento:</span> {property.dueDay || '-'}
          </p>
          {property.paymentDate && (
            <>
              <p>
                <span className="font-medium">Data de Pagamento:</span> {formatDateDisplay(property.paymentDate)}
              </p>
              <p>
                <span className="font-medium">Valor Pago:</span> {formatCurrency(property.paymentAmount)}
              </p>
            </>
          )}
          {property.utilityMeterNumber && (
            <p>
              <span className="font-medium">Nº Instalação Luz:</span> {property.utilityMeterNumber}
            </p>
          )}
          {property.notes && (
            <p>
              <span className="font-medium">Observações:</span> {property.notes}
            </p>
          )}
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex gap-2">
        <button
          onClick={() => onEditProperty(property.id)}
          className="flex items-center justify-center gap-1 py-2 px-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Editar
        </button>
        
        {(property.status === 'pending' || property.status === 'late') && (
          <button
            onClick={() => onRegisterPayment(property.id)}
            className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Registrar Pagamento
          </button>
        )}
      </div>
    </div>
  );
};