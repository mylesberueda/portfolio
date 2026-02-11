#import "@preview/modern-cv:0.9.0": *

#let data = json("data.json")
#let company = json("company.json")
#let full-name = data.author.firstname + " " + data.author.lastname
#let doc-title = "Cover Letter for " + full-name + " - " + company.name
#let doc-keywords = ("cover letter", "software engineer", company.name)

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
  profile-picture: none,
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

#letter-heading(job-position: if "role" in company { company.role } else { "Software Engineer" }, addressee: "Hiring Manager")

#coverletter-content[
  #lorem(100)
]

#coverletter-content[
  #lorem(90)
]

#coverletter-content[
  #lorem(110)
]

// Override document metadata (must come after coverletter.with to override package defaults)
#set document(title: doc-title, description: doc-title, keywords: doc-keywords)
