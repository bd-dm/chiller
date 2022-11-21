## https://www.ozon.ru/

```json
{
	"variables": {
		"searchInput": "[aria-label=\"Введите запрос\"]",
		"searchButton": "[id=\"search-icon-legacy\"]",
		"video": "a[href=\"/watch?v=gSLZGm9MO8c\"]"
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
		},
		{
			"action": "waitForElement",
			"params": {
				"target": {
					"use": "video"
				}
			}
		},
		{
			"action": "click",
			"params": {
				"target": {
					"use": "video"
				}
			}
		}
	]
}
```
