function setHeaders(res, headers) {
    Object.keys(headers).forEach(key => {
        let value = headers[key];
        if (value !== null) {
            res.setHeader(key, value);
        }
    });
}
export default function () {
    return function nosniff(req, res, next) {
        setHeaders(res, {
            "X-Content-Type-Options": "nosniff"
        });
        next();
    };
}
