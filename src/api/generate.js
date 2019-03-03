[
	"{{repeat(200)}}",
	{
		id: "{{index([0])}}",
		image: "./images/item-{{integer([1], [9])}}.png",
		name: "{{surname()}}",
		type:
			"{{random(['Общественные'], ['Информационные'], ['Развлекательные'])}}",
		country: "{{country()}}",
		broadcastType: "{{random(['Антенна'], ['Cпутник'])}}",
		quality: "{{random(['Высокое'], ['Среднее'], ['HD'])}}",
	},
];
