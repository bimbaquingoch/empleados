/* eslint-disable @next/next/no-img-element */
import { Field, Form, Formik } from "formik";
import { faker } from "@faker-js/faker";
import { formatearFecha } from "../helpers";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Alert from "../components/Alert";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const NuevoEmpleado = () => {
  const router = useRouter();
  const nuevoEmpleadoSchema = Yup.object().shape({
    email: Yup.string().email().required("El mail es requerido"),
    cedula: "",
    name: Yup.string()
      .min(3, "El nombre es muy corto")
      .required("El nombre es obligatorio"),
    lastname: Yup.string()
      .min(3, "El apellido es muy corto")
      .required("El apellido es obligatorio"),
  });
  const data = {
    id: faker.datatype.uuid(),
    img: faker.image.people(300, 300, true),
    name: faker.name.findName(),
    email: faker.internet.email(),
    cedula: faker.random.numeric(10),
    phone: faker.phone.phoneNumber(),
    birthday: formatearFecha(faker.date.birthdate()),
  };

  const random = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/empleados`;
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Empleado creado");
      router.push("/empleados");
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = (valores) => {
    console.log(valores);
  };

  return (
    <Layout page={"Nuevo Empleado"}>
      <section className='sectionLogin'>
        <div className='imgBx'>
          <img src='/img/img1.jpg' alt='' />
        </div>
        <div className='contentBx'>
          <Formik
            validationSchema={nuevoEmpleadoSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
            initialValues={{
              email: "",
              cedula: "",
              name: "",
              lastname: "",
            }}>
            {({ errors, touched }) => (
              <Form className='formBx'>
                <div className='flex flex-col'>
                  <button onClick={random} className='btnForm mb-5 mt-0'>
                    Crear empleado con un click
                  </button>
                  <h2 className='heading'>Nuevo empleado</h2>
                </div>
                {/* cedula */}
                <div className='mb-6'>
                  <label className='label' htmlFor='cedula'>
                    Cédula
                  </label>
                  <Field
                    className='inputForm'
                    id='cedula'
                    name='cedula'
                    type='number'
                    placeholder='1234567890'
                  />
                </div>
                {/* nombre */}
                <div className='mb-6'>
                  <label
                    className={`label ${errors.name ? "text-red-400" : null}`}
                    htmlFor='name'>
                    nombres
                  </label>
                  <Field
                    className={`inputForm ${
                      errors.name
                        ? "border-red-400 border-2 placeholder-red-300"
                        : null
                    }`}
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Juan Jose'
                  />
                  {errors.name && touched.name ? (
                    <Alert>{errors.name}</Alert>
                  ) : null}
                </div>
                {/* apellido */}
                <div className='mb-6'>
                  <label
                    className={`label ${
                      errors.lastname ? "text-red-400" : null
                    }`}
                    htmlFor='lastname'>
                    apellidos
                  </label>
                  <Field
                    className={`inputForm ${
                      errors.lastname
                        ? "border-red-400 border-2 placeholder-red-300"
                        : null
                    }`}
                    id='lastname'
                    name='lastname'
                    type='text'
                    placeholder='Cruz Segobia'
                  />
                  {errors.lastname && touched.lastname ? (
                    <Alert>{errors.lastname}</Alert>
                  ) : null}
                </div>
                {/* correo */}
                <div className='mb-6'>
                  <label className='label' htmlFor='email'>
                    correo
                  </label>
                  <Field
                    className='inputForm'
                    id='email'
                    name='email'
                    type='email'
                    placeholder='escribe tu email'
                  />
                </div>

                <input
                  className='btnForm'
                  type='submit'
                  value='crear empleado'
                />
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </Layout>
  );
};

export default NuevoEmpleado;
