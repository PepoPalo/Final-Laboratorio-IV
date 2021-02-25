from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.Mozos_repo import MozosRepo

repo = MozosRepo()

nsMozo = Namespace('mozos', description='Administrador de mozo')

modeloMozoSinID = Model('MozoSinID',{
    'nombre': fields.String()
})

modeloMozo = modeloMozoSinID.clone('Mozo',{
    'numero': fields.Integer()
})


nsMozo.models[modeloMozo.name] = modeloMozo
nsMozo.models[modeloMozoSinID.name] = modeloMozoSinID

nuevoMozoParser = reqparse.RequestParser(bundle_errors=True)
nuevoMozoParser.add_argument('nombre', type=str, required=True)

editarMozoParser = nuevoMozoParser.copy()
editarMozoParser.add_argument('id', type=int, required=True)

@nsMozo.route('/')
class MozosResource(Resource):
    @nsMozo.marshal_list_with(modeloMozo)
    def get(self):
        return repo.get_all()
    
    
    @nsMozo.expect(modeloMozoSinID)
    @nsMozo.marshal_with(modeloMozo)
    def post(self):
        data = nuevoMozoParser.parse_args()
        mozo = repo.agregar(data)
        if mozo:
            return mozo, 201
        abort(500)

@nsMozo.route('/<int:id>')
class MozosResource(Resource):
    @nsMozo.marshal_with(modeloMozo)
    def get(self, id):
        mozo = repo.get_by_id(id)
        if mozo:
            return mozo, 200
        abort(404)

    def delete(self, id):
        if repo.borrar(id):
            return 'Mozo borrado', 200
        abort(400)

    @nsMozo.expect(modeloMozo)
    def put(self, id):
        data = editarMozoParser.parse_args()
        if repo.modificar(id, data):
            return 'Mozo actualizado', 200
        abort(404)