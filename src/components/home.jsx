import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import me     from './imgs/hsr.jpg';
import folio1 from './imgs/movie.jpg';
import folio2 from './imgs/pub.jpg';
import folio3 from './imgs/digitt.png';
import folio4 from './imgs/folio-1.jpg';
import folio5 from './imgs/folio-2.jpg';
import folio6 from './imgs/folio-3.jpg';
import avtar2 from './imgs/avatar2.jpg';
import avtar3 from './imgs/avatar3.jpg';
import blog1  from './imgs/img-1.jpg';
import blog2  from './imgs/img-2.jpg';

/* ─── data ─────────────────────────────── */
const NAV_LINKS = ['About','Services','Skills','Experience','Work','Contact'];

const STATS = [
  { val: '50K+', lbl: 'Users Supported'   },
  { val: '85%',  lbl: 'Server Load Cut'   },
  { val: '60%',  lbl: 'Faster Page Loads' },
  { val: '2+',   lbl: 'Years in Prod'     },
];

const SERVICES = [
  {
    icon: '🌐', title: 'Web Platforms', featured: false,
    desc: 'Scalable SaaS, dashboards, and content platforms built with React, Next.js, Node, and GraphQL — shipped fast and maintained long-term.',
    list: ['React.js / Next.js 15', 'Node.js + Express APIs', 'ISR · SSR · SSG', 'MySQL / PostgreSQL'],
  },
  {
    icon: '📱', title: 'Mobile Apps', featured: true,
    desc: 'Cross-platform iOS & Android apps with React Native — pixel-perfect UI, monetized, production-ready, with real store release experience.',
    list: ['React Native (iOS + Android)', 'Firebase + FCM Push', 'Google Ads Integration', 'CI/CD & Store Release'],
  },
  {
    icon: '🤖', title: 'AI / ML Solutions', featured: false,
    desc: 'Intelligent automation, recommendation engines, NLP pipelines, and data-driven personalization deployed to production.',
    list: ['Recommendation Systems', 'NLP & Smart Search', 'Flask / Python APIs', 'Hugging Face Deployments'],
  },
  {
    icon: '☁️', title: 'Cloud & DevOps', featured: false,
    desc: 'Resilient infrastructure on GCP and Firebase — cron automation, observability, cost-optimized pipelines from day one.',
    list: ['Google Cloud Platform', 'Firebase Auth / Realtime', 'Cron-based Automation', 'MongoDB / PostgreSQL'],
  },
];

const SKILL_ROWS = [
  { cat: 'Frontend & Mobile', color: 'indigo', tags: ['React.js','Next.js','React Native','JavaScript','TypeScript','HTML5 / CSS3'] },
  { cat: 'Backend & APIs',    color: 'cyan',   tags: ['Node.js','Express.js','Python','Flask','GraphQL','REST APIs'] },
  { cat: 'Databases & Cloud', color: 'teal',   tags: ['MongoDB','MySQL','PostgreSQL','Firebase','GCP','Mongoose'] },
  { cat: 'AI / ML',           color: 'violet', tags: ['Recommendation Engines','NLP','Data Pipelines','Hugging Face','AI Automation'] },
  { cat: 'Tools & DevOps',    color: 'amber',  tags: ['Git','Android Studio','WordPress','FCM Notifications','Google Auth','Cron Jobs','CI/CD','ISR / WebSub'] },
];

const EXPERIENCE = [
  {
    company: 'Customized Digital Solutions',
    role: 'Full Stack Developer · Remote',
    date: 'Jul 2025 – Present',
    live: true,
    bullets: [
      'Built MERN dashboards supporting <strong>1K–15K+ active users</strong> — ~35% faster response time.',
      'Engineered React Native mobile features reducing UI-related bugs by ~30%.',
      'Introduced Google Auth (↓ 40% login failures) + FCM push (↑ 25–35% engagement).',
      'Designed cron-based automation reducing operational latency by <strong>60–70%</strong>.',
    ],
    projects: ['IMDS AI Interface — APA Engineering','My Friend — Dating App','Quauds — Grocery App (TN)','Zypsii · Digital Jaiguru · Reelbook'],
    stack: 'React.js · Node.js · MongoDB · MySQL · React Native · Firebase FCM',
  },
  {
    company: 'Virtualify Software Consultancy',
    role: 'Software Development Engineer · Remote',
    date: 'Apr 2024 – May 2025',
    live: false,
    bullets: [
      'Migrated FMT News from Flutter → React Native for <strong>50,000+ global users</strong>.',
      'Rebuilt Free Malaysia Today on <strong>Next.js 15</strong> — 85% server load reduction.',
      'GraphQL API optimisation — <strong>40% fewer requests</strong>, lower operational costs.',
      'WordPress + GCP + Firebase + Google Ads pipeline — <strong>60% faster page loads</strong>.',
    ],
    projects: ['FMT News — React Native Migration','Free Malaysia Today — Next.js 15','Tassenger — Task Platform'],
    stack: 'React Native · Next.js · GCP · Firebase · GraphQL · WordPress',
  },
];

