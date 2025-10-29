const peopleRaw = await fetch('people.json');
const people = await peopleRaw.json();

function render(search = '') {
  let html = people
    .filter(({ birthDate }) => {
      const age = determineAge(birthDate);
      return search === '' || age === parseInt(search, 10);
    })
    .toSorted((a, b) => a.birthDate < b.birthDate ? 1 : - 1)
    .map(({ firstName, lastName, email, birthDate }) => `
    <section class="person">
      <p><b>First name:</b> ${firstName}</p>
      <p><b>Last name:</b> ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Born:</b> ${birthDate}</p>
      <p><b>Age:</b> ${determineAge(birthDate)} years old</p>
    </section>
  `)
    .join('');

  document.querySelector('.people').innerHTML = html;

}

document.querySelector('.search-field')
  .addEventListener('keyup', event => {
    render(event.target.value);
  });


render();

function determineAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}