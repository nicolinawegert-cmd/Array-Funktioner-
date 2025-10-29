// fetch JSON data from the people.json file
const peopleRaw = await fetch('people.json');
const people = await peopleRaw.json();

//function to render the list on the screen 
function render(search = '') {

  //filter and sort the array
  let html = people

    //filter people whose email contains the search text
    .filter(({ email }) => search === ''
      || email.toLowerCase().includes(search.toLowerCase()))
    //sort alphabetically by email
    .toSorted((a, b) => a.email.localeCompare(b.email))
    //generate HTML for each person
    .map(({ firstName, lastName, email }) => `
    <section class="person">
      <p><b>First name:</b> ${firstName}</p>
      <p><b>Last name:</b> ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
    </section>
  `)
    // join all HTML strings into one large string
    .join('');

  // insert the generated HTML into the .people element
  document.querySelector('.people').innerHTML = html;

}

// add a keyup event handler to our search field
document.querySelector('.search-field')
  .addEventListener('keyup', event => render(event.target.value));



// initial render when the page loads
render();

