const section = document.querySelector(".section");
const country = document.querySelector(".country");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const reset = document.querySelector(".reset");
const header = document.querySelector(".header");
const form = document.querySelector(".form");

const renderHtml = (data, classList = "") => {
  const [money] = Object.values(data.currencies);
  const html = `
    <article class="country ${classList}">
      <figure class="country-img">
        <img
          class="country-img__item"
          src="${data.flags.svg}"
          alt="flags"
        />
      </figure>
      <div class="country-data">
        <h2 class="country__title">${data.name?.common}</h2>
        <h3 class="country__subtitle">${data.region}</h3>
        <p class="country__text">
          <span class="span">👫 </span> ${data.population} people
        </p>
        <p class="country__text">
          <span class="span">🗣️ </span> ${Object.values(data.languages)}
        </p>
        <p class="country__text">
          <span class="span">💰 </span> ${money.name}
        </p>
      </div>
    </article>
    `;

  section.insertAdjacentHTML("beforeend", html);
  section.style.opacity = "1";
  section.style.transition = "1s ease-in-out";
};

btn.addEventListener("click", function (e) {
  e.preventDefault();

  if (input.value === "") return alert("Please enter the name of any country");

  const url = `https://restcountries.com/v3.1/name/${input.value}`;

  input.value = "";
  input.disabled = true;

  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    const [borderCountry] = data.borders;

    renderHtml(data);

    // Render Neighbor
    const request2 = new XMLHttpRequest();
    request2.open(
      "GET",
      `https://restcountries.com/v3.1/alpha/${borderCountry}`
    );
    request2.send();

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderHtml(data2, "neighbour");
    });
  });
});

reset.addEventListener("click", (e) => {
  e.preventDefault();
  section.innerHTML = "";
  input.disabled = false;
});

const obsCallback = function () {
  header.classList.remove("hidden");
  header.classList.add("appears");
};

const observer = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 1,
});
observer.observe(header);

const obsCallback2 = function () {
  form.classList.remove("hidden2");
  form.classList.add("appears2");
};

const observer2 = new IntersectionObserver(obsCallback2, {
  root: null,
  threshold: 1,
});
observer2.observe(form);
