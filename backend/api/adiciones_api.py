from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.adiciones_repo import AdicionesRepo

repo = AdicionesRepo()

nsAdicion = Namespace('adiciones', description='Administrador de adiciones')
modeloAdicionSinN = Model('AdicionSinNumero',{
    'mesa': fields.Integer(),
    'porcentaje_venta': fields.Float(),
    'fecha': fields.Date(),
    'nro_mozo': fields.Integer(),
    'cerrada': fields.Boolean()
})

modeloAdicion = modeloAdicionSinN.clone('Adicion', {
    'numero': fields.Integer()
})

modeloBusqueda = Model('BusquedaFechas', {
    'desde': fields.Date(),
    'hasta': fields.Date()
})

nsAdicion.models[modeloAdicion.name] = modeloAdicion
nsAdicion.models[modeloAdicionSinN.name] = modeloAdicionSinN
nsAdicion.models[modeloBusqueda.name] = modeloBusqueda

nuevaAdicionParser = reqparse.RequestParser(bundle_errors=True)
nuevaAdicionParser.add_argument('mesa', type=int, required=True)
nuevaAdicionParser.add_argument('porcentaje_venta', type=float, required=True)
nuevaAdicionParser.add_argument('fecha', type=str, required=True)
nuevaAdicionParser.add_argument('nro_mozo', type=int, required=True)
nuevaAdicionParser.add_argument('cerrada', type=bool, required=False)

editarAdicionParser = nuevaAdicionParser.copy()
editarAdicionParser.add_argument('numero', type=int, required=True)

buscarAdicionesParser = reqparse.RequestParser(bundle_errors=True)
buscarAdicionesParser.add_argument('desde', type=str, required=True)
buscarAdicionesParser.add_argument('hasta', type=str, required=True)


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

@nsAdicion.route('/<int:numero>')
class AdicionesResource(Resource):
    @nsAdicion.marshal_with(modeloAdicion)
    def get(self, numero):
        f = repo.get_by_numero(numero)
        if f:
            return f, 200
        abort(404)

    def delete(self, numero):
        if repo.borrar(numero):
            return 'Adicion borrada', 200
        abort(400)
    
    @nsAdicion.expect(modeloAdicion)
    def put(self, numero):
        data = editarAdicionParser.parse_args()
        if repo.modificar(numero, data):
            return 'Adicion modificada', 200
        abort(404)

@nsAdicion.route('/buscar')
class AdicionesResource(Resource):
    # """
    # Busca adiciones con las fechas, el formato es: YYYY-MM-DD
    # """
    @nsAdicion.expect(modeloBusqueda)
    @nsAdicion.marshal_list_with(modeloAdicion)
    def put(self):
        data = buscarAdicionesParser.parse_args()
        l = repo.buscar(data)
        if l:
            return l, 200
        abort()

@nsAdicion.route('/buscar/<int:mozo>')
class AdicionesResource(Resource):
    # """
    # Busca adiciones con las fechas, el formato es: YYYY-MM-DD
    # """
    @nsAdicion.expect(modeloBusqueda)
    @nsAdicion.marshal_list_with(modeloAdicion)
    def put(self, mozo):
        data = buscarAdicionesParser.parse_args()
        l = repo.buscar_by_mozo(data, mozo)
        if l:
            return l, 200
        abort()
