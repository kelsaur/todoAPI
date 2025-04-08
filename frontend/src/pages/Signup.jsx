import { Link } from 'react-router-dom';
import { signUp } from '../api/userApi';
import { useState } from 'react';

const Signup = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    try {
      const newUser = await signUp(userName, password, email);
      console.log(newUser);

      if (!newUser.success) {
        if (newUser.usernameExists) {
          console.log('Username already taken');
        }
        if (newUser.emailExists) {
          console.log('Email already taken!');
        }
        return;
      }

      //clear form after submit
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (err) {
      console.log('Failed to create account: ', err);
    }
  };

  return (
    <div className="text-center mt-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <div className="form-group mt-1">
          <label htmlFor="exampleInputUsername1">Username</label>
          <input
            type="username"
            className="form-control"
            id="exampleInputUsername1"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group mt-1">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className="d-flex justify-content-center m-3"
          style={{ gap: '0.5rem' }}
        >
          <Link to="/" className="btn btn-primary">
            Back
          </Link>

          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
