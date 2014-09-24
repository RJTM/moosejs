/**
 * Policy to give access to Jury actions to Jury and Admin users
 */
module.exports = function(req, res, next){
    if(req.token){
        User.findOne({id: req.token.id}).exec(function(err, user){
            if(['admin','jury'].indexOf(user.role) !== -1){
                next();
            }else{
                return res.json(401, {err: 'Unauthorized'});
            }
        });
    }else{
        return res.json(401, {err: 'No Authorization header was found'});
    }
}