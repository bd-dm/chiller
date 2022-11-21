## https://www.ozon.ru/

```json
{
	"variables": {
		"searchInput": "input[placeholder=\"Искать на Ozon\"]",
		"searchButton": "form[action=\"/search\"] button[type=submit]"
	},
	"steps": [
		{
			"action": "clearInput",
			"params": {
				"target": {
					"use": "searchInput"
				}
			}
		},
		{
			"action": "click",
			"params": {
				"target": {
					"use": "searchInput"
				}
			}
		},
		{
			"action": "typeRandom",
			"params": {
				"variants": [
					"Кружка с лягушкой Pepe",
					"Годовой набор носков",
					"Паззлы с Пеппой",
					"Трава с полей",
					"Зеленый слоник"
				]
			}
		},
		{
			"action": "click",
			"params": {
				"target": {
					"use": "searchButton"
				}
			}
		}
	]
}
```
