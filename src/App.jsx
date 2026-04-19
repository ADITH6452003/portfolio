import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import heroImg from './assets/adi.jpeg'
import './App.css'

// ── EmailJS config ── replace these with your actual values from emailjs.com
const EJS_SERVICE  = 'service_iwrvkhd'
const EJS_TEMPLATE = 'template_ggl454v'
const EJS_KEY      = '7fXHbrDxnrk4PWbI0'

function useParallax() {
  const [offset, setOffset] = useState({ scroll: 0, mx: 0, my: 0 })
  useEffect(() => {
    const onScroll = () => setOffset(o => ({ ...o, scroll: window.scrollY }))
    const onMouse = (e) => setOffset(o => ({
      ...o,
      mx: (e.clientX / window.innerWidth  - 0.5) * 30,
      my: (e.clientY / window.innerHeight - 0.5) * 20,
    }))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])
  return offset
}

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']

const SKILLS = [
  { name: 'React / Vite',      level: 90, icon: '⚛️' },
  { name: 'JavaScript',        level: 85, icon: '🟨' },
  { name: 'Python / Flask',    level: 80, icon: '🐍' },
  { name: 'Node.js / Express', level: 75, icon: '🟢' },
  { name: 'Machine Learning',  level: 72, icon: '🤖' },
  { name: 'MongoDB',           level: 78, icon: '🍃' },
  { name: 'IoT / ESP32',       level: 68, icon: '📡' },
  { name: 'CSS / Tailwind',    level: 85, icon: '🎨' },
]

const TECH_MARQUEE = [
  'React','Node.js','Python','MongoDB','Express','Flask','ESP32','JWT',
  'Random Forest','Vite','Mongoose','REST API','Groq API','Leaflet','Git','Vercel',
]

const PROJECTS = [
  {
    title: 'HabitTrackPro',
    desc: 'Full-stack habit tracking app with monthly calendar grid. Users define custom tasks, check them off daily, and track progress with completion percentages. Auto-syncs to MongoDB Atlas.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Vite'],
    color: '#f59e0b',
    live: 'https://habittrack-front.vercel.app/',
    repo: 'https://github.com/ADITH6452003/habittrack-front',
  },
  {
    title: 'PlantGenius',
    desc: 'ML-powered Flask app using Random Forest (200 estimators) to recommend optimal crops based on soil, weather, and NPK levels. Features Location Scout map and AI chatbot via Groq API.',
    tags: ['Python', 'Flask', 'Random Forest', 'Groq API', 'Leaflet'],
    color: '#10b981',
    live: 'https://random-forest-crop-prediction-tz02.onrender.com',
    repo: 'https://github.com/ADITH6452003/random-forest-crop-prediction',
  },
  {
    title: 'Leave Management System',
    desc: 'Role-based leave workflow for educational institutions. Staff apply → HODs review → Principal approves, with JWT auth, MongoDB backend, and a clean React UI.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT', 'Express'],
    color: '#6366f1',
    live: 'https://lms-frontend-sable-six.vercel.app/',
    repo: 'https://github.com/ADITH6452003/LMSFrontend',
  },
  {
    title: 'BloggerGo',
    desc: 'Full-stack blogging platform with React 19 + Vite frontend. Features JWT auth, CRUD blogs, author search, top authors leaderboard, and MongoDB Atlas persistence.',
    tags: ['React 19', 'Node.js', 'MongoDB', 'JWT', 'Express'],
    color: '#3b82f6',
    live: 'https://bloggergo-front.vercel.app/',
    repo: 'https://github.com/ADITH6452003/Bloggergo-front',
  },
]

const EXPERIENCE = [
  {
    year: '2024 – Present',
    role: 'Full Stack Developer',
    place: 'Self-Directed Projects',
    desc: 'Built and deployed 4+ production-grade web apps covering habit tracking, blogging, leave management, and ML-powered crop prediction using React, Node.js, and MongoDB.',
    color: '#6366f1',
  },
  {
    year: '2024',
    role: 'ML Engineer',
    place: 'Academic Project — PlantGenius',
    desc: 'Designed and trained a Random Forest classifier with 5-fold cross-validation for crop recommendation. Integrated Groq LLM API for conversational AI and Leaflet for live geo-data.',
    color: '#10b981',
  },
  {
    year: '2023 – 2024',
    role: 'IoT & Embedded Systems Developer',
    place: 'Academic Research',
    desc: 'Developed farm automation systems using ESP32 microcontrollers. Built sensor pipelines for soil moisture, temperature, and humidity with real-time data transmission.',
    color: '#f59e0b',
  },
  {
    year: '2023',
    role: 'Frontend Developer',
    place: 'College Projects',
    desc: 'Started building React-based UIs with a focus on component architecture, responsive design, and clean user experiences. Learned REST API integration and state management.',
    color: '#ec4899',
  },
]

