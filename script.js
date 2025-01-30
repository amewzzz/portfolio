document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-links a")
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll)
  })

  // Form validation
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", validateForm)

  // Typewriter animation
  const typewriter = document.getElementById("typewriter")
  const phrases = ["Computer Engineering Undergraduate", "AI/ML Enthusiast"]
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typewriter.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
    } else {
      typewriter.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      setTimeout(typeWriter, 1500)
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      setTimeout(typeWriter, 500)
    } else {
      setTimeout(typeWriter, isDeleting ? 50 : 100)
    }
  }

  typeWriter()

  // Add skill logos
  function addSkillLogos() {
    const skillLogos = {
      PyTorch: "https://pytorch.org/assets/images/pytorch-logo.png",
      TensorFlow: "https://www.tensorflow.org/images/tf_logo_social.png",
      "Scikit-learn": "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png",
      NumPy: "https://numpy.org/images/logo.svg",
      Pandas: "https://pandas.pydata.org/static/img/pandas_white.svg",
      Python: "https://www.python.org/static/community_logos/python-logo-generic.svg",
      "C/C++": "https://isocpp.org/assets/images/cpp_logo.png",
      Django: "https://static.djangoproject.com/img/logos/django-logo-negative.png",
      HTML: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png",
      CSS: "https://cdn.worldvectorlogo.com/logos/css-3.svg",
    }

    const skillLists = document.querySelectorAll(".skill-category ul")
    skillLists.forEach((list) => {
      const listItems = list.querySelectorAll("li")
      listItems.forEach((item) => {
        const skillName = item.textContent.trim()
        if (skillLogos[skillName]) {
          const img = document.createElement("img")
          img.src = skillLogos[skillName]
          img.alt = skillName
          img.className = "skill-logo"
          item.prepend(img)
        }
      })
    })
  }

  addSkillLogos()

  // Timeline animations
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Intersection Observer for timeline items
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.5
  });

  // Initial setup for timeline items
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    observer.observe(item);
  });

  // Scroll Progress
  window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
  });

  // Initialize particles
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#87ceeb'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: false
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#87ceeb',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
})

function smoothScroll(e) {
  e.preventDefault()
  const targetId = this.getAttribute("href")
  const targetPosition = document.querySelector(targetId).offsetTop
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 1000
  let start = null

  window.requestAnimationFrame(step)

  function step(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration))
    if (progress < duration) window.requestAnimationFrame(step)
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t * t + b
  t -= 2
  return (c / 2) * (t * t * t + 2) + b
}

function validateForm(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    subject.value.trim() === "" ||
    message.value.trim() === ""
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!isValidEmail(email.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Submit form using fetch
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Show success message
    form.reset();
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
    form.parentNode.insertBefore(successMessage, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.style.opacity = '0';
      setTimeout(() => successMessage.remove(), 300);
    }, 5000);
  })
  .catch(error => {
    alert('Oops! There was a problem sending your message. Please try again.');
  })
  .finally(() => {
    // Reset button state
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  });
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