const PORTFOLIO = [
  { img: folio2, title: 'FMT News — Next.js Replatform',     tags: ['Next.js 15','GCP','ISR'],           desc: '10K+ DAU news platform. 85% server load reduction + 60% faster loads via ISR & WebSub.',   link: 'https://www.linkedin.com/in/hemantsinghrajput/details/projects/' },
  { img: folio3, title: 'IMDS Advanced Interface (AI)',       tags: ['MERN','AI Platform','Cron'],         desc: 'End-to-end AI platform for APA Engineering. Automated cron workflows cut manual effort by 80%.', link: 'https://github.com/hemantsinghrajput/' },
  { img: folio1, title: 'Movie Recommendation Engine',        tags: ['Python','ML','Hugging Face'],        desc: 'AI-powered collaborative filtering system live on Hugging Face Spaces.',                  link: 'https://huggingface.co/spaces/hpratapsingh/Movie_Recommendation_system' },
  { img: folio4, title: 'My Friend — Dating App',             tags: ['React Native','Firebase','FCM'],     desc: 'Crash reports ↓ 40%. Stabilised camera, chat & mic. Push notifications boosted DAU 25%.', link: 'https://github.com/hemantsinghrajput/' },
  { img: folio5, title: 'Quauds — Online Grocery',            tags: ['React Native','Node.js','MongoDB'],  desc: 'Live regional e-commerce platform (Tamil Nadu) — feature dev & performance optimisation.',  link: 'https://github.com/hemantsinghrajput/' },
  { img: folio6, title: 'Tassenger — Task Platform',          tags: ['React Native','Node.js','Express'],  desc: 'Real-time task management app with team collaboration built on React Native + Node.js.',    link: 'https://github.com/hemantsinghrajput/' },
];

const BLOGS = [
  {
    img: blog1, cat: 'Mobile Engineering',
    title: '🔴 URGENT MOBILE WARNING: The 16KB Android Deadline Has Passed.',
    desc:  'Balancing parity with performance across a live migration — strategies that kept users happy while modernising the stack.',
    link:  'https://www.linkedin.com/posts/hemantsinghrajput_16kbsupport-activity-7394018811038957569-95PE?utm_source=share&utm_medium=member_desktop&rcm=ACoAADOuph4BG1jSOLI4tXdYACoF3qmR9Q6gwzk',
  },
  {
    img: blog2, cat: 'Web Performance',
    title: 'Expo vs React Native — A Developer\'s Perspective After Real-World Builds',
    desc:  'How we cut server load 85% and improved Time-to-Interact for Free Malaysia Today using Next.js 15 and a custom WebSub Hub.',
    link:  'https://www.linkedin.com/posts/hemantsinghrajput_expo-vs-react-native-activity-7381034218199527424-7gZr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADOuph4BG1jSOLI4tXdYACoF3qmR9Q6gwzk',
  },
];

