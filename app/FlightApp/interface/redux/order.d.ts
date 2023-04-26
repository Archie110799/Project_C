interface IRequestOrder {
  userId?: string;
  name?: string;
  email?: string;
  gender?: number | string;
  phone?: string;
  from?: string;
  to?: string;
  price?: string;
  adults?: Array<IAdults>;
  children?: number;
  babies?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

interface IAdults {
  name: string;
  gender: number;
  ccid: string;
  birthDate: Date;
}
