/**
 * JudgehostController
 *
 * @description :: Server-side logic for managing judgehosts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {
 	/**
 	*
 	* Initial handshake with the judgehost
 	*
 	**/
 	
 	handshake: function(req, res){
 		var token = req.token;
 		if(token.judgehost == 'yes'){
 			return res.json({token: token, success: 'yes'});
 		}else{
 			return res.json(401, {err: 'The token is not valid'});
 		}
 	},
 	
 	/**
 	*
 	* Subscribes the judgehost to upcoming runs
 	*
 	**/
 	
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
 	
 	/**
 	*
 	* Unsubscribes the judgehost from the available list meanwhile judging
 	*
 	**/
 	
 	unsubscribe: function(req,res){
 		sails.sockets.leave(req.socket, 'newSubmissions');
 		sails.log.info('Judgehost disconnected '+ req.socket.id);
 		sails.log.info('Current judgehost pool: ');
 		sails.log.info(sails.sockets.subscribers('newSubmissions'));
 		return res.ok();
 	},
 	
 	/**
 	*
 	* Returns the token for a given judgehost id
 	*
 	**/
 	
 	token: function(req, res){
 		var id = req.param('id');		
 		res.json({token: JWTService.issueToken({id:id,judgehost:'yes'})});
 	}
 };

