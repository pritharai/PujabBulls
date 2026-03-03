// src/components/Blog/BlogHero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Full-width dot-grid hero banner at the top of the public blog listing

export default function BlogHero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">

          {/* Eyebrow badge */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <span className="hero-eyebrow-text">Certified Vastu Expert</span>
            <span className="hero-eyebrow-sep">·</span>
            <span className="hero-eyebrow-sub">Kundli · Panchang · Numerology</span>
          </div>

          {/* Headline */}
          <h1 className="hero-h1">
            Ancient Vastu<br />
            <span className="hero-green">Wisdom</span><br />
            Rediscovered
          </h1>

          {/* Sub-copy */}
          <p className="hero-body">
            Transform your spaces with authentic Vastu Shastra — directional
            harmony, Brahmasthan energy, auspicious plots, and cosmic alignment
            for modern living.
          </p>

          {/* CTAs */}
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg">Explore Articles</button>
            <button className="btn btn-outline btn-lg">Get Consultation</button>
          </div>

        </div>
      </div>
    </section>
  );
}
