/**
 * JudgehostController
 *
 * @description :: Server-side logic for managing judgehosts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
 	handshake: function(req, res){
 		var token = req.param('token');
 		JWTService.verifyToken(token, function(err, token){
 			if(err) return res.json(401, {err: 'The token is not valid'});
            //sails.sockets.join(req.socket, 'newSubmissions');
            return res.json({token: token, success: 'yes'});
        });
 	},
 	
 	subscribe: function(req, res){
 		Grade.findOne({status: 'pending'}).sort("createdAt ASC").populate('run').populate('task').exec(function(err, grade){
 			if(grade){
 				GradeService.fillGradeData(grade, function(err, finalGrade){
 					if(err) return res.serverError(err);
 					return res.json({grade: finalGrade, status: 'pending'});
 				});
 			}else{
 				sails.sockets.join(req.socket, 'newSubmissions');
 				sails.log.info('Judgehost connected '+ req.socket.id);
 				sails.log.info('Current judgehost pool:');
 				sails.log.info(sails.sockets.subscribers('newSubmissions'));
 				return res.json({status: 'subscribed'});
 			}
 		});       
 	},
 	
 	unsubscribe: function(req,res){
 		sails.sockets.leave(req.socket, 'newSubmissions');
 		sails.log.info('Judgehost disconnected '+ req.socket.id);
 		sails.log.info('Current judgehost pool: ');
 		sails.log.info(sails.sockets.subscribers('newSubmissions'));
 		return res.ok();
 	},
 	
 	token: function(req, res){
 		var id = req.param('id');		
 		res.json({token: JWTService.issueToken({id:id,judgehost:'yes'})});
 	}
 };

