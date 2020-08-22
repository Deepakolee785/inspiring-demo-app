import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOADING,
} from './authTypes'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  loading: false,
  error: '',
  user: null,
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
      // set token
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: '',
      }
    case REGISTER_FAILURE:
      // remove token
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      }
    case LOGIN_SUCCESS:
      // set token
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: '',
      }
    case LOGIN_FAILURE:
      // remove token
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        error: '',
        user: null,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }

    default:
      return state
  }
}
