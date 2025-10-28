
// FIX: Expanded UserRole enum to match all roles available in the backend. This ensures type safety and consistency across the application.
export enum UserRole {
  BUYER = 'buyer',
  VENDOR = 'vendor',
  SUPER_ADMIN = 'superadmin',
  FREIGHT_AGENCY = 'freight_agency',
  PAYMENT_ADMIN = 'payment_admin',
}

export interface IComment {
  _id: string;
  user: {
    _id: string;
    fullName: string;
  };
  message: string;
  createdAt: string;
}

export interface IEvidence {
  _id: string;
  fileName: string;
  fileUrl: string;
  uploadedBy: string;
}

export interface IDispute {
  _id: string;
  tradeId: string;
  reason: string;
  status: 'Open' | 'Under Review' | 'Resolved';
  raisedBy: {
    _id: string;
    fullName: string;
  };
  parties: {
    _id: string;
    fullName: string;
  }[];
  description: string;
  comments: IComment[];
  evidence: IEvidence[];
  resolution?: string;
  createdAt: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  company?: any; 
}

export interface ITrade {
  _id: string;
  productName: string;
  quantity: string;
  targetPrice: number;
  destination: string;
  status: string;
  buyer: IUser;
  seller?: IUser;
  additionalDetails?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOffer {
    _id: string;
    productName: string;
    price: number;
    quantity: string;
    status: string;
    description?: string;
}

export interface IPayment {
    _id: string;
    amount: number;
    status: string;
    paymentType: string;
    createdAt: string;
    trade?: {
        productName: string;
    }
}

export interface ISetting {
    _id: string;
    key: string;
    value: any;
    description: string;
}
