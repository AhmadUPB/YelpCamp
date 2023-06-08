module.exports = func => {
    return (req, res, err) => {
        func(req, res, err).catch(next);
    }
}