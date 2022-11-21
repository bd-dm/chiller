## https://www.ozon.ru/

```json
{
	"variables": {
		"searchInput": "[aria-label=\"Введите запрос\"]",
		"searchButton": "[id=\"search-icon-legacy\"]"
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
