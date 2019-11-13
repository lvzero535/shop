export interface Manager {
  id?: string;
  username: string;
  password?: boolean;
  email?: string;
  role?: number;
  createdDate: Date;
}

export interface ManagerResp {
  managers: Array<Manager>;
  total: number;
}
