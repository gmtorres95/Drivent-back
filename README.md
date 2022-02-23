# <img src="https://github.com/gmtorres95/Drivent-front/blob/main/public/favicon.png" height="24px" /> Driven.t (back-end)

Driven.t is a web browser application with which you can manage every single aspect of your event.  
Check the front-end of this application [here](https://github.com/gmtorres95/Drivent-front)  
Link of the API: https://back-drivent.herokuapp.com/  

## Technologies

<div styles="display: flex">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeORM-E93524?style=for-the-badge&logo=typeorm&logoColor=3E3E3E" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white" height="28px" />
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
</div>

## How to run
1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database  
4. Configure the `.env` file using the `.env.example` file
5. Run all migrations

```bash
npm run migration:run
```

6. Run the back-end in a development environment:

```bash
npm run dev
```

7. Or build it and run it in production environment:

```bash
npm run build
npm start
```

## Scripts that makes life easier
- `dev`: runs the back-end in development mode, watching file changes (with `npm run dev`). ESLint errors will stop the back-end from running
- `build`: generates the JavaScript version for this project (with `npm run build`). ESLint errors will stop the bundle from being created
- `migration:generate`: generates new migrations from typescript in a single step (with `npm run migration:generate -- -n MigrationName`)
- `migration:run`: runs all pending migrations (with `npm run migration:run`)
- `eslint:fix`: runs eslint fixing everything eslint can automatically fix
- `seed`: runs database seed files in `src/seeders` to populate database automatically (with `npm run seed`). Will prompt which seed files should run
