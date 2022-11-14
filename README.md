# UP Arq Web

## Integrantes

Fabián Souza Di Paula

## Descripción del negocio

Sistema bancario estilo Lemon que permite el intercambio de monedas y el envío de las mismas dentro de la plataforma

## Endpoints

1. `/api/currency`

Method: GET
Desc: Devuelve la lista de currencies
Error code: 500?

2. `/api/currency/:currencyId`

Method: GET
Desc: Devuelve una currency en particular
Error code: 404 si no existe un recurso con ese id o 400 si la currencyId no es válida

3. `/api/currency`

Method: POST
Desc: Crea una nueva currency
Error code: 400 si no recibe el formato esperado

4. `/api/currency/:currencyId`

Method: PATCH
Desc: Modifica el/los campos de la currency especificada
Error code: 400 si no recibe el formato esperado, 404 si no existe la currencyId

5. `/api/currency/:currencyId`

Method: DELETE
Desc: Elimina la currency especificada
Error code: 404 si no existe la currencyId

---

6. `/api/user/:userId/buy_currency/:currencyId`

Method: POST
Desc: Utiliza $ARS para comprar o cambiar por otro tipo de currency
Error code: 403 si el usuario no tiene los fondos suficientes para realizar la compra, 400 si alguno de los ids es inválido

7. `/api/transfer/:currencyId/from/:userId/to/:userId`

Method: POST
Desc: Transfiere una currency en particular a un usuario determinado.
Error code: 403 si el usuario no tiene los fondos para realizar una transferencia con ese monto, 404 si alguno de los ids no existe, 400 si los userId son idénticos
