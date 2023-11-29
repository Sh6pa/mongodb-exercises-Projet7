// 1 Quels sont les différents bases de données atteignable via cette connexion ? Quelle commande permet de les afficher?
/**
 * Les différentes bases de données atteignables avec cette connexion sont :
exercises           192.00 KiB
group_1             216.00 KiB
group_10            200.00 KiB
group_11            200.00 KiB
group_12            200.00 KiB
group_13            200.00 KiB
group_2             216.00 KiB
group_3             200.00 KiB
group_4             200.00 KiB
group_5             216.00 KiB
group_6             216.00 KiB
group_7             200.00 KiB
group_8             200.00 KiB
group_9             232.00 KiB
nomdegroupe         360.00 KiB
sample_airbnb        52.20 MiB
sample_analytics      9.61 MiB
sample_geospatial     1.27 MiB
sample_guides        40.00 KiB
sample_mflix        113.43 MiB
sample_restaurants    6.39 MiB
sample_supplies       1.05 MiB
sample_training      48.20 MiB
sample_weatherdata    2.59 MiB
test                 40.00 KiB
admin               288.00 KiB
local                 6.64 GiB
 * La commande pour les afficher est show databases
 */

// 2 Allez dans la BDD "exercices". Quelle commande permet de se déplacer à une nouvelle base de données. Que se passe-t-il si cette base n'existe pas ?
/**
 * use *le nom de la database*
 * Si la base de donnée n'existe pas pas d'erreur mais entre dans le chemin écrit.
 * 
 */

// 3 Quelles sont les différentes collections présentes dans cette BDD ? Quelle commande permet de les afficher.
/**
 * show collections
bel20
cheeses
irons
laptops
 */

// 4 Quelle est la commande nécessaire pour affichez la liste des documents d'une des collections.
/**
 * db.nomDeLaCollection.find()
 * ex : db.bel20.find()
 */

// Vous allez maintenant changer de BDD pour pouvoir travailler sur vos propres documents.
// Pour cela, utilisez la commande la commande de la question 2 pour ouvrir la BDD qui porte les noms des membre de votre groupe ou le numéro de votre groupe.
// Si aucune BDD ne correspond à cette description, contactez-moi :)
