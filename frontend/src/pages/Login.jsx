import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="text-center mt-5">
      <form>
        <div className="form-group">
          <label htmlFor="exampleUsername">Username</label>
          <input
            type="username"
            className="form-control"
            id="exampleUsername1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group mt-1">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
