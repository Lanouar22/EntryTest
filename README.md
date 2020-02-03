# EntryTest

Cet API a été réalisé avec node et express

# Comment utiliser le projet :

* git clone "url_du_project"
* npm install
* npm start
* utiliser curl ou postman ou firefox developper edition pour aller à l'url : http://localhost:50041/api/flights

# Solutions des problématiques :

Provider Air Moon frequently takes a long time to respond (but it does send back data). Depending on the way you developed the API it may have performance impacts on the whole search. How would you take care of this ?

==> On utilise la commande "Promise.all" pour chercher (fecth) les 3 différents API en parallèle (non-blocking actions). Donc, on a besoin des 3 résponses pour avoir le résultat final.


Provider Air Jazz has downtime issues from time to time, and returns a HTTP 502 Bad Gateway error. Once again, how would you handle this so it does not penalize the whole API.

==> Si on ne peut pas obtenir un résultat normal de la part de l'un des APIs, on doit le bloquer pour ne pas pénaliser tout le projet. Donc, l'API erroné va retourner une table vide pour assurer le bon fonctionnement de l'API  global en utilisant seulement 2 api externes.


The API we just created is to be used by our partners. How would you handle security ? We need to make sure only authenticated users (and authorized) can access this API.

==> On peut utiliser un clé API "API Key" d'authentification qu'on peut créer à l'aide du module Express Gateway.( Création des comptes utilisateurs basé sur un clé api)


# Suggestions pour les problématiques non réalisés
We would want to rate limit our API, so each of our client has a limited number of allowed calls. How would you handle this ?

==> On peut utiliser le module express-rate-limit npm pour limiter les connextions de chaque client.


Imagine we now have a lot of incoming traffic on our API, and there is some overlap on the search requests. How could we improve the program ?

==>On peut créer un cache qui garde les données de l'api global pendant 30 secondes avant qu'il soit refréché et qu'il cherche un autre fois les 3 API externes. Pendant le temps choisi, tous les requetes vont recevoir les même résultats.
