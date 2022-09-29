import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function NuevoInsumo(){
    const navigate = useNavigate();
    //iniciar vacio el insumo y poner los datos que se van a guardar
    const [insumo, guardarInsumos] = useState({
        codigoInsumo: '',
        nombre:''
    });
   //guardar lo que se va escribiendo
    const actualizarState = e =>{
        guardarInsumos({
            ...insumo,
            [e.target.name]: e.target.value
        })
    }
    //todo guardar insumo
    const agregarInsumo = e => 
    {
        e.preventDefault();
    
        //enviar peticion post
        clienteAxios.post('/insumos', insumo)
        .then(res=>{
            if(res.data.code ===11000){
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Error en la carga de insumo'
                })
            }else{
                Swal.fire(
                    'Bien hecho',
                    res.data.mensaje,
                    'success'
                )
            }
            navigate('/insumos')
        })
    }




    return(
        <Fragment>
        <h2>Nuevo Insumo</h2>
        
            <form onSubmit={agregarInsumo} className='col-md-6' >
                <label className="form-label">Codigo:</label>
                <input type="number" className="form-control" name="codigoInsumo" onChange={actualizarState}/>
                <label className="form-label">Nombre:</label>
                <input type="text" className="form-control" name="nombre"  onChange={actualizarState}/>

                <button type='submit' className='btn btn-success mt-2'>Cargar</button>
            </form>





        </Fragment>
    )

}
export default NuevoInsumo;
