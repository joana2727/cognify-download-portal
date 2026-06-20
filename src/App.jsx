import { useState, useEffect, useRef, useCallback, useContext, createContext } from 'react'

const ThemeCtx = createContext(false)

// ── Intersection Observer hook ─────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = {
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  TrendUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/>
    </svg>
  ),
  ClipboardCheck: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="m9 14 2 2 4-4"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Android: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.341a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-11.046 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3.513 9.097l-1.56-2.703a.5.5 0 0 1 .866-.5l1.582 2.74A9.057 9.057 0 0 1 12 7c2.79 0 5.28 1.26 6.984 3.253l.015-.022 1.583-2.74a.5.5 0 0 1 .866.5L19.893 10.7A8.98 8.98 0 0 1 21 15H3a8.98 8.98 0 0 1 .513-5.903z"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="9,12 11,14 15,10"/>
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
}

// ── Phone mockup ───────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative mx-auto select-none w-full" style={{ maxWidth: 300 }}>
      <div className="absolute inset-0 blur-3xl opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)', transform: 'scale(1.2)' }} />
      <img src="/cognify-mobile.png" alt="Cognify app screenshot"
        className="relative w-full h-auto drop-shadow-2xl" />
    </div>
  )
}

// ── Floating stat cards (desktop only) ────────────────────────────────────
function FloatingCards() {
  const isDark = useContext(ThemeCtx)
  const cardBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)'
  const cardBorder = isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(124,58,237,0.15)'
  const textPrimary = isDark ? 'white' : '#1A0D3D'
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : '#6B7280'
  const labelColor = isDark ? '#C4B5FD' : '#7C3AED'

  return (
    <>
      <div className="absolute float-anim hidden lg:block" style={{ top: '12%', right: '-12%', zIndex: 10 }}>
        <div className="rounded-2xl px-4 py-3 text-left shadow-2xl"
          style={{ background: cardBg, backdropFilter: 'blur(16px)', border: cardBorder, minWidth: 148 }}>
          <p style={{ color: labelColor }} className="text-xs mb-1">PRC-Aligned</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-green-400/20 flex items-center justify-center text-green-500">
              <Icon.CheckCircle />
            </div>
            <div>
              <p style={{ color: textPrimary }} className="text-sm font-bold">TOS Mapped</p>
              <p style={{ color: textMuted }} className="text-xs">All subjects covered</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute float-anim-delayed hidden lg:block" style={{ bottom: '20%', right: '-10%', zIndex: 10 }}>
        <div className="rounded-2xl px-4 py-3 shadow-2xl"
          style={{ background: cardBg, backdropFilter: 'blur(16px)', border: cardBorder, minWidth: 140 }}>
          <p style={{ color: labelColor }} className="text-xs mb-1">Your readiness</p>
          <div className="flex items-end gap-1">
            <span style={{ color: textPrimary }} className="font-black text-2xl">99</span>
            <span style={{ color: labelColor }} className="font-bold text-lg mb-0.5">%</span>
          </div>
          <div className="h-1.5 rounded-full mt-1" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.12)' }}>
            <div className="h-full rounded-full" style={{ width: '99%', background: 'linear-gradient(90deg, #7C3AED, #C084FC)' }} />
          </div>
        </div>
      </div>
    </>
  )
}

