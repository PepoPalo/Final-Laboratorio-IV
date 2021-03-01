from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.adiciones_repo import AdicionesRepo

repo = AdicionesRepo()

nsAdicion = Namespace('adiciones', description='Administrador de adiciones')
modeloAdicionSinN = Model('AdicionSinNumero',{
    'mesa': fields.Integer(),
    'fecha': fields.String(),
    'nro_mozo': fields.Integer()
})

modeloAdicion = modeloAdicionSinN.clone('Adicion', {
    'id': fields.Integer()
})

modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.String(),
    'hasta': fields.String()
})

modeloBusquedaConMozo = modeloBusqueda.clone('BusquedaFechasMozo', {
    'nro_mozo': fields.Integer()
})

nsAdicion.models[modeloAdicion.name] = modeloAdicion
nsAdicion.models[modeloAdicionSinN.name] = modeloAdicionSinN
nsAdicion.models[modeloBusqueda.name] = modeloBusqueda
nsAdicion.models[modeloBusquedaConMozo.name] = modeloBusquedaConMozo

nuevaAdicionParser = reqparse.RequestParser(bundle_errors=True)
nuevaAdicionParser.add_argument('mesa', type=int, required=True)
nuevaAdicionParser.add_argument('fecha', type=str, required=True)
nuevaAdicionParser.add_argument('nro_mozo', type=int, required=True)

editarAdicionParser = nuevaAdicionParser.copy()
editarAdicionParser.add_argument('id', type=int, required=True)

buscarAdicionesParser = reqparse.RequestParser(bundle_errors=True)
buscarAdicionesParser.add_argument('desde', type=str, required=True)
buscarAdicionesParser.add_argument('hasta', type=str, required=True)

buscarAdicionesConMozoParser = buscarAdicionesParser.copy()
buscarAdicionesConMozoParser.add_argument('nro_mozo', type=int, required=True)

@nsAdicion.route('/')
class AdicionesResource(Resource):
    @nsAdicion.marshal_list_with(modeloAdicion)
    def get(self):
        return repo.get_all()

    @nsAdicion.expect(modeloAdicionSinN)
    @nsAdicion.marshal_with(modeloAdicion)
    def post(self):
        data = nuevaAdicionParser.parse_args()
        f = repo.agregar(data)
        if f:
            return f, 201
        abort(500)

@nsAdicion.route('/<int:id>')
class AdicionesResource(Resource):
    @nsAdicion.marshal_with(modeloAdicion)
    def get(self, id):
        f = repo.get_by_id(id)
        if f:
            return f, 200
        abort(404)

    def delete(self, id):
        if repo.borrar(id):
            return 'Adicion borrada', 200
        abort(400)
    
    @nsAdicion.expect(modeloAdicion)
    def put(self, id):
        data = editarAdicionParser.parse_args()
        if repo.modificar(id, data):
            return 'Adicion modificada', 200
        abort(404)

@nsAdicion.route('/buscar')
class AdicionesResource(Resource):
    # """
    # Busca adiciones con las fechas, el formato es: YYYY-MM-DD
    # """
    @nsAdicion.expect(modeloBusqueda)
    @nsAdicion.marshal_list_with(modeloAdicion)
    def get(self):
        data = buscarAdicionesParser.parse_args()
        if repo.buscar(data):
            return 'Lista de adiciones por fechas', 200
        abort()
