import Link from "next/link";
import { useState } from "react";
import {
  BiHome,
  BiMenu,
  BiPlusCircle,
  BiUserCircle,
  BiX,
} from "react-icons/bi";

const Navegacion = () => {
  const [sideBar, setsideBar] = useState(false);

  return (
    <>
      <nav className='nav_small'>
        <h1>Prueba</h1>
        <button onClick={() => setsideBar(!sideBar)} className='btnNav'>
          {!sideBar ? <BiMenu /> : <BiX />}
        </button>
      </nav>

      <nav
        className={`navbar ${!sideBar && "-translate-x-16"} md:translate-x-0`}>
        <Link href={"/"}>
          <a className='flex items-center btnNavs group home'>
            <BiHome size={40} />
            <span className='text-nav group-hover:scale-100'>home</span>
          </a>
        </Link>
        <Link href={"/newEmpleado"}>
          <a className='flex items-center btnNavs group nuevo' href=''>
            <BiPlusCircle size={40} />
            <span className='text-nav group-hover:scale-100 '>
              Registrar nuevo
            </span>
          </a>
        </Link>
        <Link href={"/empleados"}>
          <a className='flex items-center btnNavs group empleados' href=''>
            <BiUserCircle size={40} />
            <span className='text-nav group-hover:scale-100'>empleados</span>
          </a>
        </Link>
      </nav>
    </>
  );
};

export default Navegacion;
