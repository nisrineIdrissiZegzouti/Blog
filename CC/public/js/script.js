//chargement de la liste des articles
$.get("/articles",function(data){
	for(var i=0;i<data.length;i++){
		var commentaires=data[i].commentaires;
		var titre=data[i].titre;

	   	$('section').append('<div id="divArticle'+titre+'"><div class="titre">'+titre+'</div><div class="article">'+data[i].article+'</div> <a id="id"'+titre+' class="lien" onClick="getComment('+"'"+titre+"'"+')" > Commenter </a></div>');
	
	}
	console.debug(data);
});


//Envoi du nouveau Article au serveur
$('#validerForm').on('click',function(){

	var titre=$('#articleTitre').val();
	var article=$('#articletextarea').val();
	console.debug('article:'+titre+','+article);

	$.ajax({
		url: "/articles",		
		type: "POST",
		data: { "titre": titre, "article": article}
	})
	.done(function( msg ) {

		console.log( "Data recuperée: "+ msg);

$('section').append('<div id="divArticle'+titre+'"><div class="titre">'+titre+'</div><div class="article">'+article+'</div> <a id="id"'+titre+' class="lien" onClick="getComment('+"'"+titre+"'"+')" > Commenter </a></div>');

	//	$("#acticlesExitants").append("<div class='divArticle'> "+titre+"</br>"+article+"</div>");
		$('#articleTitre').val('');
		$('#articletextarea').val('');
	     
	});
});

//Ajouter un Commentaire dans le fichier et sur ecran
function validerComment(titre){

	var comment=$('#comment'+titre).val();
	console.log(comment);
	$.ajax({
		url: "/articles/comment",		
		type: "POST",
		data: { "titre": titre, "comment": comment}
	})
	.done(function( msg ) {

		console.log( "Data recuperée: "+ msg);
		 $('#comExistants'+titre).append('<div class="com">'+comment+'</div>');
		//$('#divArticle'+titre).append('<div class="com">'+comment+'</div>');
$('#comment'+titre).val('');
	});
}



function getComment(titre){

var id='#divArticle'+titre;
console.debug(id);

	$.ajax({
		url:"/articles/getComments/"+titre,
		type:"get"
	}).done(function(comm){
	console.debug(comm);
	console.debug(typeof(comm));
	$(id).append('<div id="comExistants'+titre+'"></div>');
	for(var j=0;j<comm.length;j++){
		$('#comExistants'+titre).append('<div class="com">'+comm[j]+'</div>');
	}
	$(id).append('<div id="comment" class="comm"><textarea  id="comment'+titre+'"  name="article" cols="60" rows="2"></textarea><a 		id="validerComment" class="btn btn-default" onClick="validerComment('+"'"+titre+"'"+')">Ajouter</a></div>');


	});
}


function afficher(id)
{
  var id='#'+id;     
	if($(id).css({visibility:"hidden"})){
                $(id).css({visibility:"visible"});
		$(id).style.cssText='visibility:visible;'; 
               
        }else
               if($(id).css({visibility:"visible"})){
                $(id).css({visibility:"hidden"});
               
        }else

        {
                $(id).css({visibility:"hidden"});
	}
      
}





