import axios from "axios"
import {useRouter} from "next/router";
import { useEffect } from "react";
///////
export default () => {
  const router = useRouter(); 
  useEffect(async () => {
    try {
      await axios.post('/api/users/signout');
      router.push('/');
    } catch (error) {
      console.log(error.response.error)
    }
  }, [])

  return null;
}