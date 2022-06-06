import Head from "next/head";
import Navegacion from "./Navegacion";

const Layout = ({ children, page }) => {
  return (
    <div>
      <Head>
        <title>Kruger - {page}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navegacion />
      {children}
      <footer className='md:sticky h-20 backdrop-blur-lg bottom-0 z-30 shadow-inner'>
        hola
      </footer>
    </div>
  );
};

const NavIcon = ({ icon }) => <div className='nav-icon'>{icon}</div>;

export default Layout;