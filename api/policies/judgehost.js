/**
 * Policy to give access to Admin actions
 */
module.exports = function(req, res, next){
    if(req.token){
    	  var token = req.token;
        if(token.judgehost == 'yes'){
            next();
        }else{
            return res.json(401, {err: 'The token is not valid'});
        }
    }else{
        return res.json(401, {err: 'No Authorization header was found'});
    }
}