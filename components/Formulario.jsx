/* eslint-disable @next/next/no-img-element */
import { faker } from "@faker-js/faker";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Alert from "./Alert";
import * as Yup from "yup";
import { useState } from "react";

const Formulario = ({ empleado }) => {
  const [vacuna, setvacuna] = useState(false);
  const router = useRouter();
  const nuevoEmpleadoSchema = Yup.object().shape({
    email: Yup.string()
      .email("email no valido")
      .required("El mail es obligatorio"),
    cedula: Yup.number("Solo se acepta numeros")
      .integer("numero no valido")
      .positive("numero no valido")
      .typeError("numero no valido")
      .required("La cedula es obligatoria"),
    name: Yup.string()
      .min(3, "El nombre es muy corto")
      .trim("esta vacio")
      .required("El nombre es obligatorio"),
    lastname: Yup.string()
      .min(3, "El apellido es muy corto")
      .trim("esta vacio")
      .required("El apellido es obligatorio"),
    birthday: Yup.date(),
  });
  const data = {
    id: faker.datatype.uuid(),
    img: faker.image.people(300, 300, true),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    cedula: faker.random.numeric(10),
    phone: faker.phone.phoneNumber(),
    birthday: faker.date.birthdate(),
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

  const submitForm = async (valores) => {
    try {
      if (empleado.id) {
        //   editando
        const url = `${process.env.NEXT_PUBLIC_API_URL}/empleados/${empleado.id}`;
        await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            ...valores,
            img: faker.image.people(300, 300, true),
            vacuna: vacuna ? "Vacunado" : "No vacunado",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Empleado editado");
      } else {
        //   nuevo
        const url = `${process.env.NEXT_PUBLIC_API_URL}/empleados`;
        await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            ...valores,
            id: faker.datatype.uuid(),
            img: faker.image.people(300, 300, true),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Empleado creado");
      }
      router.push("/empleados");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={`sectionLogin pb-24`}>
      <div className='bg-[url(/img/img1.jpg)] imgBx bg-cover bg-bottom'></div>
      <div className={`contentBx ${empleado.id && "h-full mt-10"}`}>
        <Formik
          validationSchema={nuevoEmpleadoSchema}
          onSubmit={async (values, { resetForm }) => {
            await submitForm(values);
            resetForm();
          }}
          initialValues={{
            email: empleado?.email ?? "",
            cedula: empleado?.cedula ?? "",
            name: empleado?.name ?? "",
            lastname: empleado?.lastname ?? "",
            birthday: empleado?.birthday ?? "",
          }}
          enableReinitialize={true}>
          {({ errors, touched }) => (
            <Form className='formBx'>
              <div className='flex flex-col'>
                {!empleado?.name && (
                  <button onClick={random} className='btnForm mb-5 mt-0'>
                    Crear empleado con un click
                  </button>
                )}
                <h2 className='heading'>
                  {empleado.name ? "Editando empleado" : "Nuevo empleado"}
                </h2>
              </div>
              {/* cedula */}
              <div className='mb-6'>
                <label
                  className={`label ${errors.cedula ? "text-red-400" : null}`}
                  htmlFor='cedula'>
                  Cédula
                </label>
                <Field
                  className={`inputForm ${
                    errors.cedula
                      ? "border-red-400 border-2 placeholder-red-300"
                      : null
                  }`}
                  id='cedula'
                  name='cedula'
                  type='text'
                  placeholder='1234567890'
                />
                {errors.cedula && touched.cedula ? (
                  <Alert>{errors.cedula}</Alert>
                ) : null}
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
                  className={`label ${errors.lastname ? "text-red-400" : null}`}
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
                <label
                  className={`label ${errors.email ? "text-red-400" : null}`}
                  htmlFor='email'>
                  correo
                </label>
                <Field
                  className={`inputForm ${
                    errors.email
                      ? "border-red-400 border-2 placeholder-red-300"
                      : null
                  }`}
                  id='email'
                  name='email'
                  type='email'
                  placeholder='escribe tu email'
                />
                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>
              {/* datos extr */}
              {empleado.id && (
                <>
                  <div className='mb-6'>
                    <label className={`label mr-5 mb-0`} htmlFor='birthday'>
                      Fecha de nacimiento
                    </label>
                    <Field
                      className={`inputForm `}
                      id='birthday'
                      name='birthday'
                      type='date'
                      min='2021-31-01'
                      max='2022-30-06'
                      value={empleado?.birthday}
                      placeholder='escribe tu email'
                    />
                  </div>

                  <div className='mb-6'>
                    <label className={`label`} htmlFor='telefono'>
                      telefono
                    </label>
                    <Field
                      className={`inputForm`}
                      id='telefono'
                      name='telefono'
                      type='text'
                      placeholder='1234567890'
                    />
                  </div>
                </>
              )}
              {/* vacunas */}
              {empleado.id && (
                <div className='mb-6 flex items-center justify-center'>
                  <label className={`label mr-5 mb-0`} htmlFor='vacunado'>
                    Vacunado?
                  </label>
                  <Field
                    onClick={() => setvacuna(!vacuna)}
                    className={`inputForm w-auto btnForm ${
                      vacuna ? "Vacunado" : "bg-red-400 hover:bg-red-500"
                    }`}
                    id='vacunado'
                    name='vacunado'
                    type='button'
                    value={`${vacuna ? "Vacunado" : "No vacunado"}`}
                    placeholder='escribe tu email'
                  />
                </div>
              )}
              {/* birthday */}
              {vacuna && (
                <div className='mb-6'>
                  <label className={`label mr-5 mb-0`} htmlFor='fechaVac'>
                    Fecha de vacunacion
                  </label>
                  <Field
                    className={`inputForm `}
                    id='fechaVac'
                    name='fechaVac'
                    type='date'
                    min='2021-31-01'
                    max='2022-30-06'
                    value={empleado?.birthdate}
                    placeholder='escribe tu email'
                  />
                </div>
              )}
              <input
                className='btnForm'
                type='submit'
                value={empleado.name ? "Actualizar empleado" : "Nuevo empleado"}
              />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

Formulario.defaultProps = {
  empleado: {},
};

export default Formulario;
