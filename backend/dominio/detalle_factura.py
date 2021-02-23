from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datos import db
from dominio.factura import Factura
from dominio.producto import Producto

class DetalleFactura(db.Model):
    __tablename__ = 'dfacturas'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    factura_numero = Column(Integer(), ForeignKey('facturas.numero'), nullable=False)
    factura = relationship('Factura')
    producto_codigo = Column(Integer(), ForeignKey('producto.codigo'), nullable=False)
    producto = relationship('Producto')
    cantidad = Column(Integer(), nullable=False)