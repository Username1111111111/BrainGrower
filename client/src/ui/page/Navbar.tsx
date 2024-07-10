import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id={'navbar'} className='w-100'>
      <ul className='d-flex flex-row flex-wrap justify-content-between w-100 m-0 p-0 border border-secondary border-top-0 bg-body-secondary'>
        <Link className='p-0 m-2 btn btn-secondary' to="/"><li className='bg-transparent text-white p-2'>Home</li></Link>
        <div>
          <Link className='p-0 m-2 btn btn-secondary' to="/login"><li className='bg-transparent text-white p-2'>Login</li></Link>
          <Link className='p-0 m-2 btn btn-primary' to="/signup"><li className='bg-primary rounded text-white p-2'>Signup</li></Link>
        </div>
      </ul>
    </nav>
  );
}