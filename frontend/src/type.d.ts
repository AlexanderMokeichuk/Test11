export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface UserApi {
  _id: string;
  username: string;
  displayName: string;
  phoneNumber: string,
  token: string;
}

export interface RegisterResponse {
  user: UserApi;
  massage: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Category {
  _id: string,
  categoryName: string,
}

export interface ProductFrom  {
  title: string,
  price: string,
  description: string,
  image: File | null,
}

export interface Product extends ProductFrom {
  category: string;
}

export interface ProductApi {
  _id: string,
  title: string,
  price: string,
  image: string | null,
}