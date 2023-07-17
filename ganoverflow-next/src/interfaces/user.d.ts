interface Follow {
  followId: number;
  followerId: string;
  followeeId: string;
}

interface User {
  id: string;
  refreshToken?: string | null;
  refreshTokenExp?: Date | null;
  username: string;
  password: string;
  email?: string | null;
  nickname: string;
  status: "N" | "R" | "S";
  gender?: "M" | "F" | "N" | null;
  birth_date?: Date | null;
  svc_use_pcy_agmt: "Y" | "N";
  ps_info_proc_agmt: "Y" | "N";
  mkt_info_recv_agmt: "Y" | "N";
  created_at: Date;
  provider?: string | null;
  social_id?: string | null;
  chatposts?: IChatPost[] | null;
  comments?: Comment[] | null;
  followerId?: Follow[] | null;
  followeeId?: Follow[] | null;
  folders?: string;
}
