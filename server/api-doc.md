# API Server


## User endpoints

---
### POST /login : user login using registered account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email post>",
  "password": "<password post>",
}
```

_Response (200)_
```
{
  "id": "<user id>",
  "name": "<user name>",
  "email": "<user email>",
  "access_token": "<user access_token>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<first validation error caught>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<message email unregistered>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


## Product endpoints
---
### GET /products : show all Product

_Request Header_
```
{
  "access_token": "<your access token>"
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
    "id": "<Product id>",
    "name": "<Product name>",
    "image_url": "<Product image_url>",
    "price": "<Product price>",
    "stock": "<Product stock>",
    "createdAt": "<date Product created>",
    "updatedAt": "<date last time Product updated>"
  },
  {
    "id": "<Product id>",
    "name": "<Product name>",
    "image_url": "<Product image_url>",
    "price": "<Product price>",
    "stock": "<Product stock>",
    "createdAt": "<date Product created>",
    "updatedAt": "<date last time Product updated>"
  },
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---
### POST /products : add new Product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<Product name>",
  "image_url": "<Product image_url>",
  "price": "<Product price>",
  "stock": "<Product stock>",
}
```

_Response (201 - Created)_
```
{
  "id": "<Product id>",
  "name": "<Product name>",
  "image_url": "<Product image_url>",
  "price": "<Product price>",
  "stock": "<Product stock>",
  "createdAt": "<date given by system>",
  "updatedAt": "<date given by system>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<first validation error caught>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---
### GET /products/:id : find Product by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": "<id of found Product>",
  "name": "<name of found Product>",
  "image_url": "<image_url of found Product>",
  "price": "<Product price>",
  "stock": "<Product stock>",
  "createdAt": "<date created of found Product>",
  "updatedAt": "<updateAt of found Product>",
}
```

_Response (404 - Not Found)_
```
{
  "message": "<message Product not found>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### PATCH /products/:id : edit Product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<Product name>",
  "image_url": "<Product image_url>"
  "price": "<Product price>",
  "stock": "<Product stock>",
}
```

_Response (200)_
```
{
  "id": "<Product id>",
  "name": "<Product name>",
  "image_url": "<Product image_url>",
  "price": "<Product price>",
  "stock": "<Product stock>",
  "createdAt": "<date given by system>",
  "updatedAt": "<date given by system>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<first validation error caught>"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---
### DELETE /products/:id : delete Product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": "<deleted Product id>",
  "name": "<deleted Product name>",
  "image_url": "<deleted Product image_url>",
  "UserId": "<deleted Product creator id>"
  "createdAt": "<deleted Product date created>",
  "updatedAt": "<deleted Product updateAt>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}