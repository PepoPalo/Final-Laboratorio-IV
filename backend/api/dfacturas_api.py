from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.dfacturas_repo import DFacturasRepo

repo = DFacturasRepo()

nsDFactura = Namespace('dfactura', description= 'Administrador de detalle')
modeloDetalleFacturaSinNum = Model('DFacturaSinNumero',{
    'factura_numero': fields.Integer(),
    'producto_codigo': fields.Integer(),
    'cantidad': fields.Integer()
})

modeloDetalleFactura = modeloDetalleFacturaSinNum.clone('DFactura', {
    'id': fields.Integer()
})

nsDFactura.models[modeloDetalleFacturaSinNum.name] = modeloDetalleFacturaSinNum
nsDFactura.models[modeloDetalleFactura.name] = modeloDetalleFactura

nuevoDetalleParser = reqparse.RequestParser(bundle_errors=True)
nuevoDetalleParser.add_argument('factura_numero', type=int, required=True)
nuevoDetalleParser.add_argument('producto_codigo', type=int, required=True)
nuevoDetalleParser.add_argument('cantidad', type=int, required=True)

editarDetalleParser = nuevoDetalleParser.copy()
editarDetalleParser.add_argument('id', type=int, required=True)

@nsDFactura.route('/')
class DFacturaResource(Resource):
    @nsDFactura.marshal_list_with(modeloDetalleFactura)
    def get(self):
        return repo.get_all()

    @nsDFactura.expect(modeloDetalleFacturaSinNum)
    @nsDFactura.marshal_with(modeloDetalleFactura)
    def post(self):
        data = nuevoDetalleParser.parse_args()
        df = repo.agregar(data)
        if df:
            return df, 201
        abort(500)

@nsDFactura.route('/<int:id>')
class DFacturaResource(Resource):
    @nsDFactura.marshal_with(modeloDetalleFactura)
    def get(self, id):
        df = repo.get_by_id(id)
        if df:
            return df, 200
        abort(400)

    def delete(self, id):
        if repo.borrar(id):
            return 'Factura borrada', 200
        abort(400)

    @nsDFactura.expect(modeloDetalleFactura)
    def put(self, id):
        data = editarDetalleParser.parse_args()
        if repo.modificar(id,data):
            return 'Detalle Factura modificada', 200
        abort(404)