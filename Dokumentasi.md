### CMS Admin API Documentation
# Method Use (POST,GET)
# Available routing:
1. POST   : /login
2. POST   : /register
3. POST   : /products
4. GET    : /products
6. PUT    : /products/:id
7. DELETE : /products/:id
# POST /login
Request body:
```json
{
    "email": "admin@email.com",
    "password": "1234"
}
```
Response(201 - Created):
```json
{
 "token"
}
```

# GET : /products
Request body:
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"
}
```
Response(200 - Ok):
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"     
}
```
# PUT : /products
Request body:
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"
}
```
Response(200 - Ok):
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"     
}
```
# POST : /products
Request body:
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"
}
```
Response(200 - Ok):
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"     
}
```
# DELETE : /products
Request body:
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"
}
```
Response(200 - Ok):
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"     
}
```
# POST : /products
Request body:
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"
}
```
Response(201 - Ok):
```json
{
    "name": "req.body.name",
    "img_url": "req.body.img_url",
    "price": "req.body.price",
    "stock": "req.body.stock",
    "UserId": "req.userData.id"     
}
```
## ERROR RESPONSES:
Response(400 - Error Database Validation)
```json
{
    "status":400,
    "message": "email  must be filled",
    "errorCode": "VALIDATION_ERR"
}
```
Response(401 - Error Authentication)
```json
{
    "status":400,
    "message": "user invalid",
    "errorCode": "INVALID_USER"
}
```
Response(401 - Error User Login)
```json
{
    "status":400,
    "message": "user invalid",
    "errorCode": "INVALID_USER"
}
```
Response(403 - Error Authorization)
```json
{
    "status":403,
    "message": "You are not authorized",
    "errorCode": "UNAUTHORIZED"
}
```
Response(500 - Error Default)
```json
{
    "status":500,
    "message": "internal server error",
    "errorCode": "INTERNAL_SERVER_ERR"
}
```