// ── Sticky nav ─────────────────────────────────────────────────────────────
function Nav({ onDownload, toggleTheme }) {
  const isDark = useContext(ThemeCtx)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navBg = scrolled
    ? (isDark ? 'rgba(26,13,61,0.95)' : 'rgba(255,255,255,0.97)')
    : 'transparent'
  const navBorder = scrolled
    ? (isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(124,58,237,0.1)')
    : 'none'
  const linkColor = isDark ? 'rgba(255,255,255,0.6)' : '#6B7280'
  const linkHover = isDark ? 'white' : '#1A0D3D'
  const iconColor = isDark ? '#C4B5FD' : '#7C3AED'
  const iconBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.1)'
  const mobileTextColor = isDark ? 'rgba(255,255,255,0.8)' : '#374151'
  const mobileBorderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.08)'

  const gradientText = {
    background: 'linear-gradient(135deg, #7C3AED, #C084FC)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: navBg, backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: navBorder }}>

      {/* ── Desktop bar ── */}
      <div className="hidden md:flex max-w-6xl mx-auto px-6 py-4 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/cognify-logo.png" alt="Cognify" className="h-8 w-auto" />
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans', ...gradientText }}>Cognify</span>
        </div>

        <div className="flex items-center gap-8">
          {[['Features', '#features'], ['Download', '#download']].map(([label, href]) => (
            <a key={href} href={href} className="text-sm transition-colors" style={{ color: linkColor }}
              onMouseEnter={e => e.target.style.color = linkHover}
              onMouseLeave={e => e.target.style.color = linkColor}>{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: iconBg, color: iconColor }}>
            <span className="w-4 h-4">{isDark ? <Icon.Sun /> : <Icon.Moon />}</span>
          </button>
          <button onClick={onDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #F0C060, #E8A830)', color: '#1A0D3D' }}>
            <span className="w-4 h-4"><Icon.Download /></span>
            Download APK
          </button>
        </div>
      </div>

      {/* ── Mobile bar: hamburger | logo (center) | spacer ── */}
      <div className="md:hidden relative flex items-center justify-between px-4 py-3.5">
        {/* Left: hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95"
          style={{ background: menuOpen ? iconBg : 'transparent', color: isDark ? 'white' : '#1A0D3D' }}>
          <span className="w-5 h-5">{menuOpen ? <Icon.X /> : <Icon.Menu />}</span>
        </button>

        {/* Center: logo (absolute so it's truly centered) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
          <img src="/cognify-logo.png" alt="Cognify" className="h-7 w-auto" />
          <span className="font-bold text-base tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans', ...gradientText }}>Cognify</span>
        </div>

        {/* Right: spacer to balance layout */}
        <div className="w-10 h-10" />
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="md:hidden"
          style={{
            background: isDark ? 'rgba(15,7,35,0.98)' : 'rgba(255,255,255,0.99)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.1)'}`,
          }}>
          <div className="px-4 pt-2 pb-6 space-y-1">
            {[['Features', '#features'], ['Download', '#download']].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                className="flex items-center py-3.5 px-3 rounded-xl text-base font-medium transition-colors"
                style={{ color: mobileTextColor, borderBottom: `1px solid ${mobileBorderColor}` }}>
                {label}
              </a>
            ))}
              {/* Theme toggle row */}
            <button onClick={toggleTheme}
              className="flex items-center justify-between w-full py-3.5 px-3 rounded-xl text-base font-medium transition-colors"
              style={{ color: mobileTextColor, borderBottom: `1px solid ${mobileBorderColor}` }}>
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              <span className="w-5 h-5" style={{ color: iconColor }}>{isDark ? <Icon.Sun /> : <Icon.Moon />}</span>
            </button>

          </div>
        </div>
      )}
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero({ onDownload, config, apkSize }) {
  const isDark = useContext(ThemeCtx)
  const t = (light, dark) => isDark ? dark : light

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: t(
        'linear-gradient(150deg, #F5F3FF 0%, #EDE9FE 40%, #DDD6FE 100%)',
        'linear-gradient(150deg, #0F0723 0%, #1A0D3D 40%, #2D1B69 100%)'
      )}}>

      <div className="hero-noise" />

      {/* Center gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: t(
          'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,181,253,0.35) 0%, transparent 70%)',
          'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,181,253,0.08) 0%, transparent 70%)'
        ),
      }} />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: '#7C3AED', opacity: t(0.05, 0.2) }} />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: '#C084FC', opacity: t(0.06, 0.15) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 sm:mb-8"
              style={{
                background: t('rgba(124,58,237,0.08)', 'rgba(124,58,237,0.2)'),
                border: `1px solid ${t('rgba(124,58,237,0.25)', 'rgba(124,58,237,0.4)')}`,
              }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: t('#7C3AED', '#C4B5FD') }}>Now available on Android</span>
            </div>

            <h1 className="font-black leading-[1.05] tracking-tight text-balance"
              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 'clamp(2rem, 6vw, 4rem)', color: t('#1A0D3D', 'white') }}>
              The board exam doesn't scare
              <span className="block italic" style={{ color: t('#7C3AED', '#C4B5FD') }}> the prepared.</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
              style={{ color: t('rgba(26,13,61,0.65)', 'rgba(255,255,255,0.65)') }}>
              Cognify is your guided review system for the{' '}
              <strong style={{ color: t('#1A0D3D', 'white') }}>Psychometrician Licensure Exam</strong>{' '}
              — built to base on the official PRC Table of Specifications, so you always know what to study and how ready you actually are.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-center lg:items-start">
              <button onClick={onDownload}
                className="w-full sm:w-auto relative flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95 hover:shadow-2xl btn-ring"
                style={{ background: 'linear-gradient(135deg, #F0C060, #E8A830)', color: '#1A0D3D', boxShadow: '0 8px 32px rgba(240,192,96,0.35)' }}>
                <span className="w-5 h-5"><Icon.Download /></span>
                Download Free — Android APK
              </button>

              <div className="flex items-center gap-2 text-sm" style={{ color: t('rgba(26,13,61,0.5)', 'rgba(255,255,255,0.5)') }}>
                <span className="w-5 h-5 text-green-500"><Icon.Android /></span>
                {apkSize && <span>{apkSize}</span>}
                {apkSize && <span>·</span>}
                <span>Android {config?.minAndroid ?? '8.0'}+</span>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] relative">
              <PhoneMockup />
              <FloatingCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Problem section ────────────────────────────────────────────────────────
function ProblemSection() {
  const isDark = useContext(ThemeCtx)
  const t = (light, dark) => isDark ? dark : light
  const [ref, visible] = useReveal()

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: t('#FAFAF8', '#0F0723') }}>
      <div className="max-w-5xl mx-auto">
        <div className={`section-reveal ${visible ? 'visible' : ''}`}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6"
            style={{ color: t('#7C3AED', '#C4B5FD') }}>The reality</p>
          <h2 className="font-black leading-tight text-balance mb-4"
            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', color: t('#1A0D3D', 'white') }}>
            You're studying hard.
            <br />
            <span className="italic" style={{ color: t('#7C3AED', '#C4B5FD') }}>But are you studying the right things?</span>
          </h2>
        </div>

        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { num: '01', title: 'No structure', body: "Scattered notes, random review sessions, and no way to know if you're actually making progress.", delay: 'stagger-1' },
            { num: '02', title: 'No feedback loop', body: 'You practice questions but never know which topics you consistently miss — until the exam.', delay: 'stagger-2' },
            { num: '03', title: 'Pure anxiety', body: "Weeks before the board exam, you don't know what you don't know. That's the worst place to be.", delay: 'stagger-3' },
          ].map(({ num, title, body, delay }) => (
            <div key={num}
              className={`section-reveal ${delay} ${visible ? 'visible' : ''} card-hover rounded-2xl p-5 sm:p-6`}
              style={{
                background: t('white', 'rgba(45,27,105,0.3)'),
                border: `1.5px solid ${t('#EDE9FE', 'rgba(124,58,237,0.2)')}`,
              }}>
              <div className="text-4xl sm:text-5xl font-black mb-3 sm:mb-4 leading-none"
                style={{ color: t('#EDE9FE', 'rgba(124,58,237,0.3)'), fontFamily: 'Plus Jakarta Sans' }}>{num}</div>
              <h3 className="text-base sm:text-lg font-bold mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans', color: t('#1A0D3D', 'white') }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: t('#6B7280', 'rgba(255,255,255,0.55)') }}>{body}</p>
            </div>
          ))}
        </div>

        <div className={`section-reveal stagger-4 ${visible ? 'visible' : ''} mt-10 sm:mt-16 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center`}
          style={{ background: 'linear-gradient(135deg, #1A0D3D, #2D1B69)', color: 'white' }}>
          <p className="font-black text-xl sm:text-2xl md:text-3xl" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            There's a better way to prepare. <span style={{ color: '#F0C060' }}>There's Cognify.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Features section ───────────────────────────────────────────────────────
function FeaturesSection() {
  const isDark = useContext(ThemeCtx)
  const [ref, visible] = useReveal()

  const t = (light, dark) => isDark ? dark : light

  // Purple-gradient cards (non-light): brighter in light, deeper in dark
  const darkCardBg = isDark
    ? 'linear-gradient(135deg, #2D1B69, #4C1D95)'
    : 'linear-gradient(135deg, #7C3AED, #9333EA)'

  // "light" cards: white in light mode, dark purple tint in dark mode
  const lightCardBg = t('white', 'rgba(45,27,105,0.3)')
  const lightCardBorder = t('1.5px solid #EDE9FE', '1.5px solid rgba(124,58,237,0.2)')
  const lightCardTitle = t('#1A0D3D', 'white')
  const lightCardBody = t('#6B7280', 'rgba(255,255,255,0.6)')
  const lightCardIconBg = t('#EDE9FE', 'rgba(255,255,255,0.1)')
  const lightCardIconColor = t('#7C3AED', '#C4B5FD')

  const features = [
    { icon: <Icon.Brain />, title: 'Personalized Learning', body: 'Self-paced review recommendations based on your performance and learning gaps — no more guessing what to study next.', wide: true, light: false },
    { icon: <Icon.TrendUp />, title: 'Progress Tracking', body: 'See your readiness level across all 4 main core subjects at a glance. Know exactly where you stand.', wide: false, light: false },
    { icon: <Icon.Target />, title: 'Mock Board Exam', body: 'Simulate the real Psychometrician Licensure Exam with full-length mock exams.', wide: false, light: true },
    { icon: <Icon.ClipboardCheck />, title: 'PRC TOS Alignment', body: 'Review topics and materials are aligned with the official PRC Table of Specifications — so your preparation stays focused on what actually matters.', wide: true, light: true },
  ]

  const cardClass = (f, i, rowIndex) => {
    const base = `section-reveal stagger-${i + 1 + rowIndex * 2} ${visible ? 'visible' : ''} card-hover rounded-2xl sm:rounded-3xl p-5 sm:p-7`
    if (rowIndex === 0) return `${base} ${i === 0 ? 'md:col-span-2' : 'md:col-span-1'}`
    return `${base} ${i === 1 ? 'md:col-span-2' : 'md:col-span-1'}`
  }

  const renderCard = (f, i, rowIndex) => (
    <div key={f.title} className={cardClass(f, i, rowIndex)}
      style={{ background: f.light ? lightCardBg : darkCardBg, border: f.light ? lightCardBorder : 'none' }}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5"
        style={{ background: f.light ? lightCardIconBg : 'rgba(255,255,255,0.15)', color: f.light ? lightCardIconColor : '#C4B5FD' }}>
        <div className="w-5 h-5 sm:w-6 sm:h-6">{f.icon}</div>
      </div>
      <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2"
        style={{ fontFamily: 'Plus Jakarta Sans', color: f.light ? lightCardTitle : 'white' }}>{f.title}</h3>
      <p className="text-sm leading-relaxed"
        style={{ color: f.light ? lightCardBody : 'rgba(255,255,255,0.75)' }}>{f.body}</p>
    </div>
  )

  return (
    <section id="features" ref={ref} className="py-16 sm:py-24 px-4 sm:px-6"
      style={{ background: t('#FAFAF8', '#0F0723') }}>
      <div className="max-w-5xl mx-auto">
        <div className={`section-reveal ${visible ? 'visible' : ''} text-center mb-10 sm:mb-14`}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 sm:mb-4"
            style={{ color: t('#7C3AED', '#C4B5FD') }}>Key Features</p>
          <h2 className="font-black leading-tight"
            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: t('#1A0D3D', 'white') }}>
            Here's how{' '}
            <span style={{ background: 'linear-gradient(135deg, #7C3AED, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Cognify</span>
            {' '}helps.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {[features[0], features[1]].map((f, i) => renderCard(f, i, 0))}
          {[features[2], features[3]].map((f, i) => renderCard(f, i, 1))}
        </div>
      </div>
    </section>
  )
}

// ── Download section ───────────────────────────────────────────────────────
function DownloadSection({ config, onDownload }) {
  const [ref, visible] = useReveal()

  return (
    <section id="download" ref={ref} className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #2D1B69 0%, #1A0D3D 60%, #0F0723 100%)' }}>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-30" style={{ background: '#7C3AED' }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        <div className={`section-reveal ${visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 sm:mb-8"
            style={{ background: 'rgba(240,192,96,0.15)', border: '1px solid rgba(240,192,96,0.3)' }}>
            <span className="w-4 h-4 text-yellow-300"><Icon.Android /></span>
            <span className="text-yellow-300 text-xs font-semibold tracking-wide uppercase">Available on Android</span>
          </div>

          <h2 className="font-black leading-tight text-balance"
            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 'clamp(1.9rem, 5vw, 3.5rem)', color: 'white' }}>
            Ready to prepare<br />
            <span style={{ color: '#F0C060' }}>the right way?</span>
          </h2>

          <p className="mt-5 sm:mt-6 text-white/60 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            Download Cognify for free. Enable unknown sources on your Android device, install the APK, and start your first review session in minutes.
          </p>

          <button onClick={onDownload}
            className="mt-8 sm:mt-10 w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #F0C060, #E8A830)', color: '#1A0D3D', boxShadow: '0 12px 48px rgba(240,192,96,0.4)' }}>
            <span className="w-5 h-5 sm:w-6 sm:h-6"><Icon.Download /></span>
            Download Cognify APK — Free
          </button>

          {config && (
            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <span className="text-white/40 text-sm">Version {config.version}</span>
              <span className="text-white/20 text-sm">·</span>
              <span className="text-white/40 text-sm">Android {config.minAndroid}+</span>
            </div>
          )}

          <div className="mt-10 sm:mt-12 rounded-2xl p-5 sm:p-6 text-left max-w-md mx-auto"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 text-sm font-semibold mb-3">Quick install guide</p>
            <div className="space-y-2.5 sm:space-y-2">
              {[
                'Tap "Download Cognify APK" above',
                'Open the downloaded file from your notifications',
                'Allow "Install unknown apps" when prompted',
                "Install and launch Cognify — you're in.",
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                    style={{ background: '#7C3AED', color: 'white' }}>{i + 1}</span>
                  <p className="text-white/50 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  const isDark = useContext(ThemeCtx)
  const t = (light, dark) => isDark ? dark : light

  return (
    <footer className="px-4 sm:px-6 py-8 sm:py-10"
      style={{
        background: t('#F0ECFF', '#0F0723'),
        borderTop: `1px solid ${t('rgba(124,58,237,0.1)', 'rgba(255,255,255,0.06)')}`,
      }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <img src="/cognify-logo.png" alt="Cognify" className="h-7 w-auto" style={{ opacity: t(1, 0.8) }} />
          <span className="font-bold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans', background: 'linear-gradient(135deg, #7C3AED, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Cognify</span>
        </div>

        <p className="text-xs sm:text-sm" style={{ color: t('#6B7280', 'rgba(255,255,255,0.3)') }}>
          A guided learning and support system for Licensure Exam Readiness in Psychology.
          <br />
          Developed for CvSU-B · Department of Arts and Sciences
        </p>
      </div>
    </footer>
  )
}

// ── Root App ───────────────────────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [config, setConfig] = useState(null)
  const [apkSize, setApkSize] = useState(null)

  useEffect(() => {
    document.body.style.background = isDark ? '#1A0D3D' : '#FAFAF8'
  }, [isDark])

  useEffect(() => {
    fetch('/download.config.json')
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => setConfig({ downloadUrl: '#', version: '1.0.0', minAndroid: '8.0' }))
  }, [])

  useEffect(() => {
    fetch('https://api.github.com/repos/joana2727/cognify-app/releases/latest')
      .then((r) => r.json())
      .then((data) => {
        const size = data.assets?.[0]?.size
        if (size) setApkSize(`${(size / (1024 * 1024)).toFixed(0)} MB`)
      })
      .catch(() => {})
  }, [])

  const handleDownload = useCallback(() => {
    if (config?.downloadUrl && config.downloadUrl !== '#') {
      window.open(config.downloadUrl, '_blank', 'noopener,noreferrer')
    }
  }, [config])

  return (
    <ThemeCtx.Provider value={isDark}>
      <div className="grain">
        <Nav onDownload={handleDownload} toggleTheme={() => setIsDark(d => !d)} />
        <Hero onDownload={handleDownload} config={config} apkSize={apkSize} />
        <ProblemSection />
        <FeaturesSection />
        <DownloadSection config={config} onDownload={handleDownload} />
        <Footer />
      </div>
    </ThemeCtx.Provider>
  )
}
