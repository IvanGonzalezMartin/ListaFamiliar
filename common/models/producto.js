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
 /**
 * Comprar un unico producto
 * @param {object} context 
 * @param {Function(Error, array)} callback
 */

Producto.prototype.EliminarProducto = function(context, callback) {
  var array;
  var userid = context.req.accessToken.userId;
  var usuario=Producto.app.models.Usuario;
  var pid=this.listaFamiliarId;
  var compra=this.comprar;
  var lista;
  var ides=this.id; 
      usuario.findById(userid, function(err,productos) {
            lista=productos.listaFamiliarId;
             if(lista==pid){
                 if(compra==0){
                    Producto.updateAll({id: ides},{comprar:1},function(err, info){
                        Producto.find({            
                            where:{listaFamiliarId:lista }},function (err,array){ 
                            callback(null, array);                    
                            });
                    }); 
                 }else if(compra==1){
                      Producto.updateAll({id: ides},{comprar:0},function(err, info){
                        Producto.find({            
                            where:{listaFamiliarId:lista }},function (err,array){ 
                            callback(null, array);                    
                            });
                    }); 
                 }
             }else{
                 
                 console.log("no pertenece a la lista");
                 
             }                                 
        });
};

}

