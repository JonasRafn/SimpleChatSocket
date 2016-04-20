module.exports = function (io) {
    var users = [];

    io.on('connection', function (socket) {
        var username = "anonymous" + Math.floor(Math.random() * (1000 - 0) + 1);
        users.push(username);
        socket.userName = username;
        console.log("User logged in");

        io.emit('init', {msg: "hello from server", users: users});

        socket.on('sendMsg', function (msg) {
            var d = new Date();
            var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
            io.emit("msg", {msg: msg.msg, username: socket.userName, time: time});
        });

        socket.on('changeUsername', function (username) {
            var index = users.indexOf(socket.userName);
            users.splice(index, index + 1, username);
            socket.userName = username;
            io.emit("users", users);
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
            var index = users.indexOf(socket.userName);
            users.splice(index, index + 1);
            io.emit("users", users);
        });
    });
};