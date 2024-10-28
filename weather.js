let result = fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=61c12bce12b7729f748f3fff49a18816"
);

result
  .then((res) => res.json())
  .then((e) => {
    console.log(e);
  });
