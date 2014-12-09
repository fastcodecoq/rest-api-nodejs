CYZ API
=======

Estructura del repositorio
--------------------------

El repositorio tiene 3 ramas: master, qa, dev. En las primeras fases y durante todo el desarrollo se trabajará en la rama dev, que es la rama de menor jerarquía. Solo se harán push a las ramas superiores, cuando se hagan entregas que estén listas para ser testeadas, el push debe hacerse la rama qa (pruebas), solo cuando el sistema este estabilizado se haría un push al master, que sería la rama de producción. 

Documentación REST API CYZ.
---------------------------

Respuesta
---------

Formato: JSON

Éxito.
Cod. HTTP 200

```javascript
{ message : String, data : Object }
```

Falla.
Cod. HTTP 500

```javascript
{ message : String }
```

No autorizado
Cod. HTTP 401

```javascript
{ message : String }
```

USUARIO
-------


CREAR 
_____


Método: POST 
URI: api/usuario 
Params: 

```javascript
name String (required)
last_name String (required)
email String (required)
terms Boolean (required)
location Object
         {
             address : String,
             city : String,
             country : String,
             lat : Number,
             lng : Number
         }
active Boolean (Defautl false)
password String
```

OBTENER
_______

Método: GET
URI: /api/usuario/:idusuario



MODIFICAR
_________



Método: PUT / UPDATE
URI: api/usuario/:idusuario 
Params: 

```javascript
name String (required)
last_name String (required)
email String (required)
terms Boolean (required)
location Object
         {
             address : String,
             city : String,
             country : String,
             lat : Number,
             lng : Number
         }
active Boolean (Defautl false)
password String
```


ELIMINAR
________


Método: DELETE
URI: /api/usuario/:idusuario


EMPRESA
-------


CREAR 
_____


Método: POST 
URI: /api/empresa/:usuarioid || /api/empresa
Params: 

```javascript
name String (required)
nit String (required)
tel String (required)
email String (required)
userid String (required)
location Object
         {
             address : String,
             city : String,
             country : String,
             lat : Number,
             lng : Number
         }
active Boolean (Defautl false)
```


OBTENER
_______

Método: GET
URI: /api/empresa/:empresaid



MODIFICAR
_________



Método: PUT / UPDATE
URI: /api/empresa/:idempresa
Params: 

```javascript
name String (required)
nit String (required)
tel String (required)
email String (required)
userid String (required)
location Object
         {
             address : String,
             city : String,
             country : String,
             lat : Number,
             lng : Number
         }
active Boolean (Defautl false)
```


ELIMINAR
________

Método: DELETE
URI: /api/empresa/:idempresa



CANDIDATO
---------

CREAR 
_____


Método: POST 
URI: /api/empresa/:usuarioid || /api/empresa
Params: 

```javascript
name String (required)
nit String (required)
tel String (required)
email String (required)
userid String (required)
location Object
         {
             address : String,
             city : String,
             country : String,
             lat : Number,
             lng : Number
         }
active Boolean (Defautl false)
```


OBTENER
_______

Método: GET
URI: /api/empresa/:empresaid



MODIFICAR
_________


Método: PUT / UPDATE
URI: /api/empresa/:idempresa
Params: 

```javascript
name String (required)
nit String (required)
tel String (required)
email String (required)
userid String (required)
location Object
         {
             address : String,
             city : String,
             country : String,
             lat : Number,
             lng : Number
         }
active Boolean (Defautl false)
```


ELIMINAR
________

Método: DELETE
URI: /api/empresa/:idempresa