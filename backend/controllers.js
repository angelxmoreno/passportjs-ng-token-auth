/* global module */
module.exports = function (app, express, models) {
    var AuthController = function () {
        var router = express.Router();
        router.get('/github', app.get('passport').authenticate('github'));
        router.get('/github/callback', app.get('passport').authenticate('github', {
            failureRedirect: '/login'
        }), function (req, res) {
            res.render('callback', {
                user: req.user.get({
                    plain: true
                }),
                auth_token: UserModel.createJWT(req.user),
                created: req.user.isNew || false
            });
        });
        router.get('/validate_token', app.get('passport').authenticate('jwt', {session: false}), function (req, res) {
            var token = req.headers['access-token'] || {};
            res.send(req.user);
        });
        router.delete('/logout', function (req, res) {
            res.status(200).end();
        });
        return router;
    };

    var UserController = function () {
        var router = express.Router();
        router.get('/', function (req, res) {
            res.send('hello');
        });
        return router;
    };

    app.use('/auth', AuthController());
    app.use('/user', UserController());
}