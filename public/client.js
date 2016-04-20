angular.module("app", [
        'btford.socket-io'
    ])

    .controller("chatController", function (socket) {
        socket.connect();
        var scope = this;
        scope.tester = "Welcome";
        scope.messageList = [];
        scope.userList = [];

        socket.on('init', function (msg) {
            scope.userList = msg.users;
        });

        socket.on('msg', function (msg) {
            scope.messageList.push(msg);
        });

        socket.on('users', function(userList) {
           scope.userList = userList;
        });

        scope.sendMessage = function () {
            socket.emit('sendMsg', {msg: scope.message});
        };

        scope.submitUsername = function() {
            socket.emit('changeUsername', scope.newUsername);
        };
    })

    .factory("socket", ['socketFactory', function (socketFactory) {
        return socketFactory();
    }]);