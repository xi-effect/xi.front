
export type ResponseDataRegT ={
  communities: RegCommunnitiT[],
  a:string,
  user:RegUserT,
};
type RegUserT = {
  id:number,
  username:string,
  "dark-theme":true,
  language:string,
  avatar:{},
};

type RegCommunnitiT = {
  name:string,
  description:string,
  id:number,

};
