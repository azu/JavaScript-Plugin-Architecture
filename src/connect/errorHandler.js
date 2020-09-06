export default function () {
    return function errorHandling(err, req, res, next) {
        res.writeHead(404);
        res.write(err.message);
        res.end();
        next();
    };
}
