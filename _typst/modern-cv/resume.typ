#import "@preview/modern-cv:0.9.0": *

#let data = json("data.json")
#let full-name = data.author.firstname + " " + data.author.lastname
#let doc-title = "Resume for " + full-name
#let doc-keywords = ("software engineer", "resume", "CV", ..data.skills.map(s => s.name))

#show: resume.with(
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
  date: datetime.today().display(),
  language: "en",
  colored-headers: true,
  show-footer: false,
  paper-size: "us-letter",
  font: "Source Sans 3",
)

= Experience

#for exp in data.experience [
  #resume-entry(
    title: exp.position,
    location: exp.location,
    date: exp.startDate + " - " + exp.endDate,
    description: exp.company,
  )

  #resume-item[
    #for item in exp.entries [
      - #item
    ]
  ]
]

= Education

#for edu in data.education [
  #resume-entry(
    title: edu.school,
    location: if "gpa" in edu { "GPA: " + edu.gpa } else { none },
    date: edu.startDate + " - " + edu.endDate,
    description: edu.degree,
  )
]

= Skills

#let skill-names = data.skills.map(s => s.name)
#resume-skill-item("Technologies", skill-names)

// Override document metadata (must come after resume.with to override package defaults)
#set document(title: doc-title, description: doc-title, keywords: doc-keywords)
