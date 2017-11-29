'use strict';

module.exports = function(Usuario) {
    
 /**
 * Aceptar una solicitud
 * @param {object} context 
 * @param {Function(Error, object)} callback
 */

    Usuario.prototype.Aceptar = function(context, callback) {
        var objeto=[];
        var usuario = this;
        var userid = context.req.accessToken.userId;
        var lista;
	Usuario.findById(userid, function(err,usuarioauten) {
            if (err) callback(err);
            lista=usuarioauten.listaFamiliarId;
            
            usuario.listaFamiliarId=lista;
            usuario.save(function (err){ 
                    usuario.Solicitud.remove(lista, function(err){
                        Usuario.find({
                            where:{lista: Usuario.listaFamiliarId}},function (err,objeto){
                            
                            callback(null, objeto);                    
            });

           });
   
           });
            
    
});
};
/**
 * rechazarSolicitud
 * @param {object} context datos
 * @param {Function(Error, array)} callback
 */

Usuario.prototype.rechazar = function(context, callback) {
  var array;
  var usuario = this;
  var userid = context.req.accessToken.userId;
  var lista;
  Usuario.findById(userid, function(err,usuarioauten) {
            if (err) callback(err);
            lista=usuarioauten.listaFamiliarId;
            
            usuario.Solicitud.remove(lista, function(err){
                
                
                
                    Usuario.find({
                            where:{lista: Usuario.listaFamiliarId}},function (err,array){ 
                            callback(null, array);                    
            });
           });
});
};
}

