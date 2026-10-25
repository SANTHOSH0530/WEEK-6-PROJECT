StudentHive website
===================

Open index.html in a browser to start.

Pages
  index.html       Home (hero, categories, featured + upcoming events, testimonials, newsletter)
  events.html      Events list with search, category filter and details popup
  activities.html  Activities with search and category chips (?filter=sports etc. works)
  clubs.html       Club directory (Join Club goes to register.html?club=...)
  register.html    Student registration form with validation
  contact.html     Contact form and contact details

Files
  style.css        Shared styles (navbar, footer, home page, buttons)
  events.css       Events page styles (scoped to .ev-page)
  activities.css   Activities page styles
  pages.css        Clubs, Register and Contact page styles
  script.js        Home page behaviour
  event.js         Events data and events page behaviour
  activities.js    Activities filtering and search
  site.js          Clubs, Register and Contact behaviour

Before going live
  1. Add an img/ folder next to index.html with all the images the pages use.
     Missing images are hidden automatically, so the page still works without them.
  2. Replace the sample club names, descriptions and contact details with real ones.
  3. The forms only show a confirmation message. To save submissions, connect them to
     a backend or a form service (Google Forms, Formspree, etc.).
  4. Replace the placeholder links (#) for Terms, Privacy and social media.
