#import "@preview/modern-cv:0.9.0": *

#let data = json("data.json")
#let company = json("company.json")

#show: coverletter.with(
  author: (
    firstname: data.author.firstname,
    lastname: data.author.lastname,
    email: data.author.email,
    homepage: data.author.website,
    phone: if "phone" in data.author { data.author.phone } else { none },
    github: data.author.github,
    linkedin: data.author.linkedin,
    address: if "address" in data.author { data.author.address } else { none },
    positions: data.author.position,
  ),
  profile-picture: image("/public/myles-berueda.png"),
  language: "en",
  font: "Source Sans 3",
  show-footer: false,
  paper-size: "us-letter",
)

#hiring-entity-info(
  entity-info: (
    target: "Hiring Team",
    name: company.name,
    street-address: if "streetAddress" in company { company.streetAddress } else { none },
    city: if "city" in company { company.city } else { none },
  ),
)

#letter-heading(job-position: "Software Engineer", addressee: "Hiring Manager")

= About Me
#coverletter-content[
  #lorem(80)
]

= Why #company.name?
#coverletter-content[
  #lorem(90)
]

= Why Me?
#coverletter-content[
  #lorem(100)
]
