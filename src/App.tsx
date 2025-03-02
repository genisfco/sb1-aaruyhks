import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PropertyList } from './components/PropertyList';
import { PropertyForm } from './components/PropertyForm';
import { BenefitsList } from './components/BenefitsList';
import { PropertyProvider } from './context/PropertyContext';
import { Building, LayoutDashboard, Plus, Wallet } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'benefits'>('dashboard');
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);

  return (
    <PropertyProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">Sistema de Controle de Aluguéis</h1>
              {activeTab === 'properties' && (
                <button
                  onClick={() => setIsAddPropertyModalOpen(true)}
                  className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Imóvel
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex border-b border-gray-200">
            <button
              className={`flex items-center gap-2 px-4 py-2 font-medium ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 font-medium ${
                activeTab === 'properties'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('properties')}
            >
              <Building className="w-5 h-5" />
              Imóveis
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 font-medium ${
                activeTab === 'benefits'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('benefits')}
            >
              <Wallet className="w-5 h-5" />
              Benefícios
            </button>
          </div>

          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'properties' && <PropertyList />}
          {activeTab === 'benefits' && <BenefitsList />}
        </div>

        {isAddPropertyModalOpen && (
          <PropertyForm onClose={() => setIsAddPropertyModalOpen(false)} />
        )}
      </div>
    </PropertyProvider>
  );
}

export default App;