import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe} from "../services/auth.api"


export const useAuth =() => {


  const context = useContext(AuthContext)
  const { user, setUser, loading, setLoading} = context


  const handlelogin = async ({ email, password}) => {
    setLoading(true)
    try{

      const  data = await login({email, password}) // user ka data bhi rehega // true->  api call -> respone.data -> false
      setUser(data.user)

    }catch(err){

      console.log(err)

    }finally{

      setLoading(false)

    }
  
    
  }

  const handleRegister = async({ username, email , password}) => {
    setLoading(true)

    try{

      const data = await register({username, email , password})
      setUser(data.user)

    }catch(err){

      console.log(err)

    }finally{

        setLoading(false)

    }
    
  }

  const handleLogout = async() =>{
    setLoading(true)
    try{

      const data = await logout() 
      setUser(null)

    }catch(err){

      console.log(err)

    }finally{

      setLoading(false)

    }
   
    
  }

  return {user, loading, handleRegister, handlelogin, handleLogout}


}