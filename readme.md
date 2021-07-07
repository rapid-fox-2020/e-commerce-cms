# e-commerce-cms
My e-commerce-cms App is an application to sell product with E-commerce Stores. This app has : 
* RESTful endpoint for Product's CRUD operation
* JSON formatted response
* Technology includes: 
    - Sequelize,
    - Vue-CLI js,
    - Express Js, 
    - Postgres, 
    - Bcrypt, 
    - Jason Web Token, 
    - google Authentication, 
    - authentication and authorization.

&nbsp;

## RESTful endpoints

### Global Endpoints
_Response (401 - Unauthorized)_
```
{
  "message": "User not authenticated"
}
```
_Response (500 - Error)_
```
{
  "message": "Server internal error"
}
```

---
### GET /products
> Get all products

_Request Header_
```
{
  "access_token": "<access_token>"
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
    "id": <show id data>,
    "name": "<show name data>",
    "image_url": "<show image_url data>",
    "price": "<show price data>",
    "stock": "<show stock data>",
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (401 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### GET /products/:id
> Get product base on requested id.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Params_
```
{
  "id": "<integer>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": <show id by requested id>,
    "name": "<show name by requested id>",
    "image_url": "<show image_url by requested id>",
    "price": "<show price by requested id>",
    "stock": "<show stock by requested id>",
    "createdAt": "<show createdAt by requested id>",
    "updatedAt": "<show updatedAt by requested id>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (404 - Not Found)_
```
{
  "message": "product not found"
}
```

---
### POST /products
> Create new product

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```

---
### PUT /products/:id
> Get product base on requested id.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Params_
```
{
  "id": "<integer>"
}
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
}
```

_Response (200)_
```
{
    "id": <id to get update into>,
    "name": "<name to get update into>",
    "image_url": "<image_url to get update into>",
    "price": "<price to get update into>",
    "stock": "<stock to get update into>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```

_Response (404 - Bad Request)_
```
{
  "message": "Data not foud"
}
```

---
### DELETE /products/:id
> Delete product with selected id

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```

{
    "id": <contain id that deleted>,
    "name": "<contain name that deleted>",
    "image_url": "<contain image_url that deleted>",
    "price": "<contain price that deleted>",
    "stock": "<contain stock that deleted>",
    "createdAt": "<contain createdAt that deleted>",
    "updatedAt": "<contain updatedAt that deleted>",
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /login
> Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (200)_
```
{
  "access_token": "<access_token>"
  "id": "<user id>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /googleSignin
> Login User with validate Google

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token" : "<id_token from google>" 
}
```

_Response (201)_
```
{
  "access_token": "<access_token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```