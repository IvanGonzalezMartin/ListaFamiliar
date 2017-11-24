'use strict';

module.exports = function(Listafamiliar) {
    
    Listafamiliar.beforeRemote('create' , function(context, Listafamiliar ,next){
        context.args.data.owner= context.req.accessToken.userId;
        next();
    });
    
    Listafamiliar.afterRemote('create' , function(context, listafamiliar ,next){
        var Usuario=Listafamiliar.app.models.Usuario;
        Usuario.findById(context.req.accessToken.userId, function(err,objeto){
            objeto.listaFamiliarId=listafamiliar.id;
            objeto.save(function(err){
                next();
            });
        });      
    });
    
    Listafamiliar.prototype.solicitar = function(context, callback) {
        var objeto;
        var usuario=context.req.accessToken.userId;
        var id=this.id;
            this.Solicitud.add(usuario, function(err, objeto){              
                     objeto = {
                        usuarioId:usuario,
                        listaFamiliarId:id
                    };  
                    callback(null, objeto);
                });   
    
};
   
};

