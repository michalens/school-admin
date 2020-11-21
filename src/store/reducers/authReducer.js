const initState = {
    authError: null,
    isAuthenticated: false
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case 'LOGIN_ERROR':
        console.log('login error');
        return {
          ...state,
          authError: 'Login failed',
          isAuthenticated: false
        }
  
      case 'LOGIN_SUCCESS':
        console.log('login success');
        return {
          ...state,
          authError: null,
          isAuthenticated: true
        }
  
      case 'SIGNOUT_SUCCESS':
        console.log('signout success');
        return {
            ...state,
            authError: null,
            isAuthenticated: false
        };
  
      case 'SIGNUP_SUCCESS':
        console.log('signup success')
        return {
          ...state,
          authError: null,
          isAuthenticated: true
        }
  
      case 'SIGNUP_ERROR':
        console.log('signup error')
        return {
          ...state,
          authError: action.err.message,
          isAuthenticated: false
        }
  
      default:
        return state
    }
  };
  
  export default authReducer;