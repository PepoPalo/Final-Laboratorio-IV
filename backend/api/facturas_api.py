from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.facturas_repo import FacturasRepo

repo = FacturasRepo()

nsFactura = Namespace('facturas', description='Administrador de facturas')
modeloFacturaSinN = Model('FacturaSinNumero',{
    'tipo': fields.String(),
    'punto_venta': fields.Integer(),
    'fecha': fields.String(),
    'cliente_id': fields.Integer()
})

modeloFactura = modeloFacturaSinN.clone('Factura', {
    'numero': fields.Integer()
})

nsFactura.models[modeloFactura.name] = modeloFactura
nsFactura.models[modeloFacturaSinN.name] = modeloFacturaSinN

nuevaFacturaParser = reqparse.RequestParser(bundle_errors=True)
nuevaFacturaParser.add_argument('tipo', type=str, required=True)
nuevaFacturaParser.add_argument('punto_venta', type=int, required=True)
nuevaFacturaParser.add_argument('fecha', type=str, required=True)
nuevaFacturaParser.add_argument('cliente_id', type=int, required=True)

editarFacturaParser = nuevaFacturaParser.copy()
editarFacturaParser.add_argument('numero', type=int, required=True)

@nsFactura.route('/')
class FacturasResource(Resource):
    @nsFactura.marshal_list_with(modeloFactura)
    def get(self):
        return repo.get_all()

    @nsFactura.expect(modeloFacturaSinN)
    @nsFactura.marshal_with(modeloFactura)
    def post(self):
        data = nuevaFacturaParser.parse_args()
        f = repo.agregar(data)
        if f:
            return f, 201
        abort(500)

@nsFactura.route('/<int:id>')
class FacturasResource(Resource):
    @nsFactura.marshal_with(modeloFactura)
    def get(self, id):
        f = repo.get_by_id(id)
        if f:
            return f, 200
        abort(404)

    def delete(self, id):
        if repo.borrar(id):
            return 'Factura borrada', 200
        abort(400)
    
    @nsFactura.expect(modeloFactura)
    def put(self, id):
        data = editarFacturaParser.parse_args()
        if repo.modificar(id, data):
            return 'Factura modificada', 200
        abort(404)