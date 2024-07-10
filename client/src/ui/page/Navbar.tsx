import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id={'navbar'} className='w-100'>
      <ul className='d-flex flex-row flex-wrap w-100 m-0 p-0 border border-secondary border-top-0 bg-body-secondary'>
        <Link className='p-0 m-2 btn btn-secondary' to="/"><li className='bg-transparent text-white p-2'>Home</li></Link>
        <Link className='p-0 m-2 btn btn-secondary' to="/user/create"><li  className='bg-transparent text-white p-2'>Create User</li></Link>
        <Link className='p-0 m-2 btn btn-secondary' to="/user/update"><li className='bg-transparent text-white p-2'>Update User</li></Link>
      </ul>
    </nav>
  );
}