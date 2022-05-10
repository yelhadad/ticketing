import axios from "axios";

const buildClient = ({req}) => {
  if(typeof window === 'undefined') {
   return axios.create({
     baseURL: 'http://www.yoav-elhadad-ticketing.xyz',
     headers: req.headers,
   });
  } else {
    return axios.create({baseURL:'/'});
  }
};

export { buildClient };