import { useEffect, useState } from "react";
import EmpleadoCard from "../components/EmpleadoCard";
import EmpleadoList from "../components/EmpleadoList";
import { BiGridAlt, BiListUl } from "react-icons/bi";
import Layout from "../components/Layout";

const Empleados = () => {
  const [peticion, setpeticion] = useState([]);
  const [grid, setgrid] = useState(false);

  useEffect(() => {
    try {
      const obtenerData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/empleados`;
        const resp = await fetch(url);
        const datos = await resp.json();
        setpeticion(datos);
      };
      obtenerData();
    } catch (error) {
      console.log(error);
    }
  }, [peticion]);

  const eliminar = (id) => {
    const confirmar = confirm("¿deseas eliminar este empleado?");
    if (confirmar) {
      try {
        const eliminarEmpleado = async () => {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/empleados/${id}`;
          const resp = await fetch(url, { method: "DELETE" });
          await resp.json();
          const nuevosEmpleados = peticion.filter(
            (empleado) => empleado.id !== id
          );
          setpeticion(nuevosEmpleados);
        };
        eliminarEmpleado();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Layout page={"empleados"}>
      <div className='flex items-center justify-evenly mb-10 my-10'>
        <h1 className='heading'>empleados</h1>
        <button
          className='text-3xl btnForm w-auto shadow-lg'
          onClick={() => setgrid(!grid)}>
          {grid ? <BiListUl /> : <BiGridAlt />}
        </button>
      </div>

      {grid ? (
        <div className='contentGrid'>
          {peticion.map((empleado) => (
            <EmpleadoCard
              key={empleado.id}
              empleado={empleado}
              eliminar={eliminar}
            />
          ))}
        </div>
      ) : (
        <div className='contentList'>
          <div className='justify-between hidden md:flex'>
            <h2 className='heading text-slate-100 ml-6'>Nombre</h2>
            <h2 className='heading text-slate-100 '>correo</h2>
            <h2 className='heading text-slate-100  lg:mr-20'>acciones</h2>
          </div>
          {peticion.map((empleado) => (
            <EmpleadoList
              key={empleado.id}
              empleado={empleado}
              eliminar={eliminar}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Empleados;
