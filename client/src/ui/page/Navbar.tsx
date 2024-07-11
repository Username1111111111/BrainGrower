import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate("/");
};

  return (
    <nav id={'navbar'} className='w-100'>
      <ul className='d-flex flex-row flex-wrap justify-content-between w-100 m-0 p-0 border border-secondary border-top-0 bg-body-secondary'>
        <div> <Link className='p-0 m-2 btn btn-secondary' to="/"><li className='bg-transparent text-white p-2'>Home</li></Link>
          {token && role == 'admin' && <Link className='p-0 m-2 btn btn-secondary' to="/users"><li className='bg-transparent text-white p-2'>Users</li></Link>}</div>

        <div className='d-flex flex-row justify-content-center align-items-center'>
          {token ? <Link className='p-0 m-2 btn btn-secondary' to="/profile"><li className='bg-transparent text-white p-2'>Username</li></Link> : <Link className='p-0 m-2 btn btn-secondary' to="/login"><li className='bg-transparent text-white p-2'>Login</li></Link>}

          {token ?<button onClick={handleLogout} className='btn btn-primary m-2 p-2'>Log out</button> :
            <Link className='p-0 m-2 btn btn-primary' to="/signup"><li className='bg-primary rounded text-white p-2'>Signup</li></Link>}
        </div>
      </ul>
    </nav>
  );
}