export default function (text) {
    return function hello(req, res) {
        res.end(text);
    };
}
