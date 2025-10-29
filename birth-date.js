// Load the people data
const peopleRaw = await fetch('people.json');
const people = await peopleRaw.json();

// Function to calculate age from birth date
function calculateAge(birthDateString) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function render() {
  let html = people
    // Sort people by age (you can also sort by last name or first name if needed)
    .toSorted((a, b) => {
      const ageA = calculateAge(a.birthDate);
      const ageB = calculateAge(b.birthDate);
      return ageA - ageB; // youngest to oldest
    })
    // Map people to HTML
    .map(({ firstName, lastName, birthDate, email }) => `
      <section class="person">
        <p><b>First name:</b> ${firstName}</p>
        <p><b>Last name:</b> ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Age:</b> ${calculateAge(birthDate)}</p>
      </section>
    `)
    .join('');

  document.querySelector('.people').innerHTML = html;
}

render();
