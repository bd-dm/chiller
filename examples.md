## https://www.ozon.ru/

```json
{
	"steps": [
		{
			"action": "cleanInput",
			"params": {
				"selector": "input[placeholder=\"Искать на Ozon\"]"
			}
		},
		{
			"action": "click",
			"params": {
				"selector": "input[placeholder=\"Искать на Ozon\"]"
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
				"selector": "form[action=\"/search\"] button[type=submit]"
			}
		}
	]
}
```
