import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="text-center mt-5">
      <h1>Hello!</h1>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/signup" className="btn btn-outline-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
};
export default Welcome;
