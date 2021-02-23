from flask import Flask
from flask_restx import Api
from flask_cors import CORS

from datos import db

from api.clientes_api import nsCliente
from api.productos_api import nsProducto
from api.facturas_api import nsFactura
from api.dfacturas_api import nsDFactura

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Yegua2020@localhost/lab4"
CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()


api = Api(app, version='1.0.beta', title='Factura ACME', description='Administracion de facturas')

api.add_namespace(nsCliente)
api.add_namespace(nsProducto)
api.add_namespace(nsFactura) 
api.add_namespace(nsDFactura)

if __name__ == '__main__':
    app.run()