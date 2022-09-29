import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function NuevoLocal(){
    const navigate = useNavigate();
    //iniciar vacio el insumo y poner los datos que se van a guardar
    const [local, guardarLocal] = useState({
        nombre:'',
        direccion:'',
        telefono: ''
    });
   //guardar lo que se va escribiendo
    const actualizarState = e =>{
        guardarLocal({
            ...local,
            [e.target.name]: e.target.value
        })
    }
    //todo guardar insumo
    const agregarLocal = e => 
    {
        e.preventDefault();
    
        //enviar peticion post
        clienteAxios.post('/locales', local)
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
            navigate('/locales')
        })
    }




    return(
        <Fragment>
        <h2>Nuevo local</h2>
        
            <form onSubmit={agregarLocal} className='col-md-6' >
                <label className="form-label">Nombre:</label>
                <input type="text" className="form-control" name="nombre" onChange={actualizarState}/>
                <label className="form-label">Direccion:</label>
                <input type="text" className="form-control" name="direccion"  onChange={actualizarState}/>
                <label className="form-label">Telefono:</label>
                <input type="number" className="form-control" name="telefono"  onChange={actualizarState}/>
                <button type='submit' className='btn btn-success mt-2'>Cargar</button>
            </form>





        </Fragment>
    )

}
export default NuevoLocal;
