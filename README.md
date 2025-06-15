# KiwiScribe

1. [Lancer l'application](#lancer-lapplication)
2. [Plugins utiles](#plugins-utiles)\
    2.1. [Configurer ESLint sur VSCode](#configurer-eslint-sur-vscode)
3. [Architecture approximative](#architecture-approximative)
4. [Git Workflow](#git-workflow)
    4.1 [Introduction](#introduction)
    4.2 [Pendant le développement](#pendant-le-développement)

## Lancer l'application

La première fois, ne pas oublier `npm install` (ou `npm i`). Puis simplement `npm start`. L'application tourne par défaut sur http://localhost:4200.

S'il y a besoin de lancer json-server pour mock le backend, lancer `json-server db.json`. La fausse BDD tourne par défaut sur http://localhost:3000.

> Dans tous les cas, ne pas oublier de mettre son terminal à la racine du projet avant de lancer les commandes.

## Plugins utiles

L'outil de développement conseillé est Visual Studio Code. Sur ce dernier, il est vivement recommandé d'installer au moins les deux extensions `Angular Language Service` et `ESLint`.

### Configurer ESLint sur VSCode

Attention, selon vos réglages actuels de VSCode, ESLint peut ne pas ou mal fonctionner. Il faut donc changer les valeurs suivantes dans les réglages (directement dans le settings.json ou via l'interface) :

```json
"eslint.format.enable": true,
"eslint.useFlatConfig": true,
"eslint.useESLintClass": true
```

> (En modifiant les options via l'interface VSCode, rentrez les noms ci-dessus dans la barre de recherche pour plus de simplicité.)

Enfin, si vous n'aimez pas le réglage par défaut qui surligne toutes les lignes en erreur (dans le cas où l'erreur faut plusieurs lignes), modifiez également cette option :

```json
"eslint.problems.shortenToSingleLine": true
```

## Architecture approximative

> Ne jamais oublier de **toujours** générer les composants avec `ng generate` (ajouter ensuite `component` ou `service`, `pipe`... puis le nom du composant à créer).

Sauf exception, tout le code ira sous `src/app` et sera découpé par page (home, profile...). Chaque page sera composée d'un composant "principal" qui organisera ses sous-composants et gèrera les données communes à ces derniers.

Chaque composant, selon sa portée, pourra communiquer avec un ou plusieurs services qui sont responsables des traitements de données.

## Git Workflow

### Introduction

Ce projet utilise [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) à titre de modèle, sans qu'il soit nécessaire d'en suivre toujours les règles dans la pratique.

Concrètement, le projet s'articule principalement autour des branches `main` et `develop`, la première étant mise à jour depuis la seconde à chaque fois qu'une *release* doit être déployée.

### Pendant le développement

Le développement s'effectue sur des branches de feature (ou de fix) qui sont tirées depuis `develop`. \
Par principe, le nom d'une branche de feature devra être préfixé de `feat/` ou `feature/`, tandis que le nom d'une branche de correction d'anomalie sera préfixé de `fix/`. Une branche autre (mise à jour de configuration, par exemple) pourra être préfixée de `chore/`.

Il est fortement conseillé de `rebase` sa branche depuis develop avant de merge, de la façon suivante :

```bash
git switch develop
git pull
git switch feature/Ma_feature
git rebase develop
```

Ce `rebase` permet de mettre à jour sa branche des modifications qui ont potentiellement été faites sur develop depuis sa création, en reprenant le dernier commit de `develop` puis en rejouant tous les commits de la branche de feature à sa suite. Visuellement, cela donne ceci :

![Explication visuelle de git rebase](https://wac-cdn.atlassian.com/dam/jcr:4e576671-1b7f-43db-afb5-cf8db8df8e4a/01%20What%20is%20git%20rebase.svg?cdnVersion=2777)

Si un `rebase` est trop complexe ou trop long (par exemple à cause du nombre de conflits), un `git merge` suffit.

Enfin, ne pas oublier de supprimer (au moins sur le repo distant) les branches qui ont été fusionnées (merge).