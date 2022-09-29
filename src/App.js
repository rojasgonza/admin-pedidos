import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditarEmpleado from './componentes/Empleados/editarEmpleado';
import Empleados from './componentes/Empleados/Empleados';
import NuevoEmpleado from './componentes/Empleados/nuevoEmpleado';
import EditarInsumo from './componentes/Insumos/editarInsumo';

//RECORDAR QUE ES AXIOS


// insumos
import Insumos from './componentes/Insumos/Insumos';
import NuevoInsumo from './componentes/Insumos/nuevoInsumo';

import Header from './componentes/layout/Header';
import EditarLocal from './componentes/Locales/editarLocal';
import Locales from './componentes/Locales/Locales';
import NuevoLocal from './componentes/Locales/nuevoLocal';
import NuevoPedido from './componentes/Pedidos/nuevoPedido';
import Pedidos from './componentes/Pedidos/Pedidos';
import Pedido from './componentes/Pedidos/Pedido';
function App() {
  return (
    <Router>
      <Fragment>

        <Header />
        <div className='container'>
          <Routes >
            <Route path="/insumos" element={<Insumos/>}/>
            <Route path="/nuevo-insumo" element={<NuevoInsumo/>}/>
            <Route path='/insumos/editar/:id' element={<EditarInsumo/>}/>

            <Route path='/empleados' element={<Empleados/>}/>
            <Route path='/nuevo-empleado' element={<NuevoEmpleado/>}/>
            <Route path='/empleados/editar/:id' element={<EditarEmpleado/>}/>

            <Route path='/locales' element={<Locales/>}/>
            <Route path="/nuevo-local" element={<NuevoLocal/>}/>
            <Route path='/locales/editar/:id' element={<EditarLocal/>}/>
            
            <Route path='/pedidos' element={<Pedidos/>}/>
            <Route path='/nuevo-pedido' element={<NuevoPedido/>}/>
            <Route path='/pedidos/:id' element={<Pedido/>}/>

          </Routes>
          </div>
      </Fragment>
    </Router>
  )
}

export default App;
