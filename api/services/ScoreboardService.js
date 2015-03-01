'use strict';

module.exports = {
	/**
	 * Creates scoreboard rows for a new user in the contest
	 * @param {Int} user    Id of the user to be added
	 * @param {Int} contest Id of the contest in which we will add the user
	 */
	addUser: function(user, contest){
		Task.find({ contest: contest }).populate('subtasks').exec(function(err, tasks){
			if(err){ 
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			async.map(tasks, function(task, callback){

				async.map(task.subtasks, function(subtask, cb){
					Scoreboard.create({ contest: task.contest, user: user, task: task.id, subtask: subtask.id}).exec(function(err, res){
						if(err){
							cb(err);
							return;
						} 
						ScoreboardPublic.create({ contest: task.contest, user: user, task: task.id, subtask: subtask.id}).exec(function(err, res){
							cb(err, res);
						});
					});
				}, function(err, results){
						callback(err, results);
				});

			},function(err, results){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
				Scoreboard.publishCreate({
					id: user,
					// rows: results
				});
				ScoreboardPublic.publishCreate({
					id: user,
					// rows: results
				});
			})
			
		});
	},


	/**
	 * Deletes a list of users from the scoreboard
	 * @param  {[Int]} users List of users id
	 */
	deleteUser: function(users){
		async.each(users, function(user, callback){
			Scoreboard.destroy({user: user.id}).exec(function(err, res){
				if(err){ 
					callback(err);
					return;
				}
				if(res && res[0]){
					Scoreboard.publishDestroy(res[0].id);
				}
				callback();
			}, function(err){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
			});
		});
		async.each(users, function(user, callback){
			ScoreboardPublic.destroy({user: user.id}).exec(function(err, res){
				if(err){ 
					callback(err);
					return;
				}
				if(res && res[0]){
					ScoreboardPublic.publishDestroy(res[0].id);
				}
				callback();
			}, function(err){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
			});
		});
	},


	/**
	 * Removes user from contest in the scoreboard
	 * @param  {Int} user    Id of the user
	 * @param  {Int} contest Id of the contest
	 */
	removeUserFromContest: function(user, contest){
		Scoreboard.destroy({user: user, contest: contest}).exec(function(err, res){
			if(err){ 
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			if(res && res[0]){
				Scoreboard.publishDestroy(res[0].id);
			}
		});
		ScoreboardPublic.destroy({user: user, contest: contest}).exec(function(err, res){
			if(err){ 
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			if(res && res[0]){
				ScoreboardPublic.publishDestroy(res[0].id);
			}
		});
	},

	/**
	 * Adds a task to the scoreboard
	 * @param {Object} task     Task to be added
	 * @param {function} finished Callback function
	 */
	addTask: function(task, finished){
		Contest.findOne({ id: task.contest}).populate('users').exec(function(err,contest){
			if(err){
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			async.map(contest.users, function(user, callback){
				if(user.role === 'jury' || user.role === 'team'){
					async.map(task.subtasks, function(subtask, cb){
						Scoreboard.create({ contest: task.contest, user: user.id, task: task.id, subtask: subtask.id}).exec(function(err, res){
							if(err){
								cb(err);
								return;
							}
							ScoreboardPublic.create({ contest: task.contest, user: user.id, task: task.id, subtask: subtask.id}).exec(function(err, res){
								cb(err,res);
							});
						});
					}, function(err,results){
						callback(err, results);
					});
				}else{
					callback();
				}
			}, function(err, results){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
				Scoreboard.publishCreate({ id: task.id });
				ScoreboardPublic.publishCreate({ id: task.id });
				if(finished) finished();
			});
		});
	},


	/**
	 * Deletes a list of task from the scoreboard
	 * @param  {[Object]}   tasks List of tasks
	 * @param  {function} cb    Callback function
	 */
	deleteTask: function(tasks, cb){
		async.each(tasks, function(task, callback){
			Scoreboard.destroy({task: task.id}).exec(function(err, res){
				if(err){ 
					callback(err);
					return;
				}
				if(res && res[0]){
					Scoreboard.publishDestroy(res[0].id);
				}
				callback();
			});
		}, function(err){
			if(err){ 
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			if(cb) cb();
		});
		async.each(tasks, function(task, callback){
			ScoreboardPublic.destroy({task: task.id}).exec(function(err, res){
				if(err){ 
					callback(err);
					return;
				}
				if(res && res[0]){
					ScoreboardPublic.publishDestroy(res[0].id);
				}
				callback();
			});
		}, function(err){
			if(err){ 
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			if(cb) cb();
		});
	},


	/**
	 * Adds a subtask to the scoreboard
	 * @param {Object} subtask Subtask to be added
	 */
	addSubtask: function(subtask){
		Task.findOne(subtask.task).exec(function(err, task){
			if(err){
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			Contest.findOne(task.contest).populate('users').exec(function(err, contest){
				if(err){
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
				async.map(contest.users, function(user, callback){
					if(user.role === 'jury' || user.role === 'team'){
						Scoreboard.create({ contest: contest.id, user: user.id, task: task.id, subtask: subtask.id}).exec(function(err, res){
							if(err){
								callback(err);
								return;
							}
							ScoreboardPublic.create({ contest: contest.id, user: user.id, task: task.id, subtask: subtask.id}).exec(function(err, res){
								callback(err,res);
							});
						});
					}
				}, function(err, results){
					if(err){ 
						sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
					}
					Scoreboard.publishCreate({
						id: 1,
						// rows: results
					});
					ScoreboardPublic.publishCreate({
						id: 1,
						// rows: results
					});
				});
			});
		});
	},

	/**
	 * Deletes a list of subtasks from the scoreboard
	 * @param  {[Object]} subtasks List of subtasks to be deleted
	 */
	deleteSubtask: function(subtasks){
		async.each(subtasks, function(subtask, callback){
			Scoreboard.destroy({subtask: subtask.id}).exec(function(err, res){
				if(err){ 
					callback(err);
					return;
				}
				if(res && res[0]){
					Scoreboard.publishDestroy(res[0].id);
				}
				callback();
			}, function(err){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
			});
		});
		async.each(subtasks, function(subtask, callback){
			ScoreboardPublic.destroy({subtask: subtask.id}).exec(function(err, res){
				if(err){ 
					callback(err);
					return;
				}
				if(res && res[0]){
					ScoreboardPublic.publishDestroy(res[0].id);
				}
				callback();
			}, function(err){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
			});
		});
	},

	/**
	 * Updates the scoreboard to include new results
	 * @param  {Object} grade     Grade regarding the new result
	 * @param  {[Object]} veredicts List of veredicts from jury
	 *
	 * NOTE:
	 * This function calls updatePublic to sync the ScoreboardPublic
	 */
	update: function(grade, veredicts){
		/**
		
			- Get previous result for that task
			- Compare subtask to subtask to see which one of the runs is better
			- Update if needed
		
		**/
		
		GradeService.getRunResult(grade.run, function(err, response){
			if(err){
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			if(response.run.owner.role !== 'team' || response.run.ignore){
				return;
			}
			Scoreboard.find({ where: {user: response.run.owner.id, task: response.task.id}, sort: 'subtask'}).exec(function(err, rows){
				if(err){
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); 
					return;
				}

				//Get the score points from the previous submit and the next one
				var subTaskUtil = {};
				var previousScore = rows.map(function(current){
					return current.points;
				}).reduce(function(prev,next){
					return prev+next;
				});
				
				var nextScore = veredicts.map(function(current){
					subTaskUtil[current.id] = {
						points : current.points,
						veredict : current.veredict,
						autojudge : current.autojudge,
						jury: current.owner
					};
					return current.veredict === 'accepted' ? parseInt(current.points) : 0;
				}).reduce(function (prev, next){
					return prev + next;
				});

				// update each subtask entry in the scoreboard
				async.each(rows, function(item, cb){
					item.submissions = parseInt(item.submissions) + 1;

					// update results if needed
					if(nextScore > previousScore){
						if(subTaskUtil[item.subtask].veredict === 'accepted'){
							item.points = subTaskUtil[item.subtask].points;
							item.isCorrect = true;
							item.jury = subTaskUtil[item.subtask].jury;
						}else{
							item.points = 0;
							item.isCorrect = false;
							item.jury = subTaskUtil[item.subtask].jury;
						}
						item.juryModified = subTaskUtil[item.subtask].veredict !== subTaskUtil[item.subtask].autojudge;
						item.time = response.run.time;
						item.penalty = (item.submissions - 1) * response.contest.penalty;
					}
					item.save();
					cb();
				}, function(err){
					if(err){
						sails.log.err("Error building scoreboard. Please refresh scoreboard"); 
						return;
					}
					Scoreboard.publishUpdate(rows[0].id, rows);
					module.exports.updatePublic(response, veredicts);
				});					

			});
		});
	},

	/**
	 * Updates the ScoreboardPublic
	 * @param  {Object} grade     Full grade result
	 * @param  {[Object]} veredicts Jury veredicts
	 */
	updatePublic: function(grade, veredicts){
		/**
		
			- Get previous result for that task
			- Compare subtask to subtask to see which one of the runs is better
			- Update if needed
		
		**/

		var currentTime = new Date();
		var freezeTime = new Date(grade.contest.freezeTime);
		if(currentTime >= freezeTime){
			return;
		}

		var subtasksFeedback = {};
		grade.subtasks.forEach(function(subtask){
			subtasksFeedback[subtask.id] = subtask.feedback;
		});

		ScoreboardPublic.find({ where: { user: grade.run.owner.id, task: grade.task.id}, sort: 'subtask'}).exec(function(err, rows){
			if(err){
				sails.log.err("Error building scoreboard, Please refresh scoreboard");
				return;
			}

			var subTaskUtil = {}, balloon = true;
			var previousScore = rows.map(function(current){
				return current.points;
			}).reduce(function(prev, next){
				return prev + next;
			});

			var nextScore = veredicts.map(function(current){
				subTaskUtil[current.id] = {
					points: current.points,
					veredict: current.veredict
				};
				balloon = balloon && (current.veredict === 'accepted' && subtasksFeedback[current.id]);
				return current.veredict === 'accepted' && subtasksFeedback[current.id] ? parseInt(current.points) : 0;
			}).reduce(function(prev, next){
				return prev + next;
			});
			balloon = balloon && nextScore > previousScore;
			// update each subtask entry in the scoreboard
			async.each(rows, function(item, cb){
				item.submissions = parseInt(item.submissions) + 1;

				// update results if needed
				if(nextScore > previousScore){
					if(subTaskUtil[item.subtask].veredict === 'accepted' && subtasksFeedback[item.subtask]){
						item.points = subTaskUtil[item.subtask].points;
						item.isCorrect = true;
					}else{
						item.points = 0;
						item.isCorrect = false;
					}
					item.time = grade.run.time;
					item.penalty = (item.submissions - 1) * grade.contest.penalty;
				}

				item.save();
				cb();
			}, function(err){
				if(err){
					sails.log.err("Error building scoreboard. Please refresh scoreboard");
					return;
				}
				ScoreboardPublic.publishUpdate(rows[0].id, rows);
				if(balloon){
					BalloonService.create(grade.run.owner.id, grade.task.id);
				}
			});

		});

	},



	/**
	 * Returns the scoreboard to Jury
	 * @param  {Object}   req       Request
	 * @param  {Int}   contestId Id of the contest
	 * @param  {Function} callback  Callback function
	 */
	findScoreboardJury: function(req, contestId, callback){
		Scoreboard.find({ contest: contestId }).populate('task').populate('subtask').populate('user').exec(function(err, scoreboard){
			if(req.isSocket){
				Scoreboard.subscribe(req.socket, scoreboard);
				Scoreboard.watch(req.socket);
			}
			callback(err, scoreboard);
		});
	},



	/**
	 * Returns scoreboard to Team
	 * @param  {Object}   req      Request
	 * @param  {Int}   userId   Id of the team asking for the scoreboard
	 * @param  {Function} callback Callback function
	 */
	findScoreboardTeam: function(req, userId, callback){
		ContestService.getActiveContest(userId, function(err, contest){
			if(err){
				callback(err); return;
			}
			ScoreboardPublic.find({ contest: contest.id}).populate('task').populate('subtask').populate('user').exec(function(err, scoreboard){
				if(req.isSocket){
					ScoreboardPublic.subscribe(req.socket, scoreboard);
					ScoreboardPublic.watch(req.socket);
				}
				callback(err, scoreboard);
			});
		});
	},
	/**
	 * Returns the public scoreboard
	 * @param  {Object}   req       Request
	 * @param  {Int}   contestId Id of the contest
	 * @param  {Function} callback  Callback function
	 */
	findScoreboardPublic: function(req, contestId, callback){
		Contest.findOne(contestId).exec(function(err, contest){
			if(err){
				callback(err); return;
			}
			if(contest){
				var currentTime = new Date();
				if(new Date(contest.unfreezeTime) < currentTime){
					Scoreboard.find({ contest: contestId }).populate('task').populate('subtask').populate('user').exec(function(err, scoreboard){
						if(req.isSocket){
							Scoreboard.subscribe(req.socket, scoreboard);
							Scoreboard.watch(req.socket);
						}
						callback(err, scoreboard);
					});
				}else{
					ScoreboardPublic.find({ contest: contestId }).populate('task').populate('subtask').populate('user').exec(function(err, scoreboard){
						if(req.isSocket){
							ScoreboardPublic.subscribe(req.socket, scoreboard);
							ScoreboardPublic.watch(req.socket);
						}
						callback(err, scoreboard);
					});
				}
			}else{
				return [];
			}
		});
	}
}