const ROLES = ['Frontend Developer', 'ML Developer', 'IoT Engineer', 'React Specialist', 'Problem Solver']

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause)
        else setCharIdx(c => c + 1)
      } else {
        setDisplay(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); setCharIdx(0) }
        else setCharIdx(c => c - 1)
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])
  return display
}

function SkillBar({ name, level, icon, delay }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`skill-item ${visible ? 'revealed' : ''}`} style={{ '--delay': `${delay}ms` }}>
      <div className="skill-header">
        <span>{icon} {name}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ '--level': `${level}%`, '--bar-delay': `${delay + 200}ms` }} />
      </div>
    </div>
  )
}

function ProjectCard({ title, desc, tags, color, delay, live, repo }) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  const animIdx = useRef(Math.floor(Math.random() * 4))
  const driftClass = ['drift-card-a','drift-card-b','drift-card-c','drift-card-d'][animIdx.current]
  return (
    <div
      ref={ref}
      className={`project-card ${visible ? 'revealed' : ''} ${hovered ? '' : driftClass}`}
      style={{ '--delay': `${delay}ms`, '--accent': color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-glow" />
      <div className="card-accent-bar" style={{ background: color }} />
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="tags">
        {tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="card-links">
        {live && live !== '#' && <a href={live} target="_blank" rel="noopener noreferrer" className="card-btn card-btn-live">Live Demo <span className="btn-icon">↗</span></a>}
        {repo && repo !== '#' && <a href={repo} target="_blank" rel="noopener noreferrer" className="card-btn card-btn-repo">GitHub <span className="btn-icon">↗</span></a>}
        {(!live || live === '#') && (!repo || repo === '#') && <button className="card-btn card-btn-plain">View Project <span className="btn-icon">→</span></button>}
      </div>
    </div>
  )
}

function ContactForm() {
  const formRef = useRef()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      await emailjs.sendForm(EJS_SERVICE, EJS_TEMPLATE, formRef.current, EJS_KEY)
      setStatus('success')
      formRef.current.reset()
      setTimeout(() => setStatus(''), 4000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus(''), 4000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group"><input type="text" name="from_name" placeholder="Your Name" required /></div>
        <div className="form-group"><input type="email" name="from_email" placeholder="Your Email" required /></div>
      </div>
      <div className="form-group"><input type="text" name="subject" placeholder="Subject" /></div>
      <div className="form-group"><textarea rows="5" name="message" placeholder="Your Message" required /></div>
      <button type="submit" className="btn-primary btn-full" disabled={loading}>
        {loading ? 'Sending... ⏳' : status === 'success' ? 'Sent ✅' : status === 'error' ? 'Failed ❌ Try again' : 'Send Message 🚀'}
      </button>
      {status === 'success' && <p className="form-status success">Message sent! I'll get back to you soon.</p>}
      {status === 'error'   && <p className="form-status error">Something went wrong. Please try again.</p>}
    </form>
  )
}

function TimelineItem({ year, role, place, desc, color, idx }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`timeline-item ${visible ? 'revealed' : ''} ${idx % 2 === 0 ? 'tl-left' : 'tl-right'}`} style={{ '--delay': `${idx * 150}ms`, '--tcolor': color }}>
      <div className="timeline-dot" />
      <div className="timeline-card">
        <span className="timeline-year">{year}</span>
        <h3>{role}</h3>
        <span className="timeline-place">{place}</span>
        <p>{desc}</p>
      </div>
    </div>
  )
}

export default function App() {
  const role = useTypewriter(ROLES)
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [aboutRef, aboutVisible] = useReveal()
  const [contactRef, contactVisible] = useReveal()
  const [techRef, techVisible] = useReveal()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()))
      const current = sections.findLast(s => s && s.getBoundingClientRect().top <= 120)
      if (current) setActive(current.id.charAt(0).toUpperCase() + current.id.slice(1))
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const { scroll, mx, my } = useParallax()
  const slow = `translate(${mx * 0.4}px, ${scroll * -0.04 + my * 0.4}px)`
  const mid  = `translate(${mx * 0.7}px, ${scroll * -0.08 + my * 0.7}px)`
  const fast = `translate(${mx * 1.1}px, ${scroll * -0.14 + my * 1.1}px)`

  return (
    <div className="portfolio">
      <div className="bg-scene">
        <div className="bg-orb bg-orb1" />
        <div className="bg-orb bg-orb2" />
        <svg className="bg-shapes" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <g style={{ transform: slow, transition: 'transform 0.1s linear' }}>
            <circle cx="8%"  cy="8%"  r="50" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.5" className="sh sh1" />
            <polygon points="26,0 52,15 52,46 26,61 0,46 0,15" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.45" transform="translate(820,280)" className="sh sh16" />
            <rect x="5%" y="52%" width="48" height="48" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.45" rx="6" className="sh sh6" />
            <polygon points="22,0 44,22 22,44 0,22" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.45" transform="translate(480,680)" className="sh sh15" />
            <circle cx="85%" cy="88%" r="44" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.45" className="sh sh4" />
            <circle cx="42%" cy="48%" r="5" fill="#8b5cf6" opacity="0.7" className="sh sh21" />
          </g>
          <g style={{ transform: mid, transition: 'transform 0.1s linear' }}>
            <rect x="72%" y="10%" width="46" height="46" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.45" rx="5" className="sh sh7" />
            <circle cx="25%" cy="35%" r="46" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.45" className="sh sh5" />
            <polygon points="0,32 28,32 14,7" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.5" transform="translate(700,460)" className="sh sh10" />
            <rect x="55%" y="72%" width="50" height="50" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.45" rx="6" className="sh sh11" />
            <circle cx="88%" cy="55%" r="5" fill="#ec4899" opacity="0.65" className="sh sh20" />
            <circle cx="15%" cy="78%" r="4" fill="#6366f1" opacity="0.65" className="sh sh22" />
          </g>
          <g style={{ transform: fast, transition: 'transform 0.1s linear' }}>
            <polygon points="26,0 52,15 52,46 26,61 0,46 0,15" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.45" transform="translate(120,180)" className="sh sh17" />
            <circle cx="65%" cy="28%" r="42" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.45" className="sh sh3" />
            <polygon points="22,0 44,22 22,44 0,22" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.45" transform="translate(200,600)" className="sh sh14" />
            <rect x="78%" y="80%" width="44" height="44" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.45" rx="5" className="sh sh18" />
            <circle cx="38%" cy="92%" r="4" fill="#8b5cf6" opacity="0.65" className="sh sh19" />
          </g>
        </svg>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => scrollTo('home')}>&lt;<span>Adith</span>/&gt;</div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button className={active === link ? 'active' : ''} onClick={() => scrollTo(link)}>{link}</button>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-toggle" onClick={() => setDark(d => !d)} aria-label="Toggle theme">{dark ? '☀️' : '🌙'}</button>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(m => !m)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <p className="hero-greeting">👋 Hello, I'm</p>
          <h1 className="hero-name">ADITH V C</h1>
          <h2 className="hero-role">
            <span className="typewriter">{role}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-bio">
            I build real-world systems — from ML crop prediction models and IoT farm rovers
            to full-stack web platforms. I connect software with practical impact.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('Projects')}>View My Work</button>
            <button className="btn-outline" onClick={() => scrollTo('Contact')}>Get In Touch</button>
          </div>
          <div className="hero-socials">
            {[
              { label: 'GitHub',   href: 'https://github.com/ADITH6452003' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adith-v-c-5ab4a1317/' },
              { label: 'LeetCode', href: 'https://leetcode.com/u/ADITH_52/' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="social-link" target="_blank" rel="noopener noreferrer">{label}</a>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-frame">
            <img src={heroImg} alt="Adith V C" className="hero-photo" />
          </div>
          <div className="floating-badge badge1">React ⚛️</div>
          <div className="floating-badge badge2">ML 🤖</div>
          <div className="floating-badge badge3">IoT 📡</div>
          <div className="floating-badge badge4">Node.js 🟢</div>
        </div>
        <a className="scroll-hint" onClick={() => scrollTo('About')}>
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </a>
      </section>

      {/* Tech Marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
            <span key={i} className="marquee-item">{t}</span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="section">
        <div ref={aboutRef} className={`about-grid ${aboutVisible ? 'revealed' : ''}`}>
          <div className="about-text">
            <span className="section-label">About Me</span>
            <h2 className="section-title">Building real-world systems, <span className="gradient-text">not just projects</span></h2>
            <p>I'm a developer focused on Machine Learning, IoT, and Full Stack systems — turning practical problems into working solutions. From farm automation rovers to ML-based prediction models, I build systems that connect software with real-world impact.</p>
            <p>I enjoy working across the stack, from embedded hardware like ESP32 to web platforms using React and Node.js, with a strong focus on functionality, efficiency, and clarity.</p>
            <p>Outside of development, I explore emerging technologies, experiment with new ideas, and continuously refine my problem-solving approach.</p>
            <div className="stats">
              {[['3+', 'Core Domains'], ['10+', 'Projects Built'], ['5+', 'Tech in Production'], ['100%', 'Practical Focus']].map(([n, l]) => (
                <div key={l} className="stat"><strong>{n}</strong><span>{l}</span></div>
              ))}
            </div>
          </div>
          <div className="about-card">
            <div className="code-block">
              <div className="code-dots"><span /><span /><span /></div>
              <pre>{`const developer = {
  name: "Adith V C",
  role: "ML | IoT | Full Stack",
  coreFocus: [
    "Machine Learning",
    "Embedded Systems",
    "Web Development"
  ],
  keyProjects: [
    "Farm Automation Rover",
    "Crop Prediction System",
    "File Sharing Platform"
  ],
  approach: "Build → Test → Improve",
  strength: "Real-world problem solving",
  available: true ✅
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section section-alt">
        <div className="section-header">
          <span className="section-label">What I Know</span>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <p className="section-sub">Technologies I work with across ML, IoT, and Full Stack development</p>
        </div>
        <div ref={techRef} className={`tech-pills ${techVisible ? 'revealed' : ''}`}>
          {TECH_MARQUEE.map((t, i) => (
            <span key={t} className="tech-pill" style={{ '--pill-delay': `${i * 60}ms` }}>{t}</span>
          ))}
        </div>
        <div className="skills-grid">
          {SKILLS.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 100} />)}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="section-header">
          <span className="section-label">My Work</span>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-sub">Real-world applications built and deployed end-to-end</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} {...p} delay={i * 120} />)}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section section-alt">
        <div className="section-header">
          <span className="section-label">My Journey</span>
          <h2 className="section-title">Experience & <span className="gradient-text">Timeline</span></h2>
          <p className="section-sub">How I've grown as a developer</p>
        </div>
        <div className="timeline">
          <div className="timeline-line" />
          {EXPERIENCE.map((e, i) => <TimelineItem key={i} {...e} idx={i} />)}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div ref={contactRef} className={`contact-wrapper ${contactVisible ? 'revealed' : ''}`}>
          <div className="section-header">
            <span className="section-label">Let's Talk</span>
            <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
            <p className="section-sub">Have a project in mind? I'd love to hear about it.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              {[
                { icon: '📧', label: 'Email',    val: 'adithchandrasekar@gmail.com', href: 'mailto:adithchandrasekar@gmail.com' },
                { icon: '💼', label: 'LinkedIn', val: 'ADITH V C', href: 'https://www.linkedin.com/in/adith-v-c-5ab4a1317/' },
                { icon: '🐙', label: 'GitHub',   val: 'ADITH6452003', href: 'https://github.com/ADITH6452003' },
                { icon: '📍', label: 'Location', val: 'India', href: null },
              ].map(({ icon, label, val, href }) => (
                <div key={label} className={`contact-card ${href ? 'contact-card-link' : ''}`} onClick={() => href && window.open(href, '_blank')}>
                  <span className="contact-icon">{icon}</span>
                  <div><strong>{label}</strong><p>{val}</p></div>
                </div>
              ))}
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          {[
            { label: 'GitHub',   href: 'https://github.com/ADITH6452003' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adith-v-c-5ab4a1317/' },
            { label: 'LeetCode', href: 'https://leetcode.com/u/ADITH_52/' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </div>
        <p>Designed & Built by <span className="gradient-text">ADITH V C</span></p>
        <p className="footer-sub">© {new Date().getFullYear()} · All rights reserved</p>
      </footer>
    </div>
  )
}
