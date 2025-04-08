import axios from 'axios';

export const signUp = async (username, password, email) => {
  const res = await axios.post('http://localhost:8000/api/user/signup', {
    username,
    password,
    email,
  });

  return res.data; //res-whole http response, res.data-data we want
};
