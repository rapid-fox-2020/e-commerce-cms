# e-commerce-cms

## E-Commerce CMS App Server

E-Commerce CMS (Content Management System) is a web application that 
managed all contents in E-Commerce system, usually operated by E-Commerce admins.

This app has :
- RESTful endpoint for E-Commerce CMS CRUD operation
- JSON formatted response


## Products RESTful endpoints: 
## GET /products
Get all products

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```   

- Request Body:
```json
  not needed
```

- Response (200 - OK):
```json
[
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-07-21T07:15:12.149Z",
    "updatedAt": "2020-07-21T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-07-21T07:15:15.149Z",
    "updatedAt": "2020-07-21T07:15:15.149Z",
  }
]
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid request"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## POST /products
Create new product

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
}
```

- Response (201 - Created):
```json
{
    "product": {
        "id": "<given id by system>",
        "name": "<posted name>",
        "image_url": "<posted image_url>",
        "price": "<posted price>",
        "stock": "<posted stock>",
        "createdAt": "2020-07-21T07:17:12.149Z",
        "updatedAt": "2020-07-21T07:17:12.149Z"
    }
}   
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## GET /products/:id
Get a product data by request id params

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
  not needed
```

- Response (200 - OK):
```json
{
    "id": 1,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-07-21T07:15:12.149Z",
    "updatedAt": "2020-07-21T07:15:12.149Z",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid Request"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Product with ID: <req.params.id> is not found!"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## PUT /products/:id
Update product by request id params

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
{
    "name": "<name value to be updated>",
    "image_url": "<image_url value to be updated>",
    "price": "<price value to be updated>",
    "stock": "<stock value to be updated>",
}
```

- Response (200 - OK):
```json
{
    "message": "Succesfully Updated Todo!",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Product is not found!"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## DELETE /products/:id
Delete product by request id params

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
    not needed
```

- Response (200 - OK):
```json
{
    "message": "Succesfully Deleted Product!",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Product with ID: <req.params.id> is not found!"
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"
}
```

## Users RESTful endpoints: 

## POST /users/login
login to user's account

- Request Header
```json
    not needed
```

- Request Body
```json
{
    "email": "<email user>",
    "password": "<password user>"
}
```

- Response (200 - OK)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXlhbmFAZW1haWwuY29tIiwibmFtZSI6Im1heWEiLCJpYXQiOjE1OTQzNjQxNTB9.RgwDwM4MYu5_6x1nQrJ_CKj44-WkR32ZM6_dBZItp9w"
}
```

- Response (400 - Bad Request)
```json
{
    "errors": [ { "message": "Invalid email/password"} ]
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"    
}
```