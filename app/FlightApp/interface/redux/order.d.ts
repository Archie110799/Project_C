interface IRequestOrder {
  userId?: string;
  name?: string;
  email?: string;
  gender?: number | string;
  phone?: string;
  from?: string;
  to?: string;
  price?: string;
  adults: Array<IAdult>;
  children?: number;
  babies?: number;
  dateFrom: string;
  dateTo: string;
}

interface IOrder {
  _id: string;
  userId?: string;
  name?: string;
  email?: string;
  gender?: number | string;
  phone?: string;
  from?: string;
  to?: string;
  price?: string;
  adults: Array<IAdult>;
  children?: number;
  babies?: number;
  dateFrom?: string;
  dateTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IAdult {
  name: string;
  gender: number | string;
  ccid: string;
  birthDate: string | Date;
}
