from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from datos import db
# from dominio.factura import Factura
# from dominio.producto import Producto

class Detalle(db.Model):
    __tablename__ = 'detalles'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    adicion_numero = Column(Integer(), ForeignKey('adicion.numero', ondelete=True), nullable=False)
    producto_codigo = Column(Integer(), ForeignKey('producto.codigo', ondelete=True), nullable=False)
    porcentaje_venta = Column(Numeric)
    cantidad = Column(Integer(), nullable=False)
