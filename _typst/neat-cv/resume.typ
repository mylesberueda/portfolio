#import "@preview/neat-cv:0.6.0": (
  contact-info, cv, entry, item-pills, side, social-links,
)

#let data = json("data.json")

// Sort skills by experience level and take top 5
#let skill-order = ("expert": 0, "high": 1, "medium": 2, "low": 3)
#let sorted-skills = data.skills.sorted(key: s => skill-order.at(s.experience, default: 4))
#let top-skills = sorted-skills.slice(0, calc.min(5, sorted-skills.len()))

#set text(lang: "en")

#show: cv.with(
  author: (
    firstname: data.author.firstname,
    lastname: data.author.lastname,
    email: data.author.email,
    address: if "address" in data.author { data.author.address } else { none },
    phone: if "phone" in data.author { data.author.phone } else { none },
    position: data.author.position,
    website: data.author.website,
    github: data.author.github,
    linkedin: data.author.linkedin,
    mastodon: data.author.mastodon,
  ),
  accent-color: rgb("#4682b4"),
  header-color: rgb("#35414d"),
  paper-size: "us-letter",
)

#side[
  = About me
  #data.author.about

  = Skills
  #item-pills(top-skills.map(s => s.name))

  = Contact
  #contact-info()

  #v(1fr)
  #social-links()
]

= Professional Experience

#for exp in data.experience [
  #entry(
    title: exp.position,
    date: exp.startDate + " – " + exp.endDate,
    institution: exp.company,
    location: exp.location,
  )[
    #for item in exp.entries [
      - #item
    ]
  ]
]

= Education

#for edu in data.education [
  #entry(
    title: edu.degree,
    date: edu.startDate + " – " + edu.endDate,
    institution: edu.school,
    location: if "gpa" in edu { "GPA: " + edu.gpa } else { none },
  )[
    #edu.description
  ]
]
