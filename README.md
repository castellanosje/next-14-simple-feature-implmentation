# Development
Pasos para levantar ambiente de desarrollo


* 1.Levantar la base de datos
````
docker compose up -d
````
* 2. Crear una copia de .env.template y renombrarlo como .env
* 3. Reemplazar las variables de entorno

`````
npm install
npm run dev
`````
* 4. ejecutar migraciones de prisma
`````
npx prisma migrate dev
npx prisma generate
`````
* 5. ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)


# Prisma commands

`````
npx prisma init
npx prisma migrate dev
npx prisma generate
`````