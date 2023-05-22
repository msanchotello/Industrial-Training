from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from typing import Optional
from sqlalchemy.orm import Session
from . import models
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# returns a homepage for testing purposes
@app.get("/")
def get_homepage():
    with open("./app/html/test.html", "r") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content, status_code=200)



# returns all the different products
@app.get("/products")
def get_products(db: Session = Depends(get_db), limit: Optional[int] = 10, skip: Optional[int] = 0, search: Optional[str] = ""):
    
    products = db.query(models.Product).filter(models.Product.name.contains(search)).limit(limit).offset(skip).all()
    
    # for p in products:
    #     p.category
    #     for v in p.variants:
    #         v.supermarket

    return {"products": products}



# returns one product with the specified product id
@app.get("/products/{id}")
def get_product(id: int, response: Response, db: Session = Depends(get_db)):
    
    product = db.query(models.Product).filter(models.Product.ID == id).first()
    product.category
    
    for v in product.variants:
        v.supermarket

    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"product with id {id} was not found")
    
    return {"product": product}



# returns all products belonging to a certain category (1 = drinks, 2 = vegetables, 3 = meats ..)
@app.get("/products/categories/{catID}")
def get_products(catID: int, db: Session = Depends(get_db), limit: Optional[int] = 10, search: Optional[str] = ""):
    
    products_query = db.query(models.Product).filter(models.Product.catID == catID)
    products = products_query.filter(models.Product.name.contains(search)).limit(limit).all()

    if not products_query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"category with id {catID} was not found")
    
    return {"products": products}



# returns all variations of the specified product sorted by price in ascending order
@app.get("/products/variations/{id}")
def get_variations(id: int, response: Response, db: Session = Depends(get_db), limit: Optional[int] = 10, skip: Optional[int] = 0):
    
    variations = db.query(models.Variant).filter(models.Variant.ProID == id).order_by(models.Variant.price).limit(limit).offset(skip).all()
    for v in variations:
        v.supermarket

    if not variations:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"product with id {id} was not found")
    
    return {"variations": variations}