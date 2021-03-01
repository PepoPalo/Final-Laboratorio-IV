from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from infraestructura.productos_repo import ProductosRepo

repo = ProductosRepo()

nsProducto = Namespace('productos', description='Administrador de productos')

modeloProductoSinID = Model('ProductoSinCod',{
    'tipo': fields.String(),
    'descripcion': fields.String(),
    'porcentaje_ganancia': fields.Integer(),
    'costo': fields.Float()
})

modeloProducto = modeloProductoSinID.clone('Producto',{
    'codigo': fields.Integer(),

})

nsProducto.models[modeloProducto.name] = modeloProducto
nsProducto.models[modeloProductoSinID.name] = modeloProductoSinID

nuevoProductoParser = reqparse.RequestParser(bundle_errors=True)
nuevoProductoParser.add_argument('tipo', type=str, required=True)
nuevoProductoParser.add_argument('descripcion', type=str)
nuevoProductoParser.add_argument('costo', type=float)
nuevoProductoParser.add_argument('porcentaje_ganancia', type=int, required=True)

editarProductoParser = nuevoProductoParser.copy()
editarProductoParser.add_argument('codigo',type=int, required=True)

@nsProducto.route('/')
class ProductoResource(Resource):
    @nsProducto.marshal_list_with(modeloProducto)
    def get(self):
        return repo.get_all()

    @nsProducto.expect(modeloProductoSinID)
    @nsProducto.marshal_with(modeloProducto)
    def post(self):
        data = nuevoProductoParser.parse_args()
        p = repo.agregar(data)
        if p:
            return p, 200
        abort(500)

@nsProducto.route('/<int:id>')
class ProductoResource(Resource):
    @nsProducto.marshal_with(modeloProducto)
    def get(self, id):
        p = repo.get_by_id(id)
        if p:
            return p, 200
        abort(404)
    
    def delete(self, id):
        if repo.borrar(id):
            return 'Producto Eliminado', 200
        abort(400)
    
    @nsProducto.expect(modeloProducto)
    def put(self, id):
        data = editarProductoParser.parse_args()
        if repo.modificar(id,data):
            return 'Producto actualizado', 200
        abort(404)