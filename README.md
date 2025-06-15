# KiwiScribe

1. [Lancer l'application](#lancer-lapplication)
2. [Plugins utiles](#plugins-utiles)\
    2.1. [Configurer ESLint sur VSCode](#configurer-eslint-sur-vscode)
3. [Architecture approximative](#architecture-approximative)
4. [Git Workflow](#git-workflow) \
    4.1. [Introduction](#introduction) \
    4.2. [Pendant le développement](#pendant-le-développement) \
&nbsp;&nbsp;&nbsp;&nbsp;4.2.1 [Principes généraux](#principes-généraux) \
&nbsp;&nbsp;&nbsp;&nbsp;4.2.2 [Le rebase de branche](#le-rebase-de-branche) \
&nbsp;&nbsp;&nbsp;&nbsp;4.2.3 [To squash or not to squash](#to-squash-or-not-to-squash) \
&nbsp;&nbsp;&nbsp;&nbsp;4.2.4 [Exemple pas à pas](#exemple-pas-à-pas)

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

#### Principes généraux

Le développement s'effectue sur des branches de feature (ou de fix) qui sont tirées depuis `develop`.

Par principe, le nom d'une branche de feature devra être préfixé de `feat/` ou `feature/`, tandis que le nom d'une branche de correction d'anomalie sera préfixé de `fix/`. Une branche autre (mise à jour de configuration, par exemple) pourra être préfixée de `chore/`.

Une fois finalisée et testée, les branches de feature sont fusionnées (merge) sur `develop`.
Après cette opération, il ne faut pas oublier de supprimer (au moins sur le repo distant) les branches qui ont été fusionnées.

#### Le rebase de branche

> /!\\<div style="text-align: center">/!\\</div> \
> Le `rebase` n'est autorisé **que** sur **ses propres branches de feature** et **jamais** sur une branche partagée comme `develop` ou `main`. \
> /!\\

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

#### To squash or not to squash

Lors d'un `merge`, l'option `--squash` permet de fusionner tous les commits en un seul (+ un 'commit de merge' donc techniquement deux).

Par principe, il vaut mieux éviter le squash pour conserver un historique git complet. Toutefois, si une branche de feature contient trop de commits redondants ou inintéressants ("feature OK", "feature OK final" et "feature OK final final" par exemple), alors elle peut être "squashée".

Toujours par principe, on préférera tout de même au squash le rebase interactif (`rebase -i`)

#### Exemple pas à pas

Exemple de développement d'une feature basique via le prisme des commandes `git` qui seront jouées lors du processus :

```bash
git switch develop # On se place sur develop si on y est pas déjà
git pull # On récupère les derniers commits s'il y en a
git switch -c feature/Ma_feature # On crée sa branche de développement
# Bla bla on développe
git add -A # On ajoute tout ce qu'on a développé
git commit -m "feature/Ma_feature" # On commit ; les deux dernières étapes peuvent être répétées pour découper la feature en plusieurs commits selon sa logique, auquel cas il faudra 'git add' certains fichiers spécifiques à chaque fois
git switch develop # On revient sur develop pour mettre à jour la branche locale
git pull # On met à jour
git switch feature/Ma_feature # On revient sur notre branche ; si on y était juste avant de passer sur develop, on peut aussi écrire 'git switch -'
git rebase develop # Si trop complexe, utiliser 'git merge develop' à la place
git push --force-with-lease # Uniquement en cas de rebase et après être arrivé au bout des 'git rebase --continue' ; en cas de merge, il faut 'git commit' pour finir le merge après avoir réglé les conflits
git switch develop
git merge feature/Ma_feature # Pour rapatrier les développements sur develop
```