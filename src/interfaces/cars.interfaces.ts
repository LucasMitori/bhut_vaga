export interface ICarRequest {
  title: string;
  brand: string;
  price: string;
  age: number;
  __v: number;
}
export interface ICarResponse {
  id?: string;
  title: string;
  brand: string;
  price: string;
  age: number;
  __v: number;
}

export interface IExternalCarResponse {
  _id: string;
  title: string;
  brand: string;
  price: string;
  age: number;
  __v: number;
}
