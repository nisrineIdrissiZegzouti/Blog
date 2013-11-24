var express = require('express')
  , http = require('http')  // serveur http
  , path = require('path')
  ,accueil = require('./routes/accueil')  // routes par defaut
  , socketio = require('socket.io')  // utilisation du push
, article = require('./routes/article');
 

var app = express();


// le port utilisé est soit la variable d'environnement "PORT" soit 3000
app.set('port', process.env.PORT || 3000);
// les vues seront placées dans le répertoire views
app.set('views', __dirname + '/views');
// utilisation du moteur de templates "ejs"
app.set('view engine', 'ejs');
// definition de l'icone "favicon"
app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
// affichage des logs pour developpement
app.use(express.logger('dev'));
// analyse le contenu des requetes et fournit req.body
app.use(express.bodyParser());
//  permet l'utilisation de app.put et app.delete
app.use(express.methodOverride());
// utilisation du router pour diriger les requetes
app.use(app.router);
// defini le répertoire contenant le contenu statique
app.use(express.static(path.join(__dirname, 'public')));


// page d'accueil
app.get('/',accueil.index);
// creation d'un nouveau article
app.post('/articles', article.ajouterArticle);
app.get('/articles', article.list);
app.get('/articles/getComments/:titre',article.getComments);
app.post('/articles/comment',article.setComments);




// creation du serveur http
var server = http.createServer(app);

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// démarrage du serveur http
server.listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
