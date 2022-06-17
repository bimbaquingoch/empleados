/* eslint-disable @next/next/no-img-element */

import Layout from "components/Layout";
import { formatearFecha } from "helpers";

const Empleado = ({ entrada }) => {
  const { birthday, lastname, email, img, name, phone } = entrada;
  return (
    <Layout page={"empleado"}>
      <div className='w-full my-32 md:m-0 md:h-screen flex md:items-center justify-center m-auto'>
        <div className='cardEmpleado'>
          <div className=' h-full overflow-hidden'>
            <img className='w-full h-full object-cover' src={img} alt='' />
          </div>
          <div className='contenido md:mr-6'>
            <h2 className='mt-4 text-center md:text-left  text-xl'>
              <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                nombre:
              </span>
              {lastname ? name + " " + lastname : name}
            </h2>
            <p className='text-center mt-4 md:text-left text-xl'>
              <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                correo:{" "}
              </span>
              {email}
            </p>
            {birthday && (
              <p className='text-center mt-4 md:text-left  text-xl'>
                <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                  fecha de nacimiento:
                </span>
                {formatearFecha(birthday)}
              </p>
            )}
            {phone && (
              <p className='text-center mt-4 md:text-left  text-xl'>
                <span className='heading hidden md:inline border-none md:mr-4 text-slate-200'>
                  telefono:{" "}
                </span>{" "}
                {phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async () => {
  const url = `${process.env.API_URL}/api/empleados`;
  const respuesta = await fetch(url);
  const entradas = await respuesta.json();
  const paths = entradas.map((entrada) => ({
    params: { id: entrada._id },
  }));
  return {
    paths,
    fallback: false,
  };
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getStaticProps = async ({ params: { id } }) => {
  const url = `${process.env.API_URL}/api/empleados/${id}`;
  const respuesta = await fetch(url);
  const entrada = await respuesta.json();
  return {
    props: { entrada },
  };
};

export default Empleado;
