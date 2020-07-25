### e-commerce-cms API Documentation
​
# Method Use (POST)
​
# Available routing:
1. POST   : /login
2. POST   : /products
3. GET    : /products
4. PUT    : /products/:id
5. DELETE : /products/:id
​
# POST /login
Request body:
​
```json
{
    "email": "admin",
    "password": "admin"
}
```
​
Response(201 - Created):
​
```json
{
 "access_token"
}
```
​
# GET : /products
Request body:
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"
}
```
​
Response(200 - Ok):
​
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"     
}
```

# PUT : /products
Request body:
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"
}
```
​
Response(200 - Ok):
​
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"     
}
```
# POST : /products
Request body:
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"
}
```
​
Response(200 - Ok):
​
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"     
}
```

# DELETE : /products
Request body:
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"
}
```
​
Response(200 - Ok):
​
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"     
}
```

# POST : /products
Request body:
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"
}
```
​
Response(201 - Ok):
​
​
```json
{
    "name": "req.body.name",
    "image_url": "req.body.image_url",
    "price": "req.body.price",
    "stock": "req.body.stock"     
}
```



​
## ERROR RESPONSES:
​
Response(400 - Error Database Validation)
​
```json
{
    "status":400,
    "message": "email  must be filled",
    "errorCode": "VALIDATION_ERR"
}
```
Response(401 - Error Authentication)
​
```json
{
    "status":400,
    "message": "user invalid",
    "errorCode": "INVALID_USER"
}
```
Response(401 - Error User Login)
​
```json
{
    "status":400,
    "message": "user invalid",
    "errorCode": "INVALID_USER"
}
```

Response(403 - Error Authorization)
​
```json
{
    "status":403,
    "message": "You are not authorized",
    "errorCode": "UNAUTHORIZED"
}
```
​
Response(500 - Error Default)
​
```json
{
    "status":500,
    "message": "internal server error",
    "errorCode": "INTERNAL_SERVER_ERR"
}
```