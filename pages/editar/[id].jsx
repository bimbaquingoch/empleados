import Formulario from "../../components/Formulario";
import Layout from "../../components/Layout";
import Notfound from "../[404]";

const Editar = ({ entrada }) => {
  console.log(entrada);
  return (
    <>
      {entrada?.id ? (
        <Layout page={"editar empleado"}>
          <Formulario empleado={entrada} />
        </Layout>
      ) : (
        <Notfound />
      )}
    </>
  );
};

export const getStaticPaths = async () => {
  const url = `${process.env.API_URL}/empleados`;
  const respuesta = await fetch(url);
  const entradas = await respuesta.json();
  const paths = entradas.map((entrada) => ({
    params: { id: entrada.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const url = `${process.env.API_URL}/empleados/${id}`;
  const respuesta = await fetch(url);
  const entrada = await respuesta.json();
  return {
    props: { entrada },
  };
};

export default Editar;
