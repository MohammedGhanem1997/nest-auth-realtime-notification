module.exports =  {
    "type": process.env.DB_TYPE ,
    "host": process.env.DB_HOST,
    "port": parseInt(process.env.PG_PORT),
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": false,
    "logging": false,
    "entities": [
       __dirname +"/**/entities/*.entity.{ts,js}"
    ],
    "migrations": [
       __dirname +"/migration/**/*.{js,ts}"
    ],
    "subscribers": [
       "src/subscriber/**/*.{js,ts}"
    ],
   //  specify the directory with which all our migration, entity and subscription files will be created when we run their respective cli command
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 }