# FastAPI


Receive data by sending GET requests to the website domain:

Below are all the different operations and their functionalities:



----------------------------------------------------------------------
# ourwebsite.com/products
- returns all the products
- additional parameters: .../products?search=keyword and .../products?limit=X
- search=keyword returns all products matching the "keyword" string, and limit=X returns the first X products (where X is an integer, default is 20)

For example, GET request to **ourwebsite.com/products?search=smoothie&limit=2** returns:

{
    "products": [
        {
            "brand": "Marli",
            "name": "Marli Marjainen smoothie + D&C -vitamiinit 2,5 dl",
            "ID": 1,
            "catID": 1,
            "EAN": 6415130036913
        },
        {
            "brand": "Froosh",
            "name": "Fazer Froosh Hedelmäsmoothie 250 ml Mango ja Appelsiini",
            "ID": 2,
            "catID": 1,
            "EAN": 7350020720017
        }
    ]
}





----------------------------------------------------------------------
# ourwebsite.com/products/{ID}
- returns product with specific product ID (includes all variations of said product)
(variants list will contain all the different variants of this product, such as at which supermarket it is being sold at and at what price)

Example return when sending a GET request to **ourwebsite.com/products/1**:

{
    "product": {
        "brand": "Marli",
        "name": "Marli Marjainen smoothie + D&C -vitamiinit 2,5 dl",
        "ID": 1,
        "catID": 1,
        "EAN": 6415130036913,
        "category": {
            "name": "Drink",
            "CatID": 1
        },
        "variants": [
            {
                "price": 2.0,
                "ProID": 1,
                "VarID": 1,
                "SupID": 2,
                "supermarket": {
                    "name": "K-market",
                    "supID": 2
                }
            },
            {
                "price": 3.0,
                "ProID": 1,
                "VarID": 3,
                "SupID": 2,
                "supermarket": {
                    "name": "K-market",
                    "supID": 2
                }
            }
        ]
    }
}




----------------------------------------------------------------------
# ourwebsite.com/products/categories/{catID}
- returns all the products belonging to a certain category (replace {catID} with the ID of the category)
(The category IDs are not finished yet)

Example return when calling **ourwebsite.com/products/categories/1?limit=3** (drinks):
(also includes the limit and search functions)

{
    "products": [
        {
            "brand": "Marli",
            "name": "Marli Marjainen smoothie + D&C -vitamiinit 2,5 dl",
            "ID": 1,
            "catID": 1,
            "EAN": 6415130036913
        },
        {
            "brand": "Froosh",
            "name": "Fazer Froosh Hedelmäsmoothie 250 ml Mango ja Appelsiini",
            "ID": 2,
            "catID": 1,
            "EAN": 7350020720017
        },
        {
            "brand": "Mehustamo",
            "name": "Mehustamo supersankari omena-mango-avokado-pinaatti smoothie 500ml",
            "ID": 3,
            "catID": 1,
            "EAN": 7340191117891
        }
    ]
}



----------------------------------------------------------------------
# ourwebsite.com/products/variations/{ID}
- returns all the variations of a specific product 

{
    "variations": [
        {
            "price": 2.0,
            "ProID": 1,
            "VarID": 1,
            "SupID": 2,
            "supermarket": {
                "name": "K-market",
                "supID": 2
            }
        },
        {
            "price": 3.0,
            "ProID": 1,
            "VarID": 3,
            "SupID": 2,
            "supermarket": {
                "name": "K-market",
                "supID": 2
            }
        }
    ]
}


