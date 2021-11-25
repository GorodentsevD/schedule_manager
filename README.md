## Description

Schedule manager 

Приложение - менеджер отложенных задач. Разработан интерфейс для создания, обновления и удаления cron задач.

## API

>curl http://0.0.0.0:3000/tasks - Получение списка задач

>curl http://0.0.0.0:3000/tasks/<task_id> - Получение задачи по идентификатору

>curl -X DELETE http://0.0.0.0:3000/tasks/<task_id> - Удаление задачи по идентификатору

>curl -X POST http://0.0.0.0:3000/tasks -H 'Content-type: application/json' -d '```{"time": "* * * * *", "func": "testFunc", "is_active": true, "type": "cron"}```' - Создание задачи

>curl -X PATCH http://0.0.0.0:3000/tasks/<task_id> -d '```{"time": "* * * * *", "func": "testFunc", "is_active": true, "type": "cron"}```' - обновление задачи

### Params

>**time** - время в cron представлении

>**func** - алиас функции, которую будет запускать задача

>**is_active** - статус задачи 

>**type** - тип времени выполнения задачи. В данный момент реализован только cron 


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```