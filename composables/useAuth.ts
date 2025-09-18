export const useAuth = () => {
    const user = useState('user')
  
    const login = async () => {
      const logto = useNuxtApp().$logto
      await logto.signIn()
      const session = await logto.getSession()
      user.value = session.user
    }
  
    const logout = async () => {
      const logto = useNuxtApp().$logto
      await logto.signOut()
      user.value = null
      return navigateTo('/login')
    }
  
    return { user, login, logout }
  }
  