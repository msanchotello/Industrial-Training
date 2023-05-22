from sqlalchemy import Column, ForeignKey, Integer, String, REAL
from sqlalchemy.orm import relationship

from .database import Base



class Product(Base):
    __tablename__ = "Products"

    ID = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    catID = Column(Integer, ForeignKey("Categories.CatID"))
    EAN = Column(Integer, nullable=False)

    category = relationship("Category", back_populates="products")
    variants = relationship("Variant", back_populates="product")



class Supermarket(Base): 
    __tablename__ = "Supermarkets"

    supID = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    variant = relationship("Variant", back_populates="supermarket")



class Category(Base):
    __tablename__ = "Categories"

    CatID = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    products = relationship("Product", back_populates="category")



class Variant(Base):
    __tablename__ = "Variants"

    VarID = Column(Integer, primary_key=True)
    ProID = Column(Integer, ForeignKey("Products.ID"))
    price = Column(REAL, nullable=False)
    SupID = Column(Integer, ForeignKey("Supermarkets.supID"))

    product = relationship("Product", back_populates="variants")
    supermarket = relationship("Supermarket", back_populates="variant")
    
