import socketio from 'socket.io-client';

const socket = socketio('http://200.0.0.107:5000', {
    autoConnect: false,
});

function connect(latitude, longitude, techs) {
    // send to BackEnd this Paramste
    socket.io.opts.query = { 
        latitude,
        longitude,
        techs,
     }

    socket.connect()
}

function disconnect() {
    if(socket.connected)
    socket.disconnect()
}

export{
    connect,
    disconnect
}