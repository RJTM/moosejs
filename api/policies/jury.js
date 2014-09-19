/**
 * Policy to give access to Jury actions only to Jury users
 */
module.exports = function(req, res, next){
    if(req.token){
        User.findOne({id: req.token.id}).exec(function(err, user){
            if(['jury'].indexOf(user.role) !== -1){
                next();
            }else{
                return res.json(401, {err: 'Unauthorized'});
            }
        });
    }else{
        return res.json(401, {err: 'No Authorization header was found'});
    }
}