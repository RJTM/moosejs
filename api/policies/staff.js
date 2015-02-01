/**
 * Policy to give access to Admin actions
 */
module.exports = function(req, res, next){
    if(req.token){
        User.findOne({id: req.token.id}).exec(function(err, user){
            if(user.role === 'staff'){
                next();
            }else{
                return res.json(401, {err: 'Unauthorized'});
            }
        });
    }else{
        return res.json(401, {err: 'No Authorization header was found'});
    }
}