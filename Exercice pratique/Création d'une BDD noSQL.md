## Tâches à Réaliser

Dans ces exercices, nous allons simuler la mise en place d'une base de données pour un système de livraison de nourriture, en utilisant des collections pour stocker des informations sur les utilisateurs, les restaurants, les produits, les commandes et les livraisons.

## Livrables
- Complétez le document suivant avec vos réponses et vos analyses. Vous pourrez ensuite me transférer le fichier markdown (.md) par mail à  l'adresse : quentin.dubourg@diteschool.fr.
- Créez les collections demandées sur la BDD MongoDB de votre groupe. Je pourrais vérifier de mon côté que les bases correspondent.

## La base de données
Ci-dessous, vous pouvez consulter la base de données d'un service de livraison de nourriture. Cette base de données encapsule diverses entités essentielles pour un fonctionnement fluide du service de livraison. Voici les données présentées sous forme de tableaux : 

**UTILISATEURS**
| UserID | Nom     | Prénom | Adresse                    | Numéro de téléphone | Adresse e-mail           |
|--------|---------|--------|----------------------------|---------------------|--------------------------|
| 1      | Dupont  | Jean   | 123 Rue de la République   | 0123456789          | jean.dupont@email.com   |
| 2      | Martin  | Marie  | 456 Avenue des Fleurs      | 0987654321          | marie.martin@email.com  |
| 3      | Martin  | Claude  | 456 Avenue des Fleurs      | 0987654321          | claude.martin@email.com  |


**RESTAURANTS**
| RestaurantID | Nom du restaurant | Adresse du restaurant          | Numéro de téléphone du restaurant | Type de cuisine | Heures d'ouverture       |
|--------------|-------------------|---------------------------------|------------------------------------|-----------------|--------------------------|
| 101          | Chez Paul         | 789 Boulevard des Gourmets      | 1112223333                         | Française       | 10:00 - 22:00           |
| 102          | Sushi Express     | 234 Rue des Sushis              | 4445556666                         | Japonaise       | 11:00 - 23:00           |

**PRODUITS**
| ProductID | Nom du produit      | Description                     | Prix  | RestaurantID |
|-----------|---------------------|---------------------------------|-------|--------------|
| 201       | Boeuf Bourguignon   | Plat traditionnel français       | 15.99 | 101          |
| 202       | Sashimi Mix         | Assortiment de sashimis          | 20.99 | 102          |

**COMMANDES**
| OrderID | UserID | Date de commande         | Statut    |
|---------|--------|--------------------------|-----------|
| 301     | 1      | 2023-01-15 12:30:00     | En cours  |
| 302     | 2      | 2023-01-16 18:45:00     | Livrée    |

## À vous de jouer
#### Création des collections et insertion de documents

- À l'intérieur de votre base de données, créez quatres collections: "utilisateurs", "restaurants", "commandes" et "produits".

#### Insertion de données

- Dans la collection "utilisateurs", insérez au moins trois documents représentant des utilisateurs fictifs.
- Dans la collection "restaurants", insérez au moins deux documents représentant des restaurants fictifs avec leurs détails.
- Dans la collection "produits", insérez au moins deux documents représentant des produits fictifs avec leurs détails.
- Dans la collection "commandes", insérez au moins deux documents représentant des produits fictifs avec leurs détails.

#### Requêtes de recherche

- Écrivez une requête pour récupérer tous les utilisateurs de la collection "utilisateurs".

`Votre réponse..` 

    db.utilisateurs.find();

- Écrivez une requête pour récupérer toutes les commandes datées du 16 janvier 2023. À grande echelle, cette requête est-elle efficace ? Pourquoi ?

`Votre réponse..` 

    db.commandes.find({ "Date de commande" : { "$gte" : ISODate("2023-01-16T00:00:00Z"), "$lte" : ISODate("2023-01-16T23:59:59Z") }})
    
    A grande échelle cette requète perds énormément en efficacité car le nombre de résultat n'est pas limité, donc tout le fichier va devoir être lu.
    Le document a beau être indéxé, les dates sont compliqué sous ce format, il faudrait déjà stocker les dates en timestamp pour une meilleure indexation.

#### Mise à jour de données

- Modifiez le document d'un utilisateur pour mettre à jour son adresse e-mail (choisissez une nouvelle adresse mail).
- Modifiez le document du restaurant Sushi Express pour ajouter un champ "fermeture" avec la date du "01/12/2023". Une opération pareille aurait-elle été possible en SQL ?

`Votre réponse..` 

    db.utilisateurs.updateOne({"Adresse e-mail": "claude.martin@email.com"}, {$set: {"Adresse e-mail": "456AvenuedesFleurs@email.com"}})

    db.restaurants.update({ "Nom du restaurant": "Sushi Express" }, { $set: {"fermeture": "01/12/2023" }}, { upsert: 1 })

    Ajouter un champs en sql est possible, cependant on aurait dû ajouter ce champs comme colonne et donc à tous les éléments, une opération donc très coûteuse si la base de donnée est grande ainsi que la difficulté de devoir initialiser cette valeur.

- Supprimez le restaurant Sushi-express. Remarquez-vous une incohérence dans l'ensemble de base de donnée ?

`Votre réponse..` 

    db.restaurants.deleteOne({ "Nom du restaurant": "Sushi Express" })

    Non, il reste bien les autres restaurants qui n'ont donc pas le champs fermeture. 

#### Agrégation de données
Ressource utile : https://www.mongodb.com/docs/manual/core/map-reduce/ https://www.youtube.com/watch?v=cHGaQz0E7AU https://www.youtube.com/watch?v=fEACZP_878Y
- Utilisez l'agrégation pour trouver la moyenne des prix des produits.
 
`Votre réponse..`

    db.produits.aggregate([{$group: {_id:null, averageCost: {$avg:"$Prix"}}} ])

- Utilisez l'agrégation pour regrouper les utilisateurs par adresse et compter combien d'utilisateurs ont la même adresse.
 
`Votre réponse..` 

    db.utilisateurs.aggregate([ { $group: { _id: "$Adresse", count: { $sum: 1}}}, { $sort: { count: -1 }} ])

- En considérant le fait que MongoDB dispatch ses données sur plusieurs serveurs, en quoi cette méthode "d'agrégation" permet à MongoDB de travailler efficacement ?


`Votre réponse..` 
    
    Car elle permet de joindre les données des différents fichiers pour agréger uniquement les données nécessaire en clé/valeur. On ne va demander d'extraire au fichier uniquement les données demandées (donc uniquement dans ce cas là l'adresse des utilisateurs, plus de rapidité et moins de transit de donné). Avec ce nouveau jeu Clé/Valeur, clé étant la valeur obtenu du fichier et la nouvelle valeur 1 afin de pouvoir cumuler les opérations simples et rapides pour l'ordinateur (faire des moyennes/sommes).

