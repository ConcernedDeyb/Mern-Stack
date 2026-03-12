import { useState, useEffect, useRef } from "react";

// ─── Matrix Rain Background ───────────────────────────────────────────────────
function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01";
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(2, 8, 28, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 180, 255, 0.12)";
      ctx.font = `${fontSize}px monospace`;

      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(1);

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.85,
      }}
    />
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>
        Cy<span style={styles.logoAccent}>F</span>ive
      </span>
      <div style={styles.navLinks}>
        {["Home", "About us", "Pricing", "Contact us"].map((item) => (
          <button
            key={item}
            onClick={() => {}}
            style={{
              ...styles.navLink,
              ...(item === "Pricing" ? styles.navLinkActive : {}),
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <button style={styles.signInBtn}>Sign in</button>
    </nav>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────
const PLANS = [
  {
    tier: "Starter",
    price: { monthly: 29, annual: 23 },
    badge: null,
    color: "#00b4ff",
    icon: "🛡",
    description: "Perfect for small teams & startups monitoring basic threats.",
    features: [
      "Up to 3 monitored endpoints",
      "Real-time alerts (email)",
      "Basic anomaly detection",
      "7-day log retention",
      "Community support",
      "Dashboard access",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    tier: "Professional",
    price: { monthly: 79, annual: 63 },
    badge: "Most Popular",
    color: "#ff6a00",
    icon: "⚡",
    description: "Advanced IDS for growing organizations with higher traffic.",
    features: [
      "Up to 25 monitored endpoints",
      "Real-time alerts (email + SMS)",
      "AI-powered threat scoring",
      "30-day log retention",
      "Priority support (24/7)",
      "Custom rule builder",
      "Threat intelligence feed",
      "API access",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    tier: "Enterprise",
    price: { monthly: 199, annual: 159 },
    badge: null,
    color: "#a78bfa",
    icon: "🔒",
    description: "Full-spectrum protection for large-scale infrastructures.",
    features: [
      "Unlimited endpoints",
      "Real-time alerts (all channels)",
      "Advanced ML threat models",
      "Unlimited log retention",
      "Dedicated security analyst",
      "Custom integrations (SIEM/SOAR)",
      "Compliance reporting",
      "SLA guarantee (99.99%)",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

function PricingCard({ plan, billing, index }) {
  const [hovered, setHovered] = useState(false);
  const price = billing === "annual" ? plan.price.annual : plan.price.monthly;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        ...(plan.highlight ? styles.cardHighlight : {}),
        transform: hovered
          ? "translateY(-10px) scale(1.02)"
          : plan.highlight
          ? "translateY(-6px)"
          : "translateY(0)",
        boxShadow: hovered
          ? `0 0 40px ${plan.color}55, 0 20px 60px rgba(0,0,0,0.5)`
          : plan.highlight
          ? `0 0 30px ${plan.color}40, 0 12px 40px rgba(0,0,0,0.4)`
          : "0 4px 30px rgba(0,0,0,0.35)",
        animationDelay: `${index * 0.15}s`,
        borderColor: plan.highlight
          ? plan.color
          : hovered
          ? `${plan.color}88`
          : "rgba(255,255,255,0.07)",
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <div style={{ ...styles.badge, background: plan.color }}>
          {plan.badge}
        </div>
      )}

      {/* Icon & Tier */}
      <div style={styles.cardHeader}>
        <div
          style={{
            ...styles.iconCircle,
            background: `${plan.color}22`,
            border: `1.5px solid ${plan.color}55`,
            color: plan.color,
          }}
        >
          {plan.icon}
        </div>
        <h3 style={{ ...styles.tierName, color: plan.color }}>{plan.tier}</h3>
        <p style={styles.tierDesc}>{plan.description}</p>
      </div>

      {/* Price */}
      <div style={styles.priceRow}>
        <span style={styles.currency}>$</span>
        <span style={styles.priceAmount}>{price}</span>
        <span style={styles.pricePer}>/mo</span>
      </div>
      {billing === "annual" && (
        <p style={{ ...styles.savingTag, color: plan.color }}>
          Save ${(plan.price.monthly - plan.price.annual) * 12}/yr
        </p>
      )}

      {/* Divider */}
      <div
        style={{ ...styles.divider, background: `${plan.color}33` }}
      />

      {/* Features */}
      <ul style={styles.featureList}>
        {plan.features.map((f) => (
          <li key={f} style={styles.featureItem}>
            <span style={{ ...styles.checkIcon, color: plan.color }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        style={{
          ...styles.ctaBtn,
          background: plan.highlight
            ? plan.color
            : "transparent",
          border: `1.5px solid ${plan.color}`,
          color: plan.highlight ? "#fff" : plan.color,
          boxShadow: hovered ? `0 0 20px ${plan.color}66` : "none",
        }}
      >
        {plan.cta}
      </button>
    </div>
  );
}

// ─── FAQ Strip ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Can I switch plans later?",
    a: "Yes, upgrade or downgrade anytime from your dashboard.",
  },
  {
    q: "Is there a free trial?",
    a: "Professional plan includes a 14-day free trial — no card required.",
  },
  {
    q: "What protocols does CyFive support?",
    a: "TCP/IP, HTTP/S, DNS, SMTP, FTP, and custom protocol parsing via API.",
  },
  {
    q: "How is data stored?",
    a: "All logs are AES-256 encrypted at rest and in transit.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section style={styles.faqSection}>
      <h2 style={styles.sectionTitle}>
        Frequently Asked <span style={styles.accentText}>Questions</span>
      </h2>
      <div style={styles.faqList}>
        {FAQS.map((item, i) => (
          <div
            key={i}
            style={{
              ...styles.faqItem,
              borderColor:
                open === i ? "rgba(0,180,255,0.4)" : "rgba(255,255,255,0.07)",
            }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div style={styles.faqQuestion}>
              <span>{item.q}</span>
              <span
                style={{
                  ...styles.faqToggle,
                  transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  color: open === i ? "#00b4ff" : "#aaa",
                }}
              >
                +
              </span>
            </div>
            {open === i && <p style={styles.faqAnswer}>{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Pricing Page ────────────────────────────────────────────────────────
export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div style={styles.root}>
      <MatrixBackground />
      <Navbar />

      <main style={styles.main}>
        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroPill}>
            <span style={styles.pillDot} />
            SUBSCRIPTION PLANS
          </div>
          <h1 style={styles.heroTitle}>
            Choose Your <span style={styles.accentText}>Defense</span> Level
          </h1>
          <p style={styles.heroSub}>
            AI-powered Intrusion Detection System — monitor, analyze &amp;
            neutralize threats in real time. Scale your protection as you grow.
          </p>

          {/* Billing Toggle */}
          <div style={styles.toggleWrapper}>
            <button
              style={{
                ...styles.toggleBtn,
                background:
                  billing === "monthly"
                    ? "rgba(0,180,255,0.15)"
                    : "transparent",
                color: billing === "monthly" ? "#00b4ff" : "#aaa",
                border:
                  billing === "monthly"
                    ? "1px solid rgba(0,180,255,0.4)"
                    : "1px solid transparent",
              }}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              style={{
                ...styles.toggleBtn,
                background:
                  billing === "annual"
                    ? "rgba(255,106,0,0.15)"
                    : "transparent",
                color: billing === "annual" ? "#ff6a00" : "#aaa",
                border:
                  billing === "annual"
                    ? "1px solid rgba(255,106,0,0.4)"
                    : "1px solid transparent",
              }}
              onClick={() => setBilling("annual")}
            >
              Annual
              <span style={styles.saveBadge}>Save 20%</span>
            </button>
          </div>
        </section>

        {/* Cards */}
        <section style={styles.cardsSection}>
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.tier} plan={plan} billing={billing} index={i} />
          ))}
        </section>

        {/* Trust Bar */}
        <div style={styles.trustBar}>
          {[
            "🔐 SOC 2 Type II Certified",
            "🌐 99.99% Uptime SLA",
            "⚡ <50ms Detection Latency",
            "🛡 GDPR & HIPAA Compliant",
          ].map((t) => (
            <span key={t} style={styles.trustItem}>
              {t}
            </span>
          ))}
        </div>

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.logo}>
          Cy<span style={styles.logoAccent}>F</span>ive
        </span>
        <span style={styles.footerText}>
          © 2025 CyFive Security. All rights reserved.
        </span>
        <div style={styles.footerLinks}>
          {["Privacy Policy", "Terms of Service", "Security"].map((l) => (
            <button
              key={l}
              onClick={() => {}}
              style={{
                ...styles.footerLink,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020818 0%, #021226 50%, #030d1f 100%)",
    fontFamily: "'Rajdhani', 'Exo 2', 'Orbitron', sans-serif",
    color: "#e2e8f0",
    position: "relative",
    overflowX: "hidden",
  },

  // ── Navbar
  nav: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 60px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(2,8,28,0.6)",
    backdropFilter: "blur(12px)",
  },
  logo: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  logoAccent: { color: "#00b4ff" },
  navLinks: { display: "flex", gap: "32px" },
  navLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "1px",
    transition: "color 0.2s",
  },
  navLinkActive: { color: "#00b4ff" },
  signInBtn: {
    padding: "8px 22px",
    border: "1.5px solid rgba(0,180,255,0.5)",
    borderRadius: "20px",
    background: "transparent",
    color: "#00b4ff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "all 0.2s",
  },

  // ── Main
  main: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px 60px",
  },

  // ── Hero
  hero: {
    textAlign: "center",
    padding: "70px 0 40px",
  },
  heroPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 18px",
    border: "1px solid rgba(0,180,255,0.3)",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "3px",
    color: "#00b4ff",
    background: "rgba(0,180,255,0.07)",
    marginBottom: "20px",
  },
  pillDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#00b4ff",
    boxShadow: "0 0 8px #00b4ff",
    display: "inline-block",
    animation: "pulse 1.5s infinite",
  },
  heroTitle: {
    fontSize: "clamp(34px, 5vw, 58px)",
    fontWeight: 800,
    letterSpacing: "2px",
    lineHeight: 1.15,
    margin: "0 0 16px",
    color: "#fff",
    textShadow: "0 0 40px rgba(0,180,255,0.2)",
  },
  heroSub: {
    fontSize: "16px",
    color: "#94a3b8",
    maxWidth: "560px",
    margin: "0 auto 32px",
    lineHeight: 1.7,
    fontWeight: 400,
    fontFamily: "sans-serif",
  },
  accentText: {
    color: "#00b4ff",
    textShadow: "0 0 20px rgba(0,180,255,0.5)",
  },

  // ── Toggle
  toggleWrapper: {
    display: "inline-flex",
    gap: "6px",
    padding: "5px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.03)",
  },
  toggleBtn: {
    padding: "9px 28px",
    borderRadius: "24px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.25s",
    fontFamily: "inherit",
  },
  saveBadge: {
    fontSize: "10px",
    padding: "2px 8px",
    background: "rgba(255,106,0,0.25)",
    borderRadius: "10px",
    color: "#ff6a00",
    fontWeight: 700,
    letterSpacing: "0.5px",
  },

  // ── Cards
  cardsSection: {
    display: "flex",
    gap: "24px",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    padding: "40px 0 20px",
  },
  card: {
    flex: "1 1 300px",
    maxWidth: "350px",
    background: "rgba(10, 25, 55, 0.75)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "18px",
    padding: "32px 28px",
    backdropFilter: "blur(16px)",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
  },
  cardHighlight: {
    background: "rgba(10, 25, 60, 0.9)",
    border: "1.5px solid #ff6a00",
  },
  badge: {
    position: "absolute",
    top: "-14px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "4px 18px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
    color: "#fff",
    whiteSpace: "nowrap",
    boxShadow: "0 0 16px rgba(255,106,0,0.5)",
  },
  cardHeader: {
    marginBottom: "20px",
    textAlign: "center",
  },
  iconCircle: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    margin: "0 auto 14px",
  },
  tierName: {
    fontSize: "22px",
    fontWeight: 800,
    letterSpacing: "2px",
    textTransform: "uppercase",
    margin: "0 0 8px",
  },
  tierDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    lineHeight: 1.5,
    fontFamily: "sans-serif",
    fontWeight: 400,
  },
  priceRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "4px",
    marginBottom: "4px",
  },
  currency: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#94a3b8",
    marginTop: "8px",
  },
  priceAmount: {
    fontSize: "52px",
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1,
    letterSpacing: "-1px",
  },
  pricePer: {
    fontSize: "14px",
    color: "#94a3b8",
    alignSelf: "flex-end",
    marginBottom: "10px",
  },
  savingTag: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1px",
    marginBottom: "4px",
  },
  divider: {
    height: "1px",
    margin: "20px 0",
    borderRadius: "1px",
  },
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 24px",
    display: "flex",
    flexDirection: "column",
    gap: "11px",
    flex: 1,
  },
  featureItem: {
    fontSize: "13.5px",
    color: "#cbd5e1",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontFamily: "sans-serif",
    fontWeight: 400,
  },
  checkIcon: {
    fontSize: "15px",
    fontWeight: 700,
    flexShrink: 0,
  },
  ctaBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: "30px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "2px",
    textTransform: "uppercase",
    transition: "all 0.25s",
    fontFamily: "inherit",
    marginTop: "auto",
  },

  // ── Trust Bar
  trustBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
    padding: "28px 0",
  },
  trustItem: {
    fontSize: "12.5px",
    color: "#64748b",
    padding: "8px 20px",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.02)",
    letterSpacing: "0.5px",
    fontFamily: "sans-serif",
  },

  // ── FAQ
  faqSection: {
    maxWidth: "700px",
    margin: "20px auto 0",
    padding: "0 0 20px",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: 800,
    letterSpacing: "2px",
    marginBottom: "28px",
    color: "#fff",
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  faqItem: {
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "18px 22px",
    background: "rgba(10,25,55,0.6)",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    transition: "border-color 0.25s",
  },
  faqQuestion: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    color: "#e2e8f0",
  },
  faqToggle: {
    fontSize: "22px",
    fontWeight: 300,
    lineHeight: 1,
    transition: "transform 0.25s, color 0.25s",
  },
  faqAnswer: {
    marginTop: "12px",
    fontSize: "13.5px",
    color: "#94a3b8",
    lineHeight: 1.7,
    fontFamily: "sans-serif",
    fontWeight: 400,
  },

  // ── Footer
  footer: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    padding: "20px 60px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(2,8,28,0.6)",
    backdropFilter: "blur(12px)",
  },
  footerText: {
    fontSize: "12px",
    color: "#475569",
    fontFamily: "sans-serif",
  },
  footerLinks: { display: "flex", gap: "20px" },
  footerLink: {
    fontSize: "12px",
    color: "#475569",
    textDecoration: "none",
    fontFamily: "sans-serif",
  },
};
