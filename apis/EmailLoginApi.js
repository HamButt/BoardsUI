import axios from 'axios'

export const EmailLogin = async (email) => {

  try {
    const response = await axios.post(`${process.env.basePath}/users/login`, {email})
    return response
  } catch (error) {
      return error
  }
}
