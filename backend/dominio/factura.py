from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datos import db
from dominio.cliente import Cliente

class Factura(db.Model):
    __tablename__ = 'facturas'
    numero = Column(Integer(), primary_key=True, autoincrement=True)
    tipo = Column(String(80), nullable=False)
    punto_venta = Column(Integer(), nullable=False)
    fecha = Column(String(20), nullable=False)
    cliente_id = Column(Integer(), ForeignKey('clientes.id'), nullable=False)
    cliente = relationship('Cliente')
    
    
    