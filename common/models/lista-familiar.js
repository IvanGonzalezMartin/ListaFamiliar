'use strict';

module.exports = function(Listafamiliar) {
    
    Listafamiliar.beforeRemote('create' , function(context, Listafamiliar ,next){
        context.args.data.owner= context.req.accessToken.userId;
        next();
    });
    
};
