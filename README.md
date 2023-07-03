# Domain Design Civitour

La empresa Civitour quiere digitalizar su forma de hacer Walking tours. Quieren hacer una aplicación en la que se permiten dar de alta tours en sus ciudades y permitir a los usuarios reservarlos.

Los tours se dan de alta por parte de los guías y tienen que introducir la ciudad, el título, la descripción, fecha, aforo máximo y los pasos que tiene el tour.

Un paso del Tour tiene como información el título, la descripción y la localización donde se produce. Además se puede añadir a cada paso documentos gráficos (Videos o fotos)

Un cliente puede reservar un Tour añadiendo sus datos de contacto (nombre, apellidos y teléfono de contacto) y el número de personas que van en la reserva.

Cuando el tour termina el cliente puede poner una review (1-5) con un comentario y dar un tip al guía

Como restricciones:

- La ciudad tiene que ser una en la cual opere Civitour.
- En la aplicación de alta de tour, la fecha tiene que ser superior al día actual
- El aforo máximo de un tour no puede superar las 50 personas
- El título de un tour no puede superar los 60 caracteres
- Un paso del tour no puede tener mas de 5 documentos gráficos
- El nombre de un guía o un cliente tiene que estar entre los 3 y los 25 caracteres
- El teléfono tiene que tener un formato movil español

Diseñar el sistema utilizando DDD. Identificar entidades y value objects

Definir e implementar el dominio identificado
