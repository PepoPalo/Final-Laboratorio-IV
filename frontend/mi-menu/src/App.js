import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { ProductoListado } from './componentes/producto/ProductoListado.js';
import { ProductoForm } from "./componentes/producto/ProductoForm.js";

import { MozoListado } from "./componentes/mozo/MozoListado.js";
import { MozoForm } from "./componentes/mozo/MozoForm.js";

// import { FacturaForm } from "./componentes/factura/FacturaForm.js";
// import { FacturaListado } from "./componentes/factura/FacturaListado.js";
// import { FacturaDetalle } from "./componentes/factura/FacturaDetalle.js";

import { DetalleForm } from "./componentes/detalle/DetalleForm.js"

export default function App() {
  return (
    <div className="container">
      <Router>
        <div className="App">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link active" to="/mozos">Mozos</Link>
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
                                                              
          <Route path="/mozos/nuevo" component={MozoForm}></Route>
          <Route path="/mozos/:id" component={MozoForm}></Route>
          <Route path="/mozos" component={MozoListado}></Route>

          <Route path="/productos/nuevo" component={ProductoForm}></Route>
          <Route path="/productos/:id" component={ProductoForm} ></Route>
          <Route path="/productos" component={ProductoListado}></Route>

          {/* <Route path="/factura/:id:activador" component={FacturaDetalle}></Route>

          <Route path="/facturas/nueva" component={FacturaForm}></Route>
          <Route path="/facturas/:id" component={FacturaForm}></Route>
          <Route path="/facturas" component={FacturaListado}></Route>
  */}
          <Route path="/producto/:id" component={DetalleForm}></Route>

        </Switch>
      </Router >
    </div>
  );
}

