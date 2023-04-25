interface IUser {
  refresh_token?: string;
  __v?: number;
  _id?: string;
  name?: string;
  password?: string;
}

interface IUserUpdate {
  name: string;
  email?: string;
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
}
