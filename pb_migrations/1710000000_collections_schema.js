/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
    const collection = new Collection({
        "id": "themes_setup_001",
        "created": "2024-03-20 12:00:00.000Z",
        "updated": "2024-03-20 12:00:00.000Z",
        "name": "themes",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "theme_name",
                "name": "name",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 2000000
                }
            },
            {
                "system": false,
                "id": "theme_desc",
                "name": "description",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 2000000
                }
            },
            {
                "system": false,
                "id": "theme_icon",
                "name": "icon",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "theme_color",
                "name": "color",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "theme_topics",
                "name": "topics",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 10000000
                }
            },
            {
                "system": false,
                "id": "theme_methodology",
                "name": "methodology",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 10000000
                }
            },
            {
                "system": false,
                "id": "theme_cases",
                "name": "cases",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 10000000
                }
            },
            {
                "system": false,
                "id": "theme_flashcards_pro",
                "name": "flashcardsPro",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 10000000
                }
            },
            {
                "system": false,
                "id": "theme_flashcards_simple",
                "name": "flashcardsSimple",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 10000000
                }
            },
            {
                "system": false,
                "id": "theme_flashcards_exam",
                "name": "flashcardsExam",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 10000000
                }
            },
            {
                "system": false,
                "id": "theme_vocabulary",
                "name": "vocabulary",
                "type": "json",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSize": 10000000
                }
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "options": {}
    });

    return Dao(db).saveCollection(collection);
}, (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("themes");

    return dao.deleteCollection(collection);
})