/* ─── component ────────────────────────── */
export default function Home() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [formData,   setFormData]   = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(''); // '' | 'sending' | 'ok' | 'err'

  /* Scroll listener for navbar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu when any nav link is clicked */
  const closeMenu = () => setMenuOpen(false);

  /* Contact form submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://myapi-0j13.onrender.com/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormStatus(res.status === 201 ? 'ok' : 'err');
      if (res.status === 201) setFormData({ name: '', email: '', message: '' });
    } catch {
      setFormStatus('err');
    }
  };

  const field = (key) => ({
    value: formData[key],
    onChange: (e) => setFormData({ ...formData, [key]: e.target.value }),
  });

  return (
    <div className="pf-wrap">

      {/* ── NAVBAR ─────────────────────── */}
      <nav className={`pf-nav${scrolled ? ' pf-nav--solid' : ''}`}>
        <div className="pf-container">
          <div className="pf-nav__inner">
            <a href="#hero" className="pf-nav__logo">
              <span className="pf-nav__logo-dot"></span>
              Hemant<span>.dev</span>
            </a>

            <ul className="pf-nav__links">
              {NAV_LINKS.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="pf-nav__link">{l}</a>
                </li>
              ))}
            </ul>

            <a href="#contact" className="pf-btn pf-btn--primary pf-nav__cta">Hire Me</a>

            <button
              className={`pf-nav__burger${menuOpen ? ' pf-nav__burger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`pf-nav__drawer${menuOpen ? ' pf-nav__drawer--open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="pf-nav__drawer-link"
              onClick={closeMenu}
            >{l}</a>
          ))}
          <a href="#contact" className="pf-btn pf-btn--primary" onClick={closeMenu}>Hire Me</a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────── */}
      <section className="pf-hero" id="hero">
        <div className="pf-hero__inner">
          <div className="pf-hero__badge">
            <span className="pf-hero__badge-dot"></span>
            Available for Remote Work · Worldwide
          </div>

          <h1 className="pf-hero__title">
            Building <span className="grad">Digital Products</span><br />
            That Scale
          </h1>

          <p className="pf-hero__sub">
            Full Stack Engineer &nbsp;·&nbsp; React Native &nbsp;·&nbsp; AI / ML<br />
            From idea to production — fast, reliable, and built to last.
          </p>

          <div className="pf-hero__actions">
            <a href="#work"    className="pf-btn pf-btn--primary pf-btn--lg">View My Work</a>
            <a href="#contact" className="pf-btn pf-btn--outline pf-btn--lg">Start a Project</a>
          </div>

          <div className="pf-hero__stats">
            {STATS.map((s) => (
              <div className="pf-stat" key={s.lbl}>
                <span className="pf-stat__val">{s.val}</span>
                <span className="pf-stat__lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pf-hero__scroll">
          <span>Scroll</span>
          <div className="pf-hero__scroll-line"></div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────── */}
      <section className="pf-section pf-section--alt" id="about">
        <div className="pf-container">
          <div className="pf-about__grid">
            <div className="pf-about__img-wrap">
              <div className="pf-about__img-border">
                <img src={me} alt="Hemant Rajput" className="pf-about__img" />
              </div>
              <div className="pf-about__card">
                <span className="pf-about__card-val">8.52</span>
                <span className="pf-about__card-lbl">CGPA · MITS</span>
              </div>
            </div>

            <div className="pf-about__body">
              <span className="pf-label">About Me</span>
              <h2 className="pf-heading">
                I build products<br />that <span className="grad">matter</span>
              </h2>
              <p className="pf-about__text">
                I'm Hemant Rajput — a product-minded Full Stack Engineer from Indore, India.
                I specialise in high-performance web platforms, cross-platform mobile apps,
                and AI-powered systems that scale from day one.
              </p>
              <p className="pf-about__text">
                From migrating a 50K-user news app to Next.js 15 with 85% server load reduction,
                to shipping MERN dashboards for 15K+ active users — I bring rigorous engineering
                and a strong eye for UX to every engagement. Open for freelance, contract, and
                full-time remote opportunities globally.
              </p>

              <div className="pf-about__pills">
                {['📍 Indore, India','🌍 Remote Worldwide','💻 500+ LeetCode','⚡ B.Tech IT + AI'].map((p) => (
                  <span className="pf-pill" key={p}>{p}</span>
                ))}
              </div>

              <div className="pf-about__cta">
                <a href="https://www.linkedin.com/in/hemantsinghrajput/" target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--primary">LinkedIn</a>
                <a href="./imgs/Hemant_R.pdf" target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--ghost">Download CV</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────── */}
      <section className="pf-section" id="services">
        <div className="pf-container">
          <div className="pf-sec-hdr">
            <span className="pf-label">What I Do</span>
            <h2 className="pf-heading">Services Built for <span className="grad">Scale</span></h2>
            <p className="pf-subtext">End-to-end engineering for founders, product teams, and agencies worldwide.</p>
          </div>

          <div className="pf-services__grid">
            {SERVICES.map((s) => (
              <div className={`pf-svc${s.featured ? ' pf-svc--feat' : ''}`} key={s.title}>
                <span className="pf-svc__icon">{s.icon}</span>
                <h3 className="pf-svc__title">{s.title}</h3>
                <p className="pf-svc__desc">{s.desc}</p>
                <ul className="pf-svc__list">
                  {s.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="pf-svc__glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────── */}
      <section className="pf-section pf-section--alt" id="skills">
        <div className="pf-container">
          <div className="pf-sec-hdr">
            <span className="pf-label">Tech Stack</span>
            <h2 className="pf-heading">Tools I <span className="grad">Master</span></h2>
          </div>

          <div className="pf-skills__body">
            {SKILL_ROWS.map(({ cat, color, tags }) => (
              <div className="pf-skill-row" key={cat}>
                <span className="pf-skill-row__cat">{cat}</span>
                <div className="pf-skill-row__tags">
                  {tags.map((t) => (
                    <span className={`pf-tag pf-tag--${color}`} key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pf-skills__dsa">
            <span>⚡ 500+ LeetCode Problems</span>
            <span className="pf-skills__dot">·</span>
            <span>300+ GeeksForGeeks</span>
            <span className="pf-skills__dot">·</span>
            <span>Open Source Contributor</span>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────── */}
      <section className="pf-section" id="experience">
        <div className="pf-container">
          <div className="pf-sec-hdr">
            <span className="pf-label">Career</span>
            <h2 className="pf-heading">Where I've Made <span className="grad">Impact</span></h2>
          </div>

          <div className="pf-timeline">
            {EXPERIENCE.map((exp) => (
              <div className="pf-tl-item" key={exp.company}>
                <div className="pf-tl-dot"></div>
                <div className="pf-tl-card">
                  <div className="pf-tl-header">
                    <div>
                      <h3 className="pf-tl-company">{exp.company}</h3>
                      <p className="pf-tl-role">{exp.role}</p>
                    </div>
                    <div className="pf-tl-right">
                      <span className="pf-tl-date">{exp.date}</span>
                      <span className={`pf-badge${exp.live ? ' pf-badge--live' : ''}`}>
                        {exp.live ? 'Current' : 'Past'}
                      </span>
                    </div>
                  </div>

                  <ul className="pf-tl-bullets">
                    {exp.bullets.map((b, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                    ))}
                  </ul>

                  <div className="pf-tl-projects">
                    {exp.projects.map((p) => (
                      <span className="pf-proj-chip" key={p}>{p}</span>
                    ))}
                  </div>

                  <p className="pf-tl-stack">{exp.stack}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK / PORTFOLIO ───────────── */}
      <section className="pf-section pf-section--alt" id="work">
        <div className="pf-container">
          <div className="pf-sec-hdr">
            <span className="pf-label">Portfolio</span>
            <h2 className="pf-heading">Selected <span className="grad">Work</span></h2>
            <p className="pf-subtext">Real projects. Real impact. From 50K-user apps to AI-powered platforms.</p>
          </div>

          <div className="pf-work__grid">
            {PORTFOLIO.map(({ img, title, tags, desc }) => (
              <div className="pf-work-card" key={title}>
                <div className="pf-work-card__thumb">
                  <img src={img} alt={title} className="pf-work-card__img" />
                </div>
                <div className="pf-work-card__body">
                  <div className="pf-work-card__tags">
                    {tags.map((t) => <span className="pf-work-tag" key={t}>{t}</span>)}
                  </div>
                  <h3 className="pf-work-card__title">{title}</h3>
                  <p className="pf-work-card__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────── */}
      <section className="pf-cta">
        <div className="pf-container">
          <div className="pf-cta__inner">
            <div className="pf-cta__text">
              <h2>Ready to build something great?</h2>
              <p>Open for freelance, contract &amp; full-time remote opportunities worldwide.</p>
            </div>
            <div className="pf-cta__btns">
              <a href="#contact" className="pf-btn pf-btn--primary pf-btn--lg">Start a Project</a>
              <a href="https://www.linkedin.com/in/hemantsinghrajput/" target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--ghost pf-btn--lg">Book a Call</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────── */}
      <section className="pf-section" id="testimonials">
        <div className="pf-container">
          <div className="pf-sec-hdr">
            <span className="pf-label">Testimonials</span>
            <h2 className="pf-heading">What Clients <span className="grad">Say</span></h2>
          </div>

          <div className="pf-testi__grid">
            {[
              { img: avtar2, text: '"Hemant owned the React Native relaunch for FMT News end-to-end. He resolved Android 12 install blockers and delivered a smoother UX for tens of thousands of readers."', name: 'Product Lead', co: 'FMT News · Malaysia' },
              { img: avtar3, text: '"From Next.js 15 migration to Firebase automation, Hemant handled architecture, delivery, and handover seamlessly. Server load dropped by 85% within weeks."',            name: 'Engineering Manager', co: 'Virtualify · Remote' },
            ].map(({ img, text, name, co }) => (
              <div className="pf-testi-card" key={name}>
                <span className="pf-testi-card__quote">"</span>
                <p className="pf-testi-card__text">{text}</p>
                <div className="pf-testi-card__author">
                  <img src={img} alt={name} className="pf-testi-card__avatar" />
                  <div>
                    <span className="pf-testi-card__name">{name}</span>
                    <span className="pf-testi-card__co">{co}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ───────────────────────── */}
      <section className="pf-section pf-section--alt" id="blog">
        <div className="pf-container">
          <div className="pf-sec-hdr">
            <span className="pf-label">Insights</span>
            <h2 className="pf-heading">From the <span className="grad">Blog</span></h2>
          </div>

          <div className="pf-blog__grid">
            {BLOGS.map(({ img, cat, title, desc, link }) => (
              <a href={link} target="_blank" rel="noopener noreferrer" className="pf-blog-card" key={title}>
                <div className="pf-blog-card__thumb">
                  <img src={img} alt={title} className="pf-blog-card__img" />
                </div>
                <div className="pf-blog-card__body">
                  <span className="pf-blog-card__cat">{cat}</span>
                  <h3 className="pf-blog-card__title">{title}</h3>
                  <p className="pf-blog-card__desc">{desc}</p>
                  <span className="pf-blog-card__link">Read more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────── */}
      <section className="pf-section" id="contact">
        <div className="pf-container">
          <div className="pf-contact__grid">

            <div className="pf-contact__info">
              <span className="pf-label">Get in Touch</span>
              <h2 className="pf-heading">Let's Build <span className="grad">Together</span></h2>
              <p className="pf-subtext">
                Have a project in mind? I'd love to hear about it.
                Send a message or reach out directly — I respond within 24 hours.
              </p>

              <div className="pf-contact__links">
                {[
                  { icon: '✉',  label: 'hemantr128@gmail.com',                  href: 'mailto:hemantr128@gmail.com' },
                  { icon: 'in', label: 'linkedin.com/in/hemantsinghrajput',      href: 'https://www.linkedin.com/in/hemantsinghrajput/' },
                  { icon: 'gh', label: 'github.com/hemantsinghrajput',           href: 'https://github.com/hemantsinghrajput/' },
                ].map(({ icon, label, href }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="pf-contact__link" key={label}>
                    <span className="pf-contact__link-icon">{icon}</span>
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <form className="pf-form" onSubmit={handleSubmit}>
              <div className="pf-form__row">
                <input  className="pf-input" type="text"  placeholder="Your Name"  required {...field('name')} />
                <input  className="pf-input" type="email" placeholder="Your Email" required {...field('email')} />
              </div>
              <textarea className="pf-input" rows="5" placeholder="Tell me about your project…" {...field('message')} />

              <button
                type="submit"
                className="pf-btn pf-btn--primary pf-btn--lg pf-btn--full"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending…' : formStatus === 'ok' ? '✓ Message Sent!' : 'Send Message'}
              </button>

              {formStatus === 'ok'  && <p className="pf-form__status pf-form__status--ok">Message sent — I'll get back to you soon!</p>}
              {formStatus === 'err' && <p className="pf-form__status pf-form__status--err">Something went wrong. Please try LinkedIn instead.</p>}
            </form>

          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────── */}
      <footer className="pf-footer">
        <div className="pf-container">
          <div className="pf-footer__inner">
            <div>
              <div className="pf-footer__brand-name">
                <span className="pf-nav__logo-dot"></span>
                Hemant<span style={{ color: 'var(--accent)' }}>.dev</span>
              </div>
              <p className="pf-footer__tagline">Full Stack · Mobile · AI/ML</p>
            </div>

            <div className="pf-footer__socials">
              {[
                { s: 'in', href: 'https://www.linkedin.com/in/hemantsinghrajput/', label: 'LinkedIn' },
                { s: 'gh', href: 'https://github.com/hemantsinghrajput/',          label: 'GitHub'   },
                { s: 'tw', href: 'https://twitter.com/kunwarhemantpr1',            label: 'Twitter'  },
                { s: '✉',  href: 'mailto:hemantr128@gmail.com',                    label: 'Email'    },
              ].map(({ s, href, label }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="pf-footer__soc" aria-label={label} key={label}>{s}</a>
              ))}
            </div>
          </div>

          <div className="pf-footer__bottom">
            <p>© 2026 Hemant Singh Rajput. All rights reserved.</p>
            <p>Open to remote opportunities worldwide.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
