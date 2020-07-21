# ECOMMERCE - CMS

ECOMMERCE - CMS where users can maintain their products. 

we use RESTful API with json formatted Response

## Global Response
 - Response status(500) : Internal Server Error
```
  {
    "message": "Internal Server Error. <show error>"
  }
```

## Users Route

### POST /login : login to user's account

- request header
```
not required
```
- request body

```
  {
    email: "<user's email>",
    password: "<user's password>"
  }
```

- Response 200: OK

```
  {
    "access_token": "<user's token JWT>"
  }
```

- Response (400-Bad Request)

```
  {
    "message": "Invalid Email or Password! Please try again!"
  }
```

## Products Route

### POST /products : add new products by user

- request header

```
"access_token" : "<user's token JWT>"
```

- request body

```
  {
    "name": "<products name>",
    "imageUrl": "<products imageUrl>",
    "price": "<products price>",
    "stock": "<products stock>"
  }
```
- Response 201: Created

``` 
 {
    "id": "<products id>",
    "name": "<products name>",
    "imageUrl": "<products imageUrl>",
    "price": "<products price>",
    "stock": "<products stock>",
    "createdAt": "<createdAt data>",
    "updatedAt": "<updatedAt data>"
 }
```

- Response (400-Bad Request)

```
  {
    "message": [<errors message>]
  }
```

- Response (403-Bad Request)

```
  {
    "message": "Forbidden Access"
  }
```

### GET /products : show all products in database

- request header

```
"access_token" : "<user's token JWT>"
```

- request body
```
not required
```

- Response 200: OK
```
[
  {
   "id": "<products id>",
    "name": "<products name>",
    "imageUrl": "<products imageUrl>",
    "price": "<products price>",
    "stock": "<products stock>",
    "createdAt": "<createdAt data>",
    "updatedAt": "<updatedAt data>"
 },
 {
   "id": "<products id>",
    "name": "<products name>",
    "imageUrl": "<products imageUrl>",
    "price": "<products price>",
    "stock": "<products stock>",
    "createdAt": "<createdAt data>",
    "updatedAt": "<updatedAt data>"
 }
]
```
 

- Response (401-Authentication error)

```
  {
    "message": "Invalid Access Token"
  }
```

- Response (403-Authorization error)

```
  {
    "message": "Forbidden Access"
  }
```

### GET /products/:id : show selected product in database

- request header

```
"access_token" : "<user's token JWT>"
```

- request body

```
  {
    "id": "<products id>"
  }
```
- Response 200: OK

```
  {
    "id": "<products id>",
    "name": "<products name>",
    "imageUrl": "<products imageUrl>",
    "price": "<products price>",
    "stock": "<products stock>",
    "createdAt": "<createdAt data>",
    "updatedAt": "<updatedAt data>"
 }
```

- Response (403-Bad Request)
```
  {
    "message": "Forbidden Access"
  }
```

- Response (404-Not Found)
```
  {
    "message": "Data Not Found"
  }
```

### PUT /products/:id : update selected product in database

- request header
```
"access_token" : "<user's token JWT>"
```

- request body
```
  {
    "role": <users role must be admin>
  }
```

- Response 200: OK
```
  {
    "message" : "successfully updated"
  }
```

- Response (404-Not Found)
```
  {
    "message": "Data Not Found"
  }
```

- Response (403-Forbidden Access)
```
  {
    "message": "Forbidden Access"
  }
```

### DELETE /products/:id : deleted selected product in database

- request header
```
"access_token" : "<user's token JWT>"
```

- request body
```
  {
    "role": <users role must be admin>
  }
```

- Response 200: OK
```
  {
    "message" : "successfully deleted"
  }
```

- Response (404-Not Found)
```
  {
    "message": "Data Not Found"
  }
```

- Response (403-Forbidden Access)
```
  {
    "message": "Forbidden Access"
  }
```