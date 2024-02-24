const socketIO = require('socket.io');

function initializeSocketIO(server) {
    const io = socketIO(server,{
        connectionStateRecovery: {}
    });
    var userId ={};
    io.on('connection', (socket) => {
        console.log(`Client connected ${socket.id}`);
        socket.on('userId',(id)=>{
            userId[id] = socket.id;
            console.log(userId);
        })
        
        socket.on('bookedServiceCenter',(msg)=>{
            const serviceCenterId = msg.centerId;
            if(serviceCenterId in userId){
                io.to(userId[serviceCenterId]).emit('bookedServiceCenter',msg)
            }
            else{
                console.log('center not found');
            }
            
        })
        socket.on('roadSideService',(msg)=>{
            const serviceCenterId = msg.centerId;
            if(serviceCenterId in userId){
                io.to(userId[serviceCenterId]).emit('bookedServiceCenter',msg)
            }
            else{
                console.log('center not found');
            }
            
        })
    });
}

module.exports = initializeSocketIO;
