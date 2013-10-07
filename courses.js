exports.action = function(data, callback, config, SARAH){


 // lire liste des course

  if(data.commande=="lire")
	{

		var fs = require('fs');
		fs.readFile("./plugins/courses/liste.txt", function(err, liste){
			if (err || liste=="") callback({'tts': "il n'y a pas de liste de course"});
			else callback({'tts': liste});	
		});
		return;
	}




// ajouter produit par code barre
		if(data.code)
		{

			var url = "http://fr.openfoodfacts.org/api/v0/produit/"+data.code+".json";
			
			var request = require('request');
			request({ 'uri' : url}, function (err, response, body)
			{
				if (err || response.statusCode != 200)
				{
				  callback({'tts': "Je n'ai pas trouvé d'information sur le produit"});
				  SARAH.speak("Je n'ai pas trouvé d'information sur le produit");
				  return;	
				  
				}
				var produit = JSON.parse(body);
				var status = produit.status_verbose
				
				if (status=="product not found")
				{
				  callback({'tts': "Je n'ai pas trouvé d'information sur le produit"});
				  SARAH.speak("Je n'ai pas trouvé d'information sur le produit");
				  return;	
				}
							  
				var fs = require('fs');
				fs.appendFile("./plugins/courses/liste.txt", produit.product.product_name+", \r\n", function(err) {
					if(err) 
					{
						console.log(err);
					} 
					else 
					{
						callback({'tts': produit.product.product_name+" ajouté"});
						SARAH.speak(produit.product.product_name+" ajouté");
					}
				}); 
			});
		  
			return;	
		}
		
		
// ajouter produit saisie
		if(data.sasie)
		{							  
				var fs = require('fs');
				fs.appendFile("./plugins/courses/liste.txt", produit.product.product_name+", \r\n", function(err) {
					if(err) 
					{
						console.log(err);
					} 
					else 
					{
						callback({'tts': data.sasie +" ajouté"});
						SARAH.speak(data.sasie +" ajouté");
					}
				}); 		  
			return;	
		}		
  
  
// imprime la liste des courses
	if(data.commande=="imprime")
	{
	cmd.exe
			// je ne vois pas comment imprimer le fichier  "./plugins/courses/liste.txt"
			
	}

// supprime la liste des courses
	if(data.commande=="supprime")
	{
			var fs = require('fs');
			fs.unlink("./plugins/courses/liste.txt", function(err) 
			{
				if(err) 
				{
					console.log(err);
					callback({'tts': "je n'ai pas réusie a supprimer la liste des course"});
				} 
				else 
				{
					console.log("liste course supprimé");
					callback({'tts': "j'ai supprimé la liste des courses"});
				}
			}); 
		  
		return;	
	}




  
  
  callback({});
  
  
  
}

