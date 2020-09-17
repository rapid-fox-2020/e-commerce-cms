## E-Commerce CMS
E-Commerce CMS is an server-side / admin-side application to manage E-Commerce client-side. This app has:

RESTful endpoint for Product CRUD Operation
Used Technology :
Express Js,
Sequelize,
Postgres,
Jest (JS Testing Framework)
Json Web Token,
Bcrypt
JSON Formated Response

## RESTful endpoints

### Global Response
_Response (500 - Error)_
```
{
  "message": "Internal Server Error"
}
```
Response (401 - Unauthorized)
```
    {
        "message": "Not authroized to do the actions"
    }
```
### GET /products
_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```
_Response (200)_
```
[
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<product name>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }, ...
]
```
_Response (400)_
```
{
  "message": "Bad Request"
}
```

### GET /products/:id
_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```
_Response (200)_
```
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```
_Response (404 - Not Found)_
```
    {
        "message": "product not found"
    }
```
### POST /products

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
    {
        "name": "<product name to get insert into>",
        "image_url": "<product_url_img to get insert into>",
        "price": "<product price to get insert into>",
        "stock": "<product stock to get insert into>"
    }
```
_Response (201 - Created)_
```
    {
        "id": <given id by system>,
        "name": "<posted product name>",
        "image_url": "<posted url_img>",
        "price": "<posted product price>",
        "stock": "<posted product stock>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
```
_Response (400 - Bad Request)_
```
{
  "message": "name cannot be empty!" || image_url cannot be empty! || price cannot be empty! || stock cannot be empty!
}
```

### PUT /products/:id

_Request Header_
```
{
  "token": "<your access token>"
}
```
_Request Body_
```
    {
        "name": "<product name to get insert into>",
        "image_url": "<product_url_img to get insert into>",
        "price": "<product price to get insert into>",
        "stock": "<product stock to get insert into>"
    }
```

_Response (200)_
```
    {
        "name": "<posted name to get insert into>",
        "image_url": "<posted_url_img to get insert into>",
        "price": "<posted price to get insert into>",
        "stock": "<posted stock to get insert into>"
    }
```
_Response (400 - Bad Request)_
```
    {
        "message": "name cannot be empty!" || image_url cannot be empty! || price cannot be empty! || stock cannot be empty!
    }
```
_Response (404 - Not Found)_
```
    {
        "message": "product not found"
    }
```

### DELETE /products/:id

_Request Header_
```
{
  "token": "<your access token>"
}
```
_Request Body_
```
    not needed
```
_Response (200 - DELETED)_
```
   {
        "id": 1,
        "name": "<deleted product name>",
        "image_url": "<deleted url_img>",
        "price": "<deleted product price>",
        "stock": "<deleted product stock>"
    } 
```


_Response (404 - Not Found)_
```
    {
        "message": "product not found"
    }
```

### POST /login
_Request Header_
```
    Not needed
```
_Request Body_
```
    "email": "<user@admin.com>",
    "password": "<admin>"
```
_Response (200)_
```
    "<access_token>": "hashed token"
```
_Response (404)_
```
    {
        "message": "email cannot be empty" || "password cannot be empty"
    }
```


### POST /register
_Request Header_
```
    Not needed
```
_Request Body_
```
    "email": "<user@admin.com>",
    "password": "<admin>",
    "role": "admin"
```
_Response (201)_
```
    {
        "id": "<id given by system>",
        "email": "user@admin.com",
        "password": "admin",
        "role": "admin",
        "updatedAt": "<contain updatedAt result register>",
        "createdAt": "<contain createdAt result register>"
    }
```
_Response (404)_
```
    {
        "message": "data not found"
    }
```

### POST /googleSignIn
_Request Header_
```
    Not Needed
```
_Request Body_
```
    {
        "id_token" : "<id_token from google>" 
    }
```
_Response (200)_
```
    {
        "access_token": "<access_token JWT>"
    }
```
_Response (404 - Not Found)_
```
    {
        "message": "data not found"
    }
```