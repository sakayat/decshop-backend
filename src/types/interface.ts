export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  image: string;
  phone?: string;
  address?: string;
  storeInfo?: {
    name?: string;
    description?: string;
    logo?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
