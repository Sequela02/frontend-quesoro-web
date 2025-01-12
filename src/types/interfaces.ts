export interface User {
  id?: number;
  name: string;
  email: string;
  username: string;
  password?: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}


  export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: string[];
    authorities: string[];
  }
  export interface Spin {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  }

  export interface Group {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  }
  
  export interface Route {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  }