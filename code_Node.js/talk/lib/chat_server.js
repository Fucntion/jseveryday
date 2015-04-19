var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function (sever){
	io = socketio.listen(server);
	io.set('log level',1);
	io.sockets.on('connection',function(socket){
		guestNumber = assignGuestName(socket,guestNumber,nickNames,namesUsed);
		joinRoom(socket,'Lobby');
		handleMessageBroadcasting(socket,nickNames);
		handleNameChangeAttempts(socket,nickNames,namesUsed);
		handleRoomJoining(socket);
		socket.on('rooms',function(){
			socket.emit('rooms',io.sockets.manager.rooms);
		});
		handleClientDisconnextion(socket,nickNames,namesUsed);
	});
};

function assignGuestName(socket,guestNumber,nickNames,namesUsed){
	var name = 'Guest' + guestNumber;
	nickNames[socket.id] = name;
	socket.emit('nameResult',{success:true,name:name});
	namesUsed.push(name);
	return guestNumber+1; 
}
function joinRoom(socket,room){
	socket.join(room);
	currentRoom[socket.id] = room;
	socket.emit('joinResult',{room:room});
	socket.broadcast.to(room).emit('message',{
		text:nickNames[socket.id] + '加入房间' + room + '.'
	});
	
	var userInRoom = io.sockets.clients(room);
	if(userInRoom.length>1){
		var userInRoomSummary = 'User currently in' + room + ':';
		for(var index in usersInRoom){
			var userScoketId = usersInRoom[index].id;
			if(userScoketId != socket.id){
				if(index>0){
					userInRoomSummary+=",";
				}
				userInRoomSummary += nickNames[userScoketId];
			}
		}

	}
}

function handleNameChangeAttempts(socket,nickNames,namesUsed){
	socket.on('nameAttempt',function(name){
		if(name.indexOf('Guest')==0){
			socket.emit('nameResult',{success:false,message:"名字不能用什么什么开头傻逼"});
		}else{
			if(namesUsed.indexOf(name)==-1){
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];
				socket.emit('nameResult',{success:true,name:name});
				socket.broadcast.to(currentRoom[socket.id].emit('message'),{
					text:previousName + 'is no know as '+name+'.'
				});
			}else{
				socket.emit('nameResult',{
					success:false,message:'That name is already in use.'
				});
			}
		}
	});
}

function handleMessageBroadcasting(socket){
	socket.on('message',function(message){
		socket.broadcast.to(message.room).emit('message',{text:nickNames[socket.id]+":"+message.text});
	});
}

function handleRoomJoining(socket){
	socket.on('join',function(room){
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket,room.newRoom);
	});
}

function handleClientDiscounnection(socket){
	socket.on('disconnect',function(){
		var nameIndex=namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}
