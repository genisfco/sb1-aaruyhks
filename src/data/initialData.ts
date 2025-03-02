import { Property, BenefitPayment } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Helper function to determine status
const getStatus = (tenant: string, paymentDate?: string): 'paid' | 'pending' | 'late' | 'vacant' => {
  if (tenant === 'VAGA') return 'vacant';
  if (!paymentDate) return 'pending';
  
  const today = new Date();
  const payment = paymentDate ? new Date(paymentDate) : null;
  
  if (payment && payment > today) return 'pending';
  return payment ? 'paid' : 'late';
};

// Format date to Brazilian format (DD/MM/YYYY)
const formatDate = (dateString?: string): string | undefined => {
  if (!dateString) return undefined;
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return undefined;
  
  const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  return format(date, 'yyyy-MM-dd');
};

export const initialProperties: Property[] = [
  {
    id: '1',
    name: 'CASA 01',
    tenant: 'Vanderlane',
    rentAmount: 750,
    dueDay: 14,
    status: getStatus('Vanderlane'),
    utilityMeterNumber: '88469298'
  },
  {
    id: '2',
    name: 'CASA 02',
    tenant: 'VAGA',
    rentAmount: 650,
    dueDay: 9,
    status: 'vacant',
    utilityMeterNumber: '47241454'
  },
  {
    id: '3',
    name: 'CASA 03',
    tenant: 'Leonardo',
    rentAmount: 1100,
    dueDay: 0, // Not specified in the image
    paymentDate: formatDate('19/08/2024'),
    paymentAmount: 1100,
    status: getStatus('Leonardo', '19/08/2024'),
    notes: 'DEPÓSITO 550,00'
  },
  {
    id: '4',
    name: 'CASA 05',
    tenant: 'Viviane',
    rentAmount: 1700,
    dueDay: 10,
    paymentDate: formatDate('10/10/2024'),
    paymentAmount: 1700,
    status: getStatus('Viviane', '10/10/2024'),
    utilityMeterNumber: '88469301'
  },
  {
    id: '5',
    name: 'CASA 06',
    tenant: 'Damião',
    rentAmount: 450,
    dueDay: 9,
    paymentDate: formatDate('10/02/2025'),
    paymentAmount: 450,
    status: getStatus('Damião', '10/02/2025'),
    utilityMeterNumber: '201164443'
  },
  {
    id: '6',
    name: 'CASA 07',
    tenant: 'Rafael',
    rentAmount: 700,
    dueDay: 20,
    status: getStatus('Rafael'),
    utilityMeterNumber: ''
  },
  {
    id: '7',
    name: 'CASA 08',
    tenant: 'Elisangela',
    rentAmount: 650,
    dueDay: 5,
    paymentDate: formatDate('08/02/2025'),
    paymentAmount: 650,
    status: getStatus('Elisangela', '08/02/2025'),
    utilityMeterNumber: ''
  },
  {
    id: '8',
    name: 'CASA 09',
    tenant: 'Weldon',
    rentAmount: 750,
    dueDay: 9,
    paymentDate: formatDate('06/02/2025'),
    paymentAmount: 750,
    status: getStatus('Weldon', '06/02/2025'),
    utilityMeterNumber: '47244631'
  },
  {
    id: '9',
    name: 'CASA 10',
    tenant: 'Wanderson',
    rentAmount: 650,
    dueDay: 10,
    status: getStatus('Wanderson'),
    utilityMeterNumber: '202854798'
  },
  {
    id: '10',
    name: 'GARAGEM 01',
    tenant: 'Jose',
    rentAmount: 100,
    dueDay: 5,
    paymentDate: formatDate('07/02/2025'),
    paymentAmount: 100,
    status: getStatus('Jose', '07/02/2025'),
    utilityMeterNumber: ''
  },
  {
    id: '11',
    name: 'GARAGEM 02',
    tenant: 'Alexandro',
    rentAmount: 150,
    dueDay: 9,
    paymentDate: formatDate('07/02/2025'),
    paymentAmount: 150,
    status: getStatus('Alexandro', '07/02/2025'),
    utilityMeterNumber: ''
  }
];

export const initialBenefits: BenefitPayment[] = [
  {
    id: '1',
    name: 'LOAS',
    amount: 1200,
    paymentAmount: 1400,
    status: 'paid',
    notes: 'Benefício mensal'
  }
];