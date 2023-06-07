export type Gender = "M" | "F" | "N"; // M: Male, F: Female, N: Not selected
export type Agreement = "Y" | "N";
export type Status = "N" | "R" | "S"; // N: Normal, R: Rest, S: Stop

export interface IUser {
  username: string;
  status: string;
  password: string;
  nickname: string;
  gender: Gender;
  birth_date: string;
  //   phone_num: string;
  svc_use_pcy_agmt: Agreement;
  ps_info_proc_agmt: Agreement;
  mkt_info_recv_agmt: Agreement;
}

export interface IRegister
  extends Pick<
    IUser,
    | "username"
    | "password"
    | "nickname"
    | "gender"
    | "birth_date"
    // | "phone_num"
    | "svc_use_pcy_agmt"
    | "ps_info_proc_agmt"
    | "mkt_info_recv_agmt"
  > {}

export interface ILogIn extends Pick<IUser, "username" | "password"> {}
