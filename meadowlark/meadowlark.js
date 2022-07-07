const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();

//настройка механизма представлений Handlebars

app.engine("handlebars", expressHandlebars.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;

//главная страница

app.get("/", (req, res) => res.render("home"));

//страница о нас

const fortunes = [
  "Победи свои страхи, или они победят тебя.",
  "Рекам нужны истоки.",
  "не бойса неведомого.",
  "тебя ждет приятный сюрприз.",
  "будь проще везде,где только можно.",
];

app.get("/about", (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
});

//пользовательская страница 404

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

//пользовательская страница 500

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("505");
});

app.listen(port, () =>
  console.log(
    `Express запущен на localhost:${port} 
    нажмите CTRL+C для выхода`
  )
);
