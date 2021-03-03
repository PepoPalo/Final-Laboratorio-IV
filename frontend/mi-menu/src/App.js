import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { ProductoListado } from './componentes/producto/ProductoListado.js';
import { ProductoForm } from "./componentes/producto/ProductoForm.js";

// import { ClienteListado } from "./componentes/cliente/ClienteListado.js";
// import { ClienteForm } from "./componentes/cliente/ClienteForm.js";

// import { FacturaForm } from "./componentes/factura/FacturaForm.js";
// import { FacturaListado } from "./componentes/factura/FacturaListado.js";
// import { FacturaDetalle } from "./componentes/factura/FacturaDetalle.js";

// import { DProductoForm } from "./componentes/dfactura/DProductosForm.js"

export default function App() {
  return (
    <div className="container">
      <Router>
        <div className="App">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link active" to="/clientes">Clientes</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link active" to="/productos">Productos</Link>

            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link active" to="/facturas">Facturas</Link>

            </li>

          </ul>
        </div>
        <Switch>
                                                              
          {/* <Route path="/clientes/nuevo" component={ClienteForm}></Route>
          <Route path="/clientes/:id" component={ClienteForm}></Route>
          <Route path="/clientes" component={ClienteListado}></Route> */}

          <Route path="/productos/nuevo" component={ProductoForm}></Route>
          <Route path="/productos/:id" component={ProductoForm} ></Route>
          <Route path="/productos" component={ProductoListado}></Route>

          {/* <Route path="/factura/:id:activador" component={FacturaDetalle}></Route>

          <Route path="/facturas/nueva" component={FacturaForm}></Route>
          <Route path="/facturas/:id" component={FacturaForm}></Route>
          <Route path="/facturas" component={FacturaListado}></Route>

          

          <Route path="/producto/:id" component={DProductoForm}></Route> */}

        </Switch>
      </Router >
    </div>
  );
}

