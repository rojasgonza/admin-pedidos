import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function NuevoEmpleado(){
    const navigate = useNavigate();
    //iniciar vacio el insumo y poner los datos que se van a guardar
    const [empleado, guardarEmpleado] = useState({
        apellido: '',
        nombre:'',
        cargo:'',
        email: ''
    });
   //guardar lo que se va escribiendo
    const actualizarState = e =>{
        guardarEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        })
    }
    //todo guardar insumo
    const agregarEmpleado = e => 
    {
        e.preventDefault();
    
        //enviar peticion post
        clienteAxios.post('/empleados', empleado)
        .then(res=>{
            if (res.data.code === 11000) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Ese mail ya se encuentra registrado'
                })
             }else{
                     Swal.fire(
                     'Good job!',
                     res.data.mensaje,
                     'success'
                 )
             }
            navigate('/empleados')
        })
    }




    return(
        <Fragment>
        <h2>Nuevo empleado</h2>
        
            <form onSubmit={agregarEmpleado} className='col-md-6' >
                <label className="form-label">Nombre:</label>
                <input type="text" className="form-control" name="nombre" onChange={actualizarState}/>
                <label className="form-label">Apellido:</label>
                <input type="text" className="form-control" name="apellido"  onChange={actualizarState}/>
                <label className="form-label">Cargo:</label>
                <input type="text" className="form-control" name="cargo"  onChange={actualizarState}/>
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" name="email"  onChange={actualizarState}/>
                <button type='submit' className='btn btn-success mt-2'>Cargar</button>
            </form>





        </Fragment>
    )

}
export default NuevoEmpleado;
