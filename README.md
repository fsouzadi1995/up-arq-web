# UP Arq Web

## Integrantes

Fabián Souza Di Paula

## Descripción del negocio

Sistema bancario estilo Lemon que permite el intercambio de monedas y el envío de las mismas dentro de la plataforma

## Endpoints

1. `/api/v1/buy_currency/:currencyId`

Method: POST
Desc: Utiliza $ARS para comprar o cambiar por otro tipo de currency
Error code: 403 si el usuario no tiene los fondos suficientes para realizar la compra

2. `/api/v1/currencies`

Method: GET
Desc: Devuelve la lista de currencies del usuario junto con su cantidad correspondiente
Error code: 401 si no el jwt no corresponde a un usuario válido o expiró

3. `/api/v1/transfer/:currencyId/from/:userId/to/:userId`

Method: POST
Desc: Transfiere una currency en particular a un usuario determinado.
Error code: 403 si el usuario no tiene los fondos para realizar una transferencia con ese monto
