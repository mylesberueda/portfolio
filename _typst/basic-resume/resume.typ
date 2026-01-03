#import "@preview/basic-resume:0.2.9": *

#let data = json("data.json")

#let name = data.author.firstname + " " + data.author.lastname
#let location = if "address" in data.author { data.author.address } else { none }
#let email = data.author.email
#let github = "github.com/" + data.author.github
#let linkedin = "linkedin.com/in/" + data.author.linkedin
#let phone = if "phone" in data.author { data.author.phone } else { none }
#let personal-site = data.author.website.replace("https://", "")

#show: resume.with(
  author: name,
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  personal-site: personal-site,
  accent-color: "#26428b",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

== Work Experience

#for exp in data.experience [
  #work(
    title: exp.position,
    location: exp.location,
    company: exp.company,
    dates: dates-helper(start-date: exp.startDate, end-date: exp.endDate),
  )
  #for item in exp.entries [
    - #item
  ]
]

== Education

#for education in data.education [
  #edu(
    institution: education.school,
    location: if "gpa" in education { "GPA: " + education.gpa } else { none },
    dates: dates-helper(start-date: education.startDate, end-date: education.endDate),
    degree: education.degree,
  )
]

== Skills

#let skill-names = data.skills.map(s => s.name)
- *Technologies*: #skill-names.join(", ")
