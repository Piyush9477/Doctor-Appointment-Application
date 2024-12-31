const http = require('http');
const app = require('./app');

//create server
const server = http.createServer(app);

// Make the server listen on the port specified in the environment variables and log a message indicating the server is running and the port it's using
server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)); 