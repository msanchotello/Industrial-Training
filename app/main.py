from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
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

app.mount("/static", StaticFiles(directory="static"), name="static")



# returns the homepage
@app.get("/")
def get_homepage():
    with open("static/html/PaginaInicial.html", "r") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content, status_code=200)



# returns all the different products
@app.get("/products")
def get_products(db: Session = Depends(get_db), limit: Optional[int] = 20, skip: Optional[int] = 0, search: Optional[str] = ""):
    
    products = db.query(models.Product).filter(models.Product.name.contains(search)).offset(skip).limit(limit).all()
    
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
def get_products(catID: int, db: Session = Depends(get_db), limit: Optional[int] = 25, skip: Optional[int] = 0, search: Optional[str] = ""):
    
    products_query = db.query(models.Product).filter(models.Product.catID == catID)
    products = products_query.filter(models.Product.name.contains(search)).order_by(models.Product.EAN).offset(skip).limit(limit).all()

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



# returns a google maps based on the area.
@app.get("/maps/{area}")
def get_map(area: str, response: Response):
    
    if area == "helsinki":
        url = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31738.75077048616!2d24.932495627957195!3d60.18616242634652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sHelsinki%20supermarkets!5e0!3m2!1ses!2sfi!4v1685012683752!5m2!1ses!2sfi\" width=\"100%\" height=\"350\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    elif area == "vantaa":
        url = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d61108.53710359107!2d24.87627548935341!3d60.29677515636218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sVantaa%20supermarkets!5e0!3m2!1ses!2sfi!4v1685012749093!5m2!1ses!2sfi\" width=\"100%\" height=\"350\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    elif area == "espoo":
        url = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d126898.99942255983!2d24.557142083092582!3d60.200644549222936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1salepa%20and%20kmarket%20%20espoo!5e0!3m2!1ses-419!2sfi!4v1684690940056!5m2!1ses-419!2sfi\" width=\"100%\" height=\"350\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    else:
        url = None

    if not url:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"{area} was not found")
    
    return {"link": url}