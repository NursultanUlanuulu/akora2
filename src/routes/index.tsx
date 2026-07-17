import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Compass,
  FileCheck2,
  GraduationCap,
  Instagram,
  Languages,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "ACORA Education",
          description:
            "International education center for IELTS, iTEP Academic, English courses, international certification and educational consulting.",
          email: "acoraeducation@gmail.com",
          telephone: "+996 550 878 512",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Bukhobaeva Moldokazy str. 13",
            addressLocality: "Dzhany-Dzher, Sokuluk district",
            addressCountry: "KG",
          },
          sameAs: ["https://www.instagram.com/acora_education"],
        }),
      },
    ],
  }),
});

/* ---------- Reveal on scroll ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 900ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 900ms cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Navigation ---------- */
const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-black/5 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white font-display text-lg tracking-tight">
            A
          </span>
          <span className={`font-display text-xl tracking-tight ${scrolled ? "text-navy" : "text-white"}`}>
            ACORA<span className="text-gold"> ·</span>{" "}
            <span className="text-[11px] uppercase tracking-[0.28em] font-sans font-medium opacity-70">
              Education
            </span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm transition-colors ${
                scrolled ? "text-ink/70 hover:text-navy" : "text-white/80 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            Apply Now <ArrowRight className="h-4 w-4" />
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden rounded-full p-2 ${scrolled ? "text-navy" : "text-white"}`}
          >
            <div className="space-y-1.5">
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-black/5">
          <div className="container-x py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-ink/80">
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden text-white">
      <img
        src={heroImg}
        alt="International students studying at ACORA Education"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(7,27,69,0.55),rgba(7,27,69,0.9)_60%,rgba(7,27,69,0.98))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/70 to-navy" />

      <div className="relative container-x pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7 animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Official International Examination Center
            </div>
            <h1 className="mt-8 font-display text-5xl leading-[1.02] md:text-7xl md:leading-[1.02] tracking-tight text-balance">
              International Education{" "}
              <span className="italic text-gold">Starts Here.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-white/75 text-balance">
              Preparation for IELTS, iTEP Academic, English courses,
              international certification and educational consulting — delivered
              to global standards.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-navy shadow-[0_10px_40px_-10px_rgba(201,162,74,0.7)] transition-transform hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm text-white/90 backdrop-blur hover:bg-white/5"
              >
                Explore Programs
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="relative animate-float-slow">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-gold/25 via-transparent to-white/5 blur-2xl" />
                <div className="relative rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-2xl shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.28em] text-white/60">Programs</span>
                    <span className="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="text-xs text-gold">2026</span>
                  </div>
                  <ul className="mt-6 divide-y divide-white/10">
                    {[
                      "IELTS Preparation",
                      "Official iTEP Academic",
                      "English Language Courses",
                      "Educational Consulting",
                    ].map((s) => (
                      <li key={s} className="flex items-center gap-4 py-4">
                        <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 bg-gold/10">
                          <Check className="h-4 w-4 text-gold" />
                        </span>
                        <span className="text-[15px] text-white/90">{s}</span>
                        <ArrowUpRight className="ml-auto h-4 w-4 text-white/40" />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl bg-white/5 p-4">
                    <p className="text-xs text-white/60">
                      Official iTEP Academic testing center · IELTS-format Mock Tests · Personalised roadmaps
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <a
        href="#trust"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-white/60 flex flex-col items-center gap-2"
      >
        Discover <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

/* ---------- Trust ---------- */
const trustCards = [
  { icon: BadgeCheck, title: "Official Examination Center", body: "Registered center for IELTS and iTEP Academic testing." },
  { icon: GraduationCap, title: "Qualified Teachers", body: "High-level educators with hands-on international exam expertise." },
  { icon: ShieldCheck, title: "International Standards", body: "Curriculum and testing aligned with global quality benchmarks." },
  { icon: Target, title: "Personalized Learning", body: "Individual programs built around your goals, level and timeline." },
  { icon: Building2, title: "Modern Environment", body: "Contemporary facilities designed for focus and outcomes." },
  { icon: Compass, title: "Professional Consulting", body: "Guidance for exams, admissions and study-abroad decisions." },
];

const stats = [
  { k: "1,200+", v: "Students Trained" },
  { k: "08", v: "Signature Programs" },
  { k: "20+", v: "Professional Teachers" },
  { k: "10+", v: "Years of Experience" },
];

function Trust() {
  return (
    <section id="trust" className="relative bg-mist py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Why students trust us</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy">
              A serious international <em className="text-gold not-italic">education partner</em>.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-3xl bg-black/[0.06] border border-black/[0.06]">
          {trustCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="group h-full bg-white p-8 md:p-10 transition-colors hover:bg-navy hover:text-white">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-navy/15 text-navy transition-colors group-hover:border-gold group-hover:text-gold">
                  <c.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm text-ink/70 group-hover:text-white/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.v} delay={i * 80}>
              <div>
                <div className="font-display text-5xl md:text-6xl text-navy tracking-tight">{s.k}</div>
                <div className="mt-3 h-px w-10 bg-gold" />
                <div className="mt-3 text-sm text-ink/60 uppercase tracking-[0.16em]">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-full w-full rounded-3xl border border-gold/30" />
            <img
              src={aboutImg}
              alt="ACORA Education consultation"
              width={1400}
              height={1600}
              loading="lazy"
              className="relative rounded-3xl object-cover aspect-[4/5] w-full"
            />
          </div>
        </Reveal>
        <div className="lg:col-span-6 lg:pl-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">About ACORA</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy leading-tight">
              An international education center built on <em className="text-gold not-italic">quality, honesty and excellence</em>.
            </h2>
            <p className="mt-6 text-ink/70 leading-relaxed">
              ACORA Education is an international education center specialising in
              preparation for IELTS and iTEP Academic exams, English language
              training, international certification and educational consulting.
              Our mission is to make international education, high-quality
              language preparation and professional development accessible to
              everyone.
            </p>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {[
              { icon: Target, title: "Our Mission", body: "Deliver world-class programs and certification aligned with global standards." },
              { icon: ShieldCheck, title: "Core Values", body: "Professionalism, quality, honesty, responsibility and continuous growth." },
              { icon: Users, title: "Every Student", body: "A comfortable environment with the knowledge, support and opportunities to succeed." },
              { icon: BookOpen, title: "Modern Methods", body: "Contemporary methodologies and up-to-date learning materials." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="rounded-2xl border border-black/[0.06] p-6 hover:border-gold/40 transition-colors">
                  <c.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <h4 className="mt-4 font-display text-xl text-navy">{c.title}</h4>
                  <p className="mt-2 text-sm text-ink/65">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const services = [
  { icon: GraduationCap, title: "IELTS Preparation", body: "Comprehensive Academic & General Training programs for study, work and migration abroad." },
  { icon: BookOpen, title: "iTEP Academic Preparation", body: "Structured coverage of all four skills with regular practice in official test format." },
  { icon: FileCheck2, title: "Official iTEP Academic Exam", body: "Registration and delivery of the official iTEP exam, recognised worldwide." },
  { icon: Target, title: "Mock Tests", body: "Full IELTS & iTEP simulations with detailed analysis and expert recommendations." },
  { icon: Languages, title: "English Courses", body: "Beginner through Advanced — everyday, academic and professional English." },
  { icon: User, title: "Individual Lessons", body: "One-to-one training tailored to your goals, level and timeline." },
  { icon: Compass, title: "Educational Consulting", body: "Guidance on exams, registration, program selection and studying abroad." },
  { icon: BadgeCheck, title: "International Certification", body: "Preparation for certifications recognised by universities and employers globally." },
];

function Services() {
  return (
    <section id="services" className="relative bg-navy text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="container-x relative">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Services</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance max-w-2xl">
              Programs designed for <em className="text-gold not-italic">international outcomes</em>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a href="#contact" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              Request a consultation <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:border-gold/40 hover:bg-white/[0.06] hover:-translate-y-1">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-2xl leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm text-white/60">{s.body}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/70 group-hover:text-gold">
                  Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
const steps = [
  { title: "Consultation", body: "We start with a personal conversation to understand your goals and constraints." },
  { title: "Assessment", body: "A precise placement test to benchmark your current level and target." },
  { title: "Study Plan", body: "A tailored roadmap covering skills, materials, milestones and timeline." },
  { title: "Preparation", body: "Structured lessons with proven methodologies and expert instructors." },
  { title: "Mock Tests", body: "Realistic simulations with detailed feedback and next-step recommendations." },
  { title: "Official Exam", body: "Registration and delivery of your official IELTS or iTEP Academic test." },
  { title: "Certification", body: "Receive your internationally recognised certificate — and next-step guidance." },
];

function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-mist">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Learning Process</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy">From first conversation to <em className="text-gold not-italic">certification</em>.</h2>
          </div>
        </Reveal>
        <div className="mt-16 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
          <ol className="space-y-10">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={s.title} delay={i * 60}>
                  <li className={`relative flex md:grid md:grid-cols-2 gap-8 ${right ? "md:[&>*:first-child]:col-start-2" : ""}`}>
                    <div className={`md:pr-16 ${right ? "md:pl-16 md:pr-0 md:text-left md:col-start-2" : "md:text-right"} pl-12 md:pl-0`}>
                      <div className="text-xs uppercase tracking-[0.28em] text-gold">Step {String(i + 1).padStart(2, "0")}</div>
                      <h3 className="mt-2 font-display text-3xl text-navy">{s.title}</h3>
                      <p className="mt-3 text-ink/65 max-w-md md:inline-block">{s.body}</p>
                    </div>
                    <span className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 grid h-4 w-4 place-items-center rounded-full bg-gold ring-8 ring-mist" />
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const testimonials = [
  { name: "Aida K.", score: "IELTS 7.5", country: "Kyrgyzstan → UK", uni: "University of Manchester", quote: "The mock tests and personal roadmap made the real exam feel familiar. My teachers pushed me exactly where I needed it." },
  { name: "Daniyar A.", score: "iTEP 5.4", country: "Kyrgyzstan → USA", uni: "Arizona State University", quote: "ACORA's consulting made a confusing process feel simple. I walked into the exam prepared and confident." },
  { name: "Elmira S.", score: "IELTS 8.0", country: "Kyrgyzstan → Canada", uni: "University of Toronto", quote: "Serious teachers, serious environment. Everything about ACORA felt international from day one." },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Student Success</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy leading-tight">Results that open <em className="text-gold not-italic">real doors</em>.</h2>
            <p className="mt-6 text-ink/65">Real journeys from ACORA students who prepared, tested and moved on to leading universities abroad.</p>
            <div className="mt-8 flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-navy" : "w-3 bg-navy/20"}`}
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <div className="relative rounded-3xl bg-mist p-8 md:p-12 border border-black/[0.05]">
              <div className="absolute -top-4 left-8 font-display text-8xl text-gold/70 leading-none select-none">"</div>
              <p className="font-display text-2xl md:text-3xl text-navy leading-snug text-balance">
                {t.quote}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-navy text-white font-display">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium text-navy">{t.name} · <span className="text-gold">{t.score}</span></div>
                  <div className="text-sm text-ink/60">{t.country} · {t.uni}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
