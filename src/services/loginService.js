import axios from 'axios';

export default class loginService{
  static login = user=>axios.post('https://api.marktube.tv/v1/me',user);

  static logout = async (token)=>{
    await axios.delete('https://api.marktube.tv/v1/me',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
}