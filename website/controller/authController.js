function userAuthorised(req, res) {
    let userName;
    if (typeof req.headers.cookie != "undefined") {
        let cookieList = req.headers.cookie.split('; ');
        cookieList.forEach(function (value) {
            if (value.includes('username='))
                userName = value.split('username=')[1];

        })
    }
    return userName;
}

module.exports = { userAuthorised }
