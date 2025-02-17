

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. create database in mysql
   the name of database is esag_mag

3. create .env file
    for example
    
4. migrate database
   ```bash
    npx sequelize-cli db:migrate
   ```
5. start server
   ```bash
    npx start
   ```

  ***NOTE***
   dans tes repertoires , le dossier config , le fichier config.json tu renseigne les onformations concernant ta base de données

   ***Quelques commandes***
   ```bash
   npx sequelize-cli db:migrate
   ```
   ```bash
   npx sequelize-cli db:migrate:undo
   ```
   ```bash
   npx sequelize-cli db:migrate:undo:all
   ```