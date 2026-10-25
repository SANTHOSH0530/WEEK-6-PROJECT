/* StudentHive - shared script for Clubs, Register and Contact pages */
document.addEventListener("DOMContentLoaded", () => {

  /* Mobile menu */
  const toggle = document.getElementById("menuToggle")
  const navLinks = document.getElementById("navLinks")
  if (toggle && navLinks) {
    const setOpen = (open) => {
      navLinks.classList.toggle("open", open)
      toggle.setAttribute("aria-expanded", String(open))
      toggle.querySelector("i").className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars"
    }
    toggle.addEventListener("click", () => setOpen(!navLinks.classList.contains("open")))
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)))
    window.addEventListener("resize", () => { if (window.innerWidth > 900) setOpen(false) })
  }

  /* Footer year */
  const year = document.getElementById("footerYear")
  if (year) year.textContent = new Date().getFullYear()

  /* Pre-select a club when coming from the Clubs page (register.html?club=coding) */
  const clubSelect = document.getElementById("clubSelect")
  const wantedClub = new URLSearchParams(window.location.search).get("club")
  if (clubSelect && wantedClub && Array.from(clubSelect.options).some(o => o.value === wantedClub)) {
    clubSelect.value = wantedClub
  }

  /* Validation helpers */
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
  const phoneOk = (v) => {
    let d = v.replace(/[\s-]/g, "")
    if (d.startsWith("+91")) d = d.slice(3)
    return /^[6-9]\d{9}$/.test(d)
  }
  const mark = (input, ok, msg) => {
    const field = input.closest(".field")
    if (field) {
      field.classList.toggle("invalid", !ok)
      const err = field.querySelector(".error-msg")
      if (err) err.textContent = ok ? "" : msg
    }
    return ok
  }
  const showStatus = (el, type, text) => {
    el.className = "form-status show " + type
    el.textContent = text
  }

  /* Registration form */
  const regForm = document.getElementById("registerForm")
  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("regName")
      const email = document.getElementById("regEmail")
      const phone = document.getElementById("regPhone")
      const dept = document.getElementById("regDept")
      const yr = document.getElementById("regYear")
      const status = document.getElementById("registerStatus")

      const valid = [
        mark(name, name.value.trim().length >= 2, "Please enter your full name."),
        mark(email, emailOk(email.value.trim()), "Please enter a valid email address."),
        mark(phone, phoneOk(phone.value.trim()), "Enter a valid 10-digit mobile number."),
        mark(dept, dept.value !== "", "Please select your department."),
        mark(yr, yr.value !== "", "Please select your year of study.")
      ].every(Boolean)

      if (!valid) {
        showStatus(status, "error", "Please fix the highlighted fields and try again.")
        return
      }
      const first = name.value.trim().split(" ")[0]
      regForm.reset()
      showStatus(status, "success", "Thank you, " + first + "! Your registration has been received.")
    })
  }

  /* Contact form */
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("contactName")
      const email = document.getElementById("contactEmail")
      const subject = document.getElementById("contactSubject")
      const message = document.getElementById("contactMessage")
      const status = document.getElementById("contactStatus")

      const valid = [
        mark(name, name.value.trim().length >= 2, "Please enter your name."),
        mark(email, emailOk(email.value.trim()), "Please enter a valid email address."),
        mark(subject, subject.value !== "", "Please choose a topic."),
        mark(message, message.value.trim().length >= 10, "Message must be at least 10 characters.")
      ].every(Boolean)

      if (!valid) {
        showStatus(status, "error", "Please fix the highlighted fields and try again.")
        return
      }
      contactForm.reset()
      showStatus(status, "success", "Thanks for reaching out! We will get back to you soon.")
    })
  }

  /* Clear a field's error as soon as the user edits it */
  document.addEventListener("input", (e) => {
    const field = e.target.closest ? e.target.closest(".field") : null
    if (field) field.classList.remove("invalid")
  })

  /* Hide images that failed to load so the layout stays clean */
  document.querySelectorAll("img").forEach(img => {
    const hide = () => { img.style.visibility = "hidden" }
    if (img.complete && img.naturalWidth === 0) hide()
    else img.addEventListener("error", hide)
  })
})
