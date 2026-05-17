import { useParams, useNavigate } from 'react-router'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { content, projectDetails, type Language } from '../data/content'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ProjectDetailProps {
  lang: Language
}

export default function ProjectDetail({ lang }: ProjectDetailProps) {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)

  const c = content[lang]
  const project = c.work.projects.find((p) => p.slug === slug)
  const detail = slug ? projectDetails[slug]?.[lang] : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!pageRef.current) return
    const els = pageRef.current.querySelectorAll('.animate-in')
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [slug, lang])

  if (!project || !detail) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg)',
          color: 'var(--ink)',
          padding: '0 40px',
        }}
      >
        <h2
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 40,
            color: 'var(--ink)',
          }}
        >
          Project not found
        </h2>
        <button
          onClick={() => navigate('/')}
          className="font-sans"
          style={{
            marginTop: 24,
            color: 'var(--accent)',
            fontSize: 14,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          ← Back to home
        </button>
      </div>
    )
  }

  const ink = 'var(--ink)'
  const gray = 'var(--gray)'
  const accent = 'var(--accent)'
  const cardBg = 'var(--card-bg)'
  const cardBorder = 'var(--card-border)'
  const statBg = 'var(--stat-bg)'

  return (
    <div
      ref={pageRef}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        paddingTop: 100,
        paddingBottom: 80,
        transition: 'background-color 0.4s ease',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="animate-in font-sans"
          style={{
            color: gray,
            fontSize: 12,
            letterSpacing: '1.32px',
            textTransform: 'uppercase',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: 40,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = ink)}
          onMouseLeave={(e) => (e.currentTarget.style.color = gray)}
        >
          ← {lang === 'en' ? 'Back to projects' : 'プロジェクトに戻る'}
        </button>

        {/* Header */}
        <div className="animate-in" style={{ marginBottom: 64 }}>
          <p
            className="font-sans"
            style={{
              fontSize: 10,
              letterSpacing: '1.32px',
              textTransform: 'uppercase',
              color: accent,
              fontWeight: 400,
              marginBottom: 16,
              transition: 'color 0.4s ease',
            }}
          >
            {project.num}
          </p>
          <h1
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-2px',
              lineHeight: '60px',
              color: ink,
              marginBottom: 16,
              transition: 'color 0.4s ease',
            }}
          >
            {project.title}
          </h1>
          <p
            className="font-sans"
            style={{
              fontSize: 18,
              color: gray,
              lineHeight: '28px',
              maxWidth: 640,
              transition: 'color 0.4s ease',
            }}
          >
            {project.description}
          </p>
        </div>

        {/* GitHub link */}
        <div className="animate-in" style={{ marginBottom: 64 }}>
          <a
            href={detail.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: accent,
              fontSize: 14,
              textDecoration: 'none',
              border: `1px solid ${accent}`,
              borderRadius: 8,
              padding: '10px 20px',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = accent
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            {lang === 'en' ? 'View on GitHub' : 'GitHubで見る'}
          </a>
        </div>

        {/* Architecture section */}
        <section className="animate-in" style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: '-1px',
              color: ink,
              marginBottom: 32,
              transition: 'color 0.4s ease',
            }}
          >
            {lang === 'en' ? 'Architecture' : 'アーキテクチャ'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {detail.architecture.map((item, i) => (
              <div
                key={i}
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 12,
                  padding: 24,
                  transition: 'background 0.4s ease, border-color 0.4s ease',
                }}
              >
                <p
                  className="font-sans"
                  style={{
                    fontSize: 15,
                    color: gray,
                    lineHeight: '24px',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="animate-in" style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: '-1px',
              color: ink,
              marginBottom: 32,
              transition: 'color 0.4s ease',
            }}
          >
            {lang === 'en' ? 'Technology Stack' : '技術スタック'}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 16,
            }}
          >
            {detail.stack.map((item, i) => (
              <div
                key={i}
                style={{
                  background: statBg,
                  backdropFilter: 'blur(12px)',
                  borderRadius: 12,
                  padding: 24,
                  transition: 'background 0.4s ease',
                }}
              >
                <p
                  className="font-sans"
                  style={{
                    fontSize: 11,
                    letterSpacing: '1.32px',
                    textTransform: 'uppercase',
                    color: accent,
                    fontWeight: 400,
                    marginBottom: 8,
                    transition: 'color 0.4s ease',
                  }}
                >
                  {item.category}
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: 14,
                    color: gray,
                    lineHeight: '22px',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {item.items}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="animate-in" style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: '-1px',
              color: ink,
              marginBottom: 32,
              transition: 'color 0.4s ease',
            }}
          >
            {lang === 'en' ? 'Key Features' : '主な機能'}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 12,
            }}
          >
            {detail.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start"
                style={{ gap: 12 }}
              >
                <span
                  style={{
                    color: accent,
                    fontSize: 16,
                    lineHeight: '24px',
                    flexShrink: 0,
                    transition: 'color 0.4s ease',
                  }}
                >
                  ✓
                </span>
                <p
                  className="font-sans"
                  style={{
                    fontSize: 15,
                    color: gray,
                    lineHeight: '24px',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Real World Applications */}
        <section className="animate-in" style={{ marginBottom: 80 }}>
          <h2
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: '-1px',
              color: ink,
              marginBottom: 32,
              transition: 'color 0.4s ease',
            }}
          >
            {lang === 'en' ? 'Real-World Applications' : '実世界のアプリケーション'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {detail.realWorld.map((app, i) => (
              <div
                key={i}
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 12,
                  padding: 24,
                  borderLeft: `3px solid ${accent}`,
                  transition: 'background 0.4s ease, border-color 0.4s ease',
                }}
              >
                <p
                  className="font-sans"
                  style={{
                    fontSize: 15,
                    color: gray,
                    lineHeight: '24px',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {app}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div
          className="animate-in"
          style={{
            textAlign: 'center',
            padding: '48px 0',
            borderTop: '1px solid var(--border)',
          }}
        >
          <button
            onClick={() => navigate('/')}
            className="font-sans"
            style={{
              color: accent,
              fontSize: 14,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              transition: 'color 0.4s ease',
            }}
          >
            ← {lang === 'en' ? 'Back to all projects' : 'すべてのプロジェクトに戻る'}
          </button>
        </div>
      </div>
    </div>
  )
}
