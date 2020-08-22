import axios from 'axios'

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOADING,
} from './authTypes'

export const register = ({ name, email, password }) => async (dispatch) => {
  // console.log(name, email, password)
  setLoading()
  try {
    const res = await axios({
      method: 'post',
      url: '/user/register',
      data: { name, email, password },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // console.log(res.data)
    dispatch({ type: REGISTER_SUCCESS, payload: res.data })
  } catch (err) {
    // console.log(err.response.data.msg)
    dispatch({ type: REGISTER_FAILURE, payload: err.response.data.msg })
  }
  setLoading()
}

export const login = ({ email, password }) => async (dispatch) => {
  // console.log(email, password)
  setLoading()
  try {
    const res = await axios({
      method: 'post',
      url: '/user/login',
      data: { email, password },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // console.log(res.data)
    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
  } catch (err) {
    // console.log(err.response.data.msg)
    dispatch({ type: LOGIN_FAILURE, payload: err.response.data.msg })
  }
  setLoading()
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}

export const setLoading = () => (dispatch) => {
  dispatch({ type: LOADING })
}
