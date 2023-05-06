interface IUser {
  __v?: number;
  _id?: string;
  name?: string;
  password?: string;
  type?: number;
  gender?: number;
  email?: string;
  phone?: string;
}

interface IRequestLogin {
  name: string;
  password?: string;
}

interface IRequestRegister {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: string | number;
  phone: string;
  type: number;
}
