'use strict';

module.exports = function(Producto) {
 /**
 * limpiar lista familiar
 * @param {object} context contexto
 * @param {Function(Error, array)} callback
 */

        Producto.limpiarlista = function(context, callback) {
            var array;
            var usuario=Producto.app.models.Usuario;
            var userid = context.req.accessToken.userId;
            var lista;
                usuario.findById(userid, function(err,productos) {
                    lista=productos.listaFamiliarId;
                     
                      Producto.updateAll({listaFamiliarId: lista},{comprar:0},function(err, info){
                        Producto.find({
                            where:{listaFamiliarId:lista }},function (err,array){ 
                            callback(null, array);                    
                            });
                          
                      } 
                      );
        });
    };

}

