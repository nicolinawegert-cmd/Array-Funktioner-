const peopleRaw = await fetch("people.json");
const people = await peopleRaw.json();

function render(search = "") {
  let html = people
    .filter(
      ({ lastName }) =>
        search === "" || lastName.toLowerCase().startsWith(search.toLowerCase())
    )
    .toSorted((a, b) => (a.lastName > b.lastName ? 1 : -1))
    .map(
      ({ firstName, lastName, email }) => `
    <section class="person">
      <p><b>First name:</b> ${firstName}</p>
      <p><b>Last name:</b> ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
    </section>
  `
    )
    .join("");
  document.querySelector(".people").innerHTML = html;
}

document.querySelector(".search-field").addEventListener("keyup", (event) => {
  render(event.target.value);
});

render();
