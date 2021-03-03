from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.detalle_repo import DetallesRepo

repo = DetallesRepo()

nsDetalle = Namespace('detalle', description= 'Administrador de detalle')
modeloDetalleSinNum = Model('DetalleSinNumero',{
    'adicion_numero': fields.Integer(),
    'producto_codigo': fields.Integer(),
    'cantidad': fields.Integer()
})

modeloDetalle = modeloDetalleSinNum.clone('Detalle', {
    'id': fields.Integer()
})

nsDetalle.models[modeloDetalleSinNum.name] = modeloDetalleSinNum
nsDetalle.models[modeloDetalle.name] = modeloDetalle

nuevoDetalleParser = reqparse.RequestParser(bundle_errors=True)
nuevoDetalleParser.add_argument('adicion_numero', type=int, required=True)
nuevoDetalleParser.add_argument('producto_codigo', type=int, required=True)
nuevoDetalleParser.add_argument('cantidad', type=int, required=True)

editarDetalleParser = nuevoDetalleParser.copy()
editarDetalleParser.add_argument('id', type=int, required=True)

@nsDetalle.route('/')
class DetalleResource(Resource):
    @nsDetalle.marshal_list_with(modeloDetalle)
    def get(self):
        return repo.get_all()

    @nsDetalle.expect(modeloDetalleSinNum)
    @nsDetalle.marshal_with(modeloDetalle)
    def post(self):
        data = nuevoDetalleParser.parse_args()
        df = repo.agregar(data)
        if df:
            return df, 201
        abort(500)

@nsDetalle.route('/<int:id>')
class DetalleResource(Resource):
    @nsDetalle.marshal_with(modeloDetalle)
    def get(self, id):
        df = repo.get_by_id(id)
        if df:
            return df, 200
        abort(400)

    def delete(self, id):
        if repo.borrar(id):
            return 'Detalle borrado', 200
        abort(400)

    @nsDetalle.expect(modeloDetalle)
    def put(self, id):
        data = editarDetalleParser.parse_args()
        if repo.modificar(id,data):
            return 'Detalle modificada', 200
        abort(404)