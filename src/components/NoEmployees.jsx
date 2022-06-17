/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const NoEmployees = () => {
  return (
    <div className='h-screen flex items-center flex-col justify-center'>
      <h1 className='heading'>There are not employees yet</h1>
      <img
        className='my-5'
        src='https://media.giphy.com/media/I1nwVpCaB4k36/giphy.gif'
        alt='no tasks yet'
      />
      <div>
        <Link href={"/newEmpleado"}>
          <a className='btnForm' href=''>
            Register an employee
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NoEmployees;
