import React, { useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { useProperties } from '../context/PropertyContext';
import { PaymentModal } from './PaymentModal';
import { PropertyEditModal } from './PropertyEditModal';
import { Search, Filter } from 'lucide-react';

export const PropertyList: React.FC = () => {
  const { properties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleRegisterPayment = (id: string) => {
    setSelectedPropertyId(id);
    setIsPaymentModalOpen(true);
  };

  const handleEditProperty = (id: string) => {
    setSelectedPropertyId(id);
    setIsEditModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPropertyId(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPropertyId(null);
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      property.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por imóvel ou inquilino..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="paid">Pagos</option>
            <option value="pending">Pendentes</option>
            <option value="late">Atrasados</option>
            <option value="vacant">Vagos</option>
          </select>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum imóvel encontrado com os filtros atuais.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onRegisterPayment={handleRegisterPayment}
              onEditProperty={handleEditProperty}
            />
          ))}
        </div>
      )}

      {isPaymentModalOpen && selectedPropertyId && (
        <PaymentModal
          propertyId={selectedPropertyId}
          onClose={closePaymentModal}
        />
      )}

      {isEditModalOpen && selectedPropertyId && (
        <PropertyEditModal
          propertyId={selectedPropertyId}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};