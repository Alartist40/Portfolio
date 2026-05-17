interface FooterProps {
  content: {
    name: string
    year: string
  }
}

export default function Footer({ content }: FooterProps) {
  const gray = 'var(--gray)'

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '32px 40px',
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span
        className="font-sans"
        style={{
          fontSize: 12,
          letterSpacing: '1.32px',
          textTransform: 'uppercase',
          color: gray,
          fontWeight: 400,
          transition: 'color 0.4s ease',
        }}
      >
        {content.name}
      </span>
      <span
        className="font-sans"
        style={{
          fontSize: 12,
          letterSpacing: '1.32px',
          textTransform: 'uppercase',
          color: gray,
          fontWeight: 400,
          transition: 'color 0.4s ease',
        }}
      >
        {content.year}
      </span>
    </footer>
  )
}
