import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {  useNavigate, useParams } from 'react-router-dom';
function EditarEmpleado() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [empleado, datosEmpleado] = useState({
        apellido: '',
        nombre:'',
        cargo:'',
        email: ''
    });
    const consultarAPI = async () => {
        const empleadoConsulta = await clienteAxios.get(`/empleados/${id}`);

        //colocar datos en el state

       datosEmpleado(empleadoConsulta.data);
    }
    useEffect(() => {
        consultarAPI()
    }, []);

    const actualizarState = e => {
        datosEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        })
    }

    //agregar insumo
    const actualizarEmpleado = e => {
        e.preventDefault();
        /// enviar peticion 
        clienteAxios.put(`/empleados/${empleado._id}`, empleado)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Ese mail ya se encuentra registrado'
                    })
                 }else{
                         Swal.fire(
                         'Good job!',
                        ' res.data.mensaje',
                         'success'
                     )
                 }
                 
                navigate('/empleados')
            })


    }

    return (
        <Fragment>
            <div className='col-md-6'>
                <h2>Editar empleado</h2>

                <form onSubmit={actualizarEmpleado}>
                    <label className="form-label" >Nombre</label>
                    <input className="form-control" value={empleado.nombre} name="nombre" onChange={actualizarState} />
                    <label className="form-label" >Apellido</label>
                    <input className="form-control" value={empleado.apellido} name="empleado" onChange={actualizarState} />
                    <label className="form-label" >Cargo</label>
                    <input className="form-control" value={empleado.cargo} name="cargo" onChange={actualizarState} />
                    <label className="form-label" >Email</label>
                    <input className="form-control" value={empleado.email} name="email" onChange={actualizarState} />
                    <button type="submit" className="btn btn-success mt-2" name="submit" id="submit" >Enviar form</button>
                </form>
            </div>
        </Fragment>
    )
}
export default EditarEmpleado;