# KiwiScribe

## Lancer l'application

La première fois, ne pas oublier `npm install` (ou `npm i`). Puis simplement `npm start`. L'application tourne par défaut sur http://localhost:4200.

S'il y a besoin de lancer json-server pour mock le backend, lancer `json-server db.json`. La fausse BDD tourne par défaut sur http://localhost:3000.

> Dans tous les cas, ne pas oublier de mettre son terminal à la racine du projet avant de lancer les commandes.

## Architecture approximative

> Ne jamais oublier de **toujours** générer les composants avec `ng generate` (ajouter ensuite `component` ou `service`, `pipe`... puis le nom du composant à créer).

Sauf exception, tout le code ira sous `src/app` et sera découpé par page (home, profile...). Chaque page sera composée d'un composant "principal" qui organisera ses sous-composants et gèrera les données communes à ces derniers.

Chaque composant, selon sa portée, pourra communiquer avec un ou plusieurs services qui sont responsables des traitements de données.

## Plugins utiles

L'outil de développement conseillé est Visual Studio Code. Sur ce dernier, il est vivement recommandé d'installer au moins les deux extensions `Angular Language Service` et `ESLint`.