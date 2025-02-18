const http = require('http');

const requestListener = (request, response) => {
    
    const { method, url } = request; // ini buat url routing
    /*setHeader ini bwt ganti tipe data yg dikirim ke header, cek tipe2 nya disini:
    https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types */
    response.setHeader('Content-Type', 'text/html'); 

    response.setHeader('Powered-By', 'Node.js');
 
    switch (url) {
        case "/":
            switch (method) {
                case 'POST':
                    response.statusCode = 200;

                    let body = [];
            
                    request.on('data', (chunk) => {
                        body.push(chunk);
                    });
                   
                    request.on('end', () => {
                        body = Buffer.concat(body).toString();
                        const { name } = JSON.parse(body);
                        name ? response.end(`<h1>Hai, ${name} ini adalah homepage/root!</h1>`)
                        : response.end(`<h1>Hai, fulan ini adalah homepage/root!</h1>`);
                    });
                break;
        
                case 'GET':
                    response.statusCode = 200;
                    response.end('<h1>Ini Read tp di homepage</h1>');
                break;
        
                case 'PUT':
                    response.statusCode = 200;
                    response.end('<h1>Ini Update tp di homepage</h1>');
                break;
        
                case 'DELETE':
                    response.statusCode = 200;
                    response.end('<h1>Ini.. y delete, di homepage :v</h1>');
                break;
        
                default:
                    response.statusCode = 200;
                    response.end('<h1>Ini request apa maksudnya le??<h1>');
                break;
            }
        break;

        /* perhatiin keterangan CRUD biar g lupa sama method html = apanya */

        case "/about":
            if(method === 'GET') {
                response.statusCode = 200;
                response.end('<h1>Halo! Ini adalah halaman about</h1>')
            } else if(method === 'POST') {
                response.statusCode = 200;
                let body = [];
        
                request.on('data', (chunk) => {
                    body.push(chunk);
                });
     
                request.on('end', () => {
                    body = Buffer.concat(body).toString();
                    const { name } = JSON.parse(body);
                    response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
                });
            } else {
                response.statusCode = 400;
                response.end(`<h1>${response.statusCode} Bad Request! ;emote_nyatir;</h1>\n\n<p>Nguawor!, halaman ini ga boleh diakses pake ${method} request</p>`);
            }
        break;

        default:
            response.statusCode = 404;
            response.end(JSON.stringify({
                message: 'Halaman tidak ditemukan!',
            }));
        break;
    }
};
 
const server = http.createServer(requestListener);
 
const port = 3000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Servernya jalan disini loh ya http://${host}:${port}`);
});
