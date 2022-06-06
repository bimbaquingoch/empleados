import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";

const EmpleadoList = ({ empleado, eliminar }) => {
  const { name, email, lastname, id } = empleado;
  return (
    <div className='list'>
      <p className='text-xl py-3  font-bold md:p-0'>
        {lastname ? name + " " + lastname : name}
      </p>
      <p className='text-xl py-3 font-medium opacity-50 md:p-0'>{email}</p>
      <div>
        <div className='flex gap-2'>
          <button className='flex items-center justify-evenly  btnForm bg-sky-600 hover:bg-sky-500'>
            <span className='lg:text-2xl'>
              <BiEdit />
            </span>
            editar
          </button>
          <button
            onClick={() => eliminar(id)}
            className='flex items-center justify-evenly  btnForm bg-red-700 hover:bg-red-600'>
            <span className='lg:text-2xl'>
              <BiTrash />
            </span>
            eliminar
          </button>
        </div>
        <Link href={`/empleados/${id}`}>
          <button className='mt-2 btnForm'>ver empleado</button>
        </Link>
      </div>
    </div>
  );
};

export default EmpleadoList;
