export interface Property {
  id: string;
  name: string;
  tenant: string;
  rentAmount: number;
  dueDay: number;
  paymentDate?: string;
  paymentAmount?: number;
  status: 'paid' | 'pending' | 'late' | 'vacant';
  utilityMeterNumber?: string;
  notes?: string;
}

export interface RentPayment {
  id: string;
  propertyId: string;
  dueDate: string;
  paymentDate?: string;
  amount: number;
  status: 'paid' | 'pending' | 'late';
}

export interface BenefitPayment {
  id: string;
  name: string;
  amount: number;
  paymentDate?: string;
  paymentAmount?: number;
  status: 'paid' | 'pending';
  notes?: string;
}