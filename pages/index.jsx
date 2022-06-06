/* eslint-disable @next/next/no-img-element */
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout page={"home"}>
      <div className='imgBx w-full flex flex-col gap-6 items-center justify-center h-screen bg-[url(/img/img2.jpg)] bg-cover  bg-bottom'>
        <h1 className='heading'>bienvenido a la prueba frontend!</h1>
        <div className='h-60 w-60'>
          <img className='drop-shadow-lg' src='/img/ghost-img.png' alt='' />
        </div>
      </div>
    </Layout>
  );
}
