angular.module('mooseJs.team',[])
	.run(function(Auth, socket, LocalService){
		if(Auth.isTeam()){
			/**
			
				- Request the active/upcoming contests for this user
				- Store the contests in LocalStorage
				- Register callbacks for modifications on sockets
			
			**/
			socket.get('/contest/user', function(data){
				LocalService.set('contests', JSON.stringify(data));
			});

			socket.on('reconnect', function(){
				console.log('recon');
				socket.get('/contest/user', function(data){
					LocalService.set('contests', JSON.stringify(data));
				});
			});

			socket.on('contest', function(message){
				var contests = JSON.parse(LocalService.get('contests'));
				console.log(message);
				if(message.verb !== 'created'){
					console.log('before');
					socket.get('/contest/user', function(data){
						console.log('after');
						LocalService.set('contests', JSON.stringify(data));
						console.log(JSON.parse(LocalService.get('contests')));
					});
				}
			});
		}
	});