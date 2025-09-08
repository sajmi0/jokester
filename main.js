
//zmena barvy u flagu
document.querySelectorAll(".flags li").forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle("selected");
    })
})

//preklad stranky
const translations = {
  cz: {
    "categories-title": "Kategorie:",
    "flags-title": "Filtry:",
    any: "Libovolné",
    misc: "Různé",
    dark: "Temné",
    programming: "Programování",
    pun: "Slovní hříčky",
    spooky: "Strašidelné",
    christmas: "Vánoční",
    nsfw: "Nevhodné",
    religious: "Náboženské",
    political: "Politické",
    racist: "Rasistické",
    sexist: "Sexistické",
    explicit: "Explicitní"
  },
  en: {
    "categories-title": "Categories:",
    "flags-title": "Flags:",
    any: "Any",
    misc: "Misc",
    dark: "Dark",
    programming: "Programming",
    pun: "Pun",
    spooky: "Spooky",
    christmas: "Christmas",
    nsfw: "nsfw",
    religious: "religious",
    political: "political",
    racist: "racist",
    sexist: "sexist",
    explicit: "explicit"
  }
};

document.getElementById("language").addEventListener("change", (e) => {
  const lang = e.target.value;
  const dict = translations[lang];

  document.getElementById("categories-title").textContent = dict["categories-title"];
  document.getElementById("flags-title").textContent = dict["flags-title"];

  document.querySelectorAll(".categories h3").forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = dict[key];
  });

  document.querySelectorAll(".flags li").forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = dict[key];
  });
});



//actual kod na vtipy slibuju

function classSelector(callback) {
  document.querySelectorAll(".categories li").forEach(category => {
    category.addEventListener('click', () => {
      const selectedClass = category.className;
      callback(selectedClass);
    });
  });
}

classSelector((selectedClass) => {
  // const lang = document.getElementById("language").value;
  const jokeContainer = document.querySelector(".joke");
  const url = `https://v2.jokeapi.dev/joke/${selectedClass}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let jokeText = "";
      if (data.type === "twopart") {
      jokeText = `${data.setup} ${data.delivery}`;
    } else {
      jokeText = data.joke;
    }
    jokeContainer.textContent = jokeText;

    })
    .catch(err => {
      console.error("Error fetching joke:", err);
    });
});


