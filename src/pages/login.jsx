import Layout from "components/Layout";
import { Field, Form, Formik } from "formik";

/* eslint-disable @next/next/no-img-element */
const IniciarSesion = () => {
  return (
    <Layout page={"login"}>
      <section className='sectionLogin'>
        <div className='imgBx'>
          <img src='/img/img1.jpg' alt='' />
        </div>

        <div className='contentBx'>
          <Formik initialValues={{ email: "", password: "" }}>
            {() => (
              <Form className='formBx'>
                <h2 className='heading'>Iniciar sesion</h2>
                {/* inputBx */}
                <div className='mb-6'>
                  <label className='label' htmlFor='email'>
                    email
                  </label>
                  <Field
                    className='inputForm'
                    id='email'
                    name='email'
                    type='email'
                    placeholder='escribe tu email'
                  />
                </div>

                {/* inputBx */}
                <div className='mb-6'>
                  <label className='label' htmlFor='password'>
                    Contraseña
                  </label>
                  <Field
                    className='inputForm'
                    id='password'
                    type='password'
                    name='password'
                    placeholder='escribe tu contraseña'
                  />
                </div>

                {/* inputBx */}
                <input
                  className='btnForm'
                  type='submit'
                  value='iniciar sesion'
                />
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </Layout>
  );
};

export default IniciarSesion;
