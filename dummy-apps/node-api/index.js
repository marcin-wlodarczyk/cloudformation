const http = require('http');
const PORT = 80;

http.createServer(async (req, res) => {
    const str = `${req.method} => ${req.url}`;
    console.log(str);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(str);
    res.end();
}).listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});