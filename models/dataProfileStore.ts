export type ResponseDataRegT = {
  communities: RegCommunityT[];
  a: string;
  user: RegUserT;
};

type RegUserT = {
  id: number;
  username: string;
  'dark-theme': true;
  language: string;
  avatar: null;
};

export type RegCommunityT = {
  name: string;
  description?: string;
  id: number;
};