function Gallery() {
  const imgs = [
    { src: g1, h: "row-span-2", alt: "Modern classroom" },
    { src: g2, h: "", alt: "Studying with textbook" },
    { src: g4, h: "", alt: "Student seminar" },
    { src: g3, h: "row-span-2", alt: "Student with certificate" },
  ];
  return (
    <section id="gallery" className="py-24 md:py-32 bg-mist">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Gallery</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy">Inside <em className="text-gold not-italic">ACORA</em>.</h2>
          </Reveal>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {imgs.map((im, i) => (
            <Reveal key={i} delay={i * 80} className={im.h}>
              <div className="group relative h-full w-full overflow-hidden rounded-2xl">
                <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Partners ---------- */
function Partners() {
  const partners = ["NEN · National Education Network", "IELTS", "iTEP Academic", "Cambridge English", "British Council"];
  return (
    <section className="py-16 border-y border-black/[0.06]">
      <div className="container-x">
        <p className="text-center text-xs uppercase tracking-[0.28em] text-ink/50">Trusted partners & accreditations</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-navy/70">
          {partners.map((p) => (
            <span key={p} className="font-display text-lg md:text-xl tracking-tight">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  { q: "How long does IELTS preparation take?", a: "Depending on your starting level and target score, most students prepare in 2–4 months. We design a precise roadmap after a placement assessment." },
  { q: "Can I take the official iTEP Academic exam at ACORA?", a: "Yes. ACORA is an authorised iTEP Academic testing center — registration, testing and results are handled end-to-end at our office." },
  { q: "What English levels do you offer?", a: "We teach from Beginner (A1) through Advanced (C1+), covering everyday communication, academic English and professional English tracks." },
  { q: "How do I register?", a: "Submit the contact form below or message us on WhatsApp. Our team will reply and schedule a personal consultation." },
  { q: "Do you offer individual lessons?", a: "Yes — personal one-to-one lessons are available with fully customised programs based on your level, goals and schedule." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">FAQ</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy leading-tight">Answers, before you <em className="text-gold not-italic">ask</em>.</h2>
          <p className="mt-6 text-ink/65">Everything you need to know about preparing, testing and studying with ACORA.</p>
        </Reveal>
        <div className="lg:col-span-8 divide-y divide-black/10 border-y border-black/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl md:text-2xl text-navy">{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 transition-transform ${isOpen ? "rotate-180 bg-navy text-white border-navy" : "text-navy"}`}>
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-14 text-ink/65 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function ContactForm() {
  const [state, setState] = useState({ name: "", phone: "", email: "", service: "IELTS Preparation", message: "", consent: false });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name.trim() || !state.phone.trim() || !state.consent) {
      toast.error("Please complete the required fields and consent.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Thank you — your request has been received.", {
        description: "Our team will contact you within one business day.",
      });
      setState({ name: "", phone: "", email: "", service: "IELTS Preparation", message: "", consent: false });
    }, 900);
  };

  const inp = "w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/10 transition";

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input className={inp} placeholder="Full name *" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
      <input className={inp} placeholder="Phone / WhatsApp *" value={state.phone} onChange={(e) => setState({ ...state, phone: e.target.value })} />
      <input type="email" className={inp} placeholder="Email" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
      <select className={inp} value={state.service} onChange={(e) => setState({ ...state, service: e.target.value })}>
        {services.map((s) => (
          <option key={s.title}>{s.title}</option>
        ))}
      </select>
      <textarea rows={4} className={`${inp} md:col-span-2 resize-none`} placeholder="How can we help you?" value={state.message} onChange={(e) => setState({ ...state, message: e.target.value })} />
      <label className="md:col-span-2 flex items-start gap-3 text-sm text-ink/70 mt-2">
        <input type="checkbox" checked={state.consent} onChange={(e) => setState({ ...state, consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-black/20 text-navy focus:ring-navy" />
        <span>I agree to be contacted by ACORA Education regarding my inquiry.</span>
      </label>
      <div className="md:col-span-2 mt-2">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-navy shadow-[0_10px_40px_-10px_rgba(201,162,74,0.7)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {sending ? "Sending…" : "Submit Application"}
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-navy text-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative grid lg:grid-cols-12 gap-14">
        <Reveal className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Get in touch</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">Begin your <em className="text-gold not-italic">international journey</em>.</h2>
          <p className="mt-6 text-white/70">Send us a message and our education advisors will guide you through the next step.</p>

          <ul className="mt-10 space-y-6">
            {[
              { icon: MapPin, k: "Office", v: "Bukhobaeva Moldokazy str. 13, Dzhany-Dzher, Sokuluk district, Kyrgyz Republic" },
              { icon: Phone, k: "Phone / WhatsApp", v: "+996 550 878 512" },
              { icon: Mail, k: "Email", v: "acoraeducation@gmail.com" },
              { icon: Clock, k: "Business Hours", v: "Mon – Fri · 09:00 – 18:00" },
            ].map((c) => (
              <li key={c.k} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/5 border border-white/10 text-gold">
                  <c.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/50">{c.k}</div>
                  <div className="mt-1 text-white/90">{c.v}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-3">
            <a href="https://www.instagram.com/acora_education" target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition">
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a href="https://t.me/+996222060036" target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition">
              <Send className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a href="https://wa.me/996222060036" target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition">
              <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-7">
          <div className="rounded-3xl bg-white p-8 md:p-10 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
            <h3 className="font-display text-2xl text-navy">Apply for a consultation</h3>
            <p className="mt-1 text-sm text-ink/60">We reply within one business day.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-[oklch(0.18_0.06_268)] text-white/70">
      <div className="container-x py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-navy font-display text-lg">A</span>
            <span className="font-display text-xl text-white">ACORA <span className="text-gold">·</span> Education</span>
          </div>
          <p className="mt-5 text-sm">International education, without compromise.</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/40">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/40">Services</div>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 5).map((s) => <li key={s.title}>{s.title}</li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-white/40">Contact</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>+996 550 878 512</li>
            <li>acoraeducation@gmail.com</li>
            <li>Mon – Fri · 09:00 – 18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} ACORA Education LLC. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Landing() {
  return (
    <div className="bg-background text-ink">
      <Nav />
      <main>
        <Hero />
        <Trust />
        <About />
        <Services />
        <Process />
        <Testimonials />
        <Gallery />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
