var fs= require('fs');

var articles =[];

(function() {
	var data = fs.readFileSync("articles", "utf8");
	articles = JSON.parse(data);
	console.log("Articles chargé.");
})();



function save() {
	fs.writeFile("articles", JSON.stringify(articles), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Liste enregistrée.");
		}
	});
}

function find(titre) {
	var article = null;
	for ( var i = 0; i < articles.length; i++) {
		var obj = articles[i];
		if (obj.titre == titre) {
			article = obj;
			break;
		}
	}
	return article;
}

exports.list = function(req, res) {
	res.json(articles);
};



exports.ajouterArticle=function(req,res){

var article={"titre":req.body.titre,
	     "article":req.body.article,
	     "commentaires":[]
            }
          	articles.push(article);
		save();
		return res.send("fait");
 //       });
};

exports.getComments=function(req,res){
var titre=req.params.titre;
var commentaires;
	for(var i=0;i<articles.length;i++){
		if(articles[i].titre==titre){
			return res.send(articles[i].commentaires);
		}
	}
	

};

exports.setComments=function(req,res){
	var titre=req.body.titre;
	var comment=req.body.comment;
	for(var i=0;i<articles.length;i++){
		if(articles[i].titre==titre){
			articles[i].commentaires.push(comment);
			save();
			return res.send(comment);
		}
	}
};


//function Article(titre,article){

//this.titre=titre;
//this.date=null;
//this.article=article;

//};


