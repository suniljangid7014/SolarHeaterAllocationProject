var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('./src/backend/db.json')
var middlewares = jsonServer.defaults()
var cookieParser = require("cookie-parser");
server.use(cookieParser());
server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/getSolarHeaterIds', function (req, res, next) {
    res.redirect('/Solarheaterallocation')
})

server.get('/getSolarHeaterIds/:id', function (req, res, next) {
    res.cookie('solarHeaterId', req.params.id)
    res.redirect('/getSolarHeaterIds');
})

router.render = (req, res, next) => {
    if (req.method == "POST" && req.url == "/Solarheaterallocation") {
        let obj = res.locals.data;
        res.json({ "message": `Solar Heater${obj.solarHeaterId} successfully allocated to customer ${obj.customerid}` });
    }
    if (req.method == "GET" && req.url.includes('/Solarheaterallocation')) {
        if (req.cookies.solarHeaterId) {
            let solarHeater;
            res.locals.data.forEach(element => {
                if (element.solarHeaterId == req.cookies.solarHeaterId)
                    solarHeater = element;
            });
            res.clearCookie('solarHeaterId')
            res.json(solarHeater)
        }        
        else {           
            // let solarHeaterIds = [];
            // res.locals.data.forEach(element => {
            //     solarHeaterIds.push(element.solarHeaterId)
            // });
            res.clearCookie('solarHeaterId')
            res.json(res.locals.data)
        }
    }
}



server.use(router)


server.listen(3000, function () {
    console.log('JSON Server is running')
})