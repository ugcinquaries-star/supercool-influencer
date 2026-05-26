import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="sc-home">

      {/* ─────────────────────────────────────── HERO */}
      <section className="sc-hero">
        <div className="sc-hero__badge">The Intelligence Layer for AI Creators</div>

        <h1 className="sc-hero__h1">
          Engineer viral<br />
          <em>AI content</em><br />
          <em>in 60 seconds.</em>
        </h1>

        <p className="sc-hero__sub">
          No ideas. No team. <strong>No problem.</strong><br />
          SuperCool generates cinematic prompts, motion scripts, hooks, captions,
          keywords and hashtags — ready for Higgsfield in under a minute.
        </p>

        <div className="sc-hero__ctas">
          <Link href="/generate" className="sc-btn sc-btn--primary">
            ⚡ Start Free — 3 Briefs
          </Link>
          <Link href="/pricing" className="sc-btn sc-btn--ghost">
            View Pricing →
          </Link>
        </div>

        <p className="sc-hero__footnote">
          <strong>3 free briefs</strong> · No credit card required
        </p>

        {/* Feature pill list */}
        <ul className="sc-hero__features">
          {[
            "🎬 Cinematic motion scripts + Seedance briefs",
            "🖼️ Hyper-realistic image prompts",
            "✍️ Viral hooks, captions + first comments",
            "# Keywords + hashtag intelligence",
            "⚡ Full creator workflow in 60 seconds",
          ].map((f) => (
            <li key={f} className="sc-hero__feature-pill">{f}</li>
          ))}
        </ul>

        {/* Live dashboard preview */}
        <div className="sc-dashboard-preview">
          <div className="sc-dp__row">
            <div className="sc-dp__card sc-dp__card--trend">
              <span className="sc-dp__label">Trend Intel</span>
              <span className="sc-dp__badge sc-dp__badge--live">Live</span>
              <div className="sc-dp__stat">2.4M</div>
              <p className="sc-dp__caption">views on <em>#skincareroutine</em> this week</p>
            </div>
            <div className="sc-dp__card sc-dp__card--realism">
              <span className="sc-dp__label">Realism Score</span>
              <div className="sc-dp__stat">94/100</div>
              <p className="sc-dp__caption"><em>Human Realism Engine™</em> active</p>
              <div className="sc-dp__bars">
                {[["Skin Truth", 97], ["Eye Behavior", 94], ["Motion", 91]].map(([l, v]) => (
                  <div key={l as string} className="sc-dp__bar-row">
                    <span>{l}</span>
                    <div className="sc-dp__bar-track">
                      <div className="sc-dp__bar-fill" style={{ width: `${v}%` }} />
                    </div>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hooks */}
          <div className="sc-dp__card sc-dp__card--hooks">
            <span className="sc-dp__label">Viral Hook Extraction — Top 3 for this niche</span>
            {[
              "—girl my knuckles been clear for 3 weeks straight, look—",
              "I spent $47 testing every brightening serum. Only one worked.",
              "The reason your skincare isn't working (it's not the product)",
            ].map((h) => (
              <div key={h} className="sc-dp__hook">"{h}"</div>
            ))}
          </div>

          {/* Seedance prompt */}
          <div className="sc-dp__card sc-dp__card--prompt">
            <span className="sc-dp__label">Seedance 2.0 Prompt</span>
            <p className="sc-dp__prompt-text">
              <strong>SCENE [0–3s]:</strong> Elena reclined on cream lounge, golden hour. iPad FaceTime active.{" "}
              <strong>FACE LOCK:</strong> warm Fitzpatrick III, coily updo, asymmetric blink at 0.4s.{" "}
              <strong>VOICEOVER:</strong> "—girl I'm tellin' you, look—"
            </p>
          </div>

          {/* Caption */}
          <div className="sc-dp__card sc-dp__card--caption">
            <span className="sc-dp__label">Generated Caption — TikTok</span>
            <p className="sc-dp__caption-text">
              three weeks ago my knuckles looked completely different and I genuinely thought nothing would work | I started this routine and the change hit me mid-FaceTime when my friend pointed it out before I even mentioned it | the serum first, every knuckle, five minutes, then the cream — that's the whole thing | what's wild is it's not doing the most, it's just actually working | save this if your knuckles have been on your mind 🤍
            </p>
            <div className="sc-dp__tags">
              {["#skincareroutine", "#knucklecare", "#glowup", "#realresults", "#ugccreator"].map(t => (
                <span key={t} className="sc-dp__tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Tool badges */}
          <div className="sc-dp__tools">
            <span className="sc-dp__label">Outputs ready for</span>
            <div className="sc-dp__tool-badges">
              {["Seedance 2.0", "Kling 1.6", "Runway Gen-4", "Midjourney", "Flux", "HeyGen", "Nano Banana"].map(t => (
                <span key={t} className="sc-dp__tool-badge">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────── MARQUEE */}
      <div className="sc-marquee" aria-hidden="true">
        <div className="sc-marquee__track">
          {Array(3).fill([
            "Human Realism Engine™", "Motion Psychology™", "GTA-Style Behavioral Realism",
            "Anti-Generic AI", "Cinematic Direction", "Identity Lock™",
            "60-Second Campaigns", "Creator OS",
          ]).flat().map((t, i) => (
            <span key={i} className="sc-marquee__item">{t}</span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────── STORYBOARD */}
      <section className="sc-storyboard">
        <div className="sc-storyboard__grid">
          {[1,2,3,4,5,6,7,8].map(n => (
            <div key={n} className="sc-sb__frame">
              <Image
                src={`/sb-${n}.png`}
                alt={["Entrance Walk","Covered Reveal","Contract Sign","G-Wagon Reveal","Interior","Keys + Roses","Aerial Drive","G-Wagon Pose"][n-1]}
                fill
                className="sc-sb__img"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <span className="sc-sb__num">{n}.</span>
              <span className="sc-sb__caption">{["Entrance Walk","Covered Reveal","Contract Sign","G-Wagon Reveal","Interior","Keys + Roses","Aerial Drive","G-Wagon Pose"][n-1]}</span>
            </div>
          ))}
        </div>

        <div className="sc-storyboard__copy">
          <p className="sc-section-eyebrow">Brief → Output</p>
          <h2 className="sc-h2">
            One SuperCool brief.<br />
            <em>Eight shots. Higgsfield-ready.</em>
          </h2>
          <p className="sc-body">
            A real SuperCool brief. The client took this straight into Higgsfield.
            Zero guesswork — every scene, motion, and hook pre-engineered for virality.
          </p>

          {/* Brief card */}
          <div className="sc-brief-card">
            <div className="sc-brief-card__header">
              <span className="sc-brief-card__dot">● SUPERCOOL BRIEF</span>
              <span className="sc-brief-card__badge">GENERATED IN 60S</span>
            </div>
            <div className="sc-brief-card__body">
              <div className="sc-brief-card__field">
                <span className="sc-brief-card__field-label">CLIENT</span>
                <strong>Luxury Reel — Mercedes G-Wagon Delivery</strong>
              </div>
              <div className="sc-brief-card__field">
                <span className="sc-brief-card__field-label">CONCEPT</span>
                <p>Editorial cinematic reel. Woman purchasing her dream car. Dark luxury. No voiceover. Let the visuals do the work.</p>
              </div>
              <div className="sc-brief-card__field">
                <span className="sc-brief-card__field-label">SCENE STRUCTURE</span>
                <div className="sc-brief-card__shots">
                  {[
                    "Exterior walk-in. Back-facing, power walk, designer bag.",
                    "Covered car reveal. Black balloons. Dramatic pause.",
                    "Contract signing. Closeup, sunglasses on.",
                    "G-Wagon uncovered. She touches the hood.",
                    "Interior. Hands on wheel. Golden hour.",
                    "Keys + roses outside the dealership.",
                    "Aerial — G-Wagon on highway. Motion blur.",
                    "Champagne toast. Celebration.",
                  ].map((s, i) => (
                    <p key={i}><strong>Shot {i+1}:</strong> {s}</p>
                  ))}
                </div>
              </div>
              <div className="sc-brief-card__field">
                <span className="sc-brief-card__field-label">VIRAL HOOK</span>
                <p className="sc-brief-card__hook">"She didn't announce it. She just pulled up."</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="sc-stats">
            {[["60s","Brief Time"],["8","Shots"],["96","Realism"],["Viral","Outcome"]].map(([v,l]) => (
              <div key={l} className="sc-stats__item">
                <span className="sc-stats__val">{v}</span>
                <span className="sc-stats__label">{l}</span>
              </div>
            ))}
          </div>

          <Link href="/generate" className="sc-btn sc-btn--primary sc-btn--full">
            ⚡ Generate Your Brief Free Now
          </Link>
          <p className="sc-footnote-sm">3 free briefs · No credit card required</p>
        </div>
      </section>

      {/* ─────────────────────────────────────── HOW IT WORKS */}
      <section className="sc-how">
        <p className="sc-section-eyebrow">How it works</p>
        <h2 className="sc-h2">3 steps.<br /><em>Full campaign.</em></h2>

        <div className="sc-how__steps">
          {[
            {
              n: "1",
              title: "Research",
              desc: "AI analyses TikTok, Reels and Shorts — extracting viral trends, hooks, keywords and audience psychology for your exact niche right now.",
              tags: ["Trend intel","Hook extraction","Keyword gaps","Audience psychology"],
            },
            {
              n: "2",
              title: "Generate",
              desc: "SuperCool builds your complete content package — cinematic Seedance briefs, motion scripts, image prompts, hooks, captions, hashtags and first comments.",
              tags: ["Seedance brief","Motion script","Image prompts","Captions + hooks"],
            },
            {
              n: "3",
              title: "Create & Publish",
              desc: "Paste prompts into Higgsfield, Kling or Midjourney. Generate your content. Post daily without burnout.",
              tags: ["Higgsfield","Kling","Midjourney","Runway"],
            },
          ].map((s) => (
            <div key={s.n} className="sc-how__step">
              <span className="sc-how__num">{s.n}</span>
              <h3 className="sc-how__title">{s.title}</h3>
              <p className="sc-how__desc">{s.desc}</p>
              <div className="sc-how__tags">
                {s.tags.map(t => <span key={t} className="sc-dp__tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────── FEATURES GRID */}
      <section className="sc-features">
        <p className="sc-section-eyebrow">Everything you get</p>
        <h2 className="sc-h2">Generated in <em>60 seconds.</em></h2>

        <div className="sc-features__grid">
          {[
            { img: "/feat-ugc.png", title: "AI UGC Ads", tags: ["AI UGC","Ads","Converts"], desc: "Authentic, realistic ads built on human behavior systems — believable motion that converts." },
            { img: "/feat-briefs.png", title: "Cinematic Reel Briefs", tags: ["Higgsfield","Motion","Scripts"], desc: "Full Seedance 2.0 production documents — scene breakdowns, timestamped scripts, blink schedules." },
            { img: "/feat-realism.png", title: "Hyper-Realistic Prompts", tags: ["Realism","Nano Banana","Midjourney"], desc: "Skin truth, eye behavior, fabric physics. Image prompts that look filmed not generated." },
            { img: "/feat-captions.png", title: "Viral Hooks + Captions", tags: ["TikTok","Instagram","Hooks"], desc: "Platform-native captions 5–7 sentences minimum. Zero generic. Zero one-liners. Real creator energy." },
            { img: "/feat-seo.png", title: "SEO Keyword Intelligence", tags: ["SEO","Discovery","Search"], desc: "Long-tail keywords people actually search — the exact phrases driving discovery." },
            { img: "/feat-hashtag.png", title: "Hashtag + First Comment", tags: ["Hashtags","First comment","Saves"], desc: "8-hashtag strategy (mega/mid/micro mix) plus a pinnable first comment engineered for saves." },
          ].map((f) => (
            <div key={f.title} className="sc-feat__card">
              <div className="sc-feat__img-wrap">
                <Image src={f.img} alt={f.title} fill className="sc-feat__img" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="sc-feat__body">
                <h3 className="sc-feat__title">{f.title}</h3>
                <p className="sc-feat__desc">{f.desc}</p>
                <div className="sc-feat__tags">
                  {f.tags.map(t => <span key={t} className="sc-dp__tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="sc-features__footer">Like having a full creative team — in your pocket.</p>
      </section>

      {/* ─────────────────────────────────────── INTELLIGENCE CARDS */}
      <section className="sc-intel">
        <div className="sc-intel__scroll">
          {[
            { n: "01", badge: "↗ Real-time", cat: "TREND ANALYSIS", title: "Trend Analysis", desc: "Surface what's spiking before it peaks. Platform signals decoded daily." },
            { n: "02", badge: "⊞ Architecture", cat: "ARCHITECTURE", title: "Retention Structures", desc: "Pattern interrupts, loop points, payoff architecture. Every frame earns the next." },
            { n: "03", badge: "◎ Psychology", cat: "PSYCHOLOGY", title: "Motion Psychology", desc: "Camera movement as emotional language. Dolly, drift, rack focus." },
            { n: "04", badge: "◈ Precision", cat: "PRECISION", title: "Realism Engineering", desc: "Skin texture, lighting physics, material response. Built to fool the eye." },
            { n: "05", badge: "⌖ Systems", cat: "SYSTEMS", title: "Creator Strategy", desc: "Content OS, monetization loops, positioning for long-term dominance." },
          ].map((c) => (
            <div key={c.n} className="sc-intel__card">
              <span className="sc-intel__num">{c.n}</span>
              <span className="sc-intel__badge">{c.badge}</span>
              <span className="sc-intel__cat">{c.cat}</span>
              <h3 className="sc-intel__title">{c.title}</h3>
              <p className="sc-intel__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────── SOCIAL PROOF */}
      <section className="sc-proof">
        <p className="sc-section-eyebrow">Real results</p>
        <h2 className="sc-h2">This is what our briefs<br /><em>actually produce.</em></h2>

        <blockquote className="sc-proof__quote">
          "SuperCool changed my content game. My retention went from 20% to 79%. The briefs are so specific — it's like having a{" "}
          <strong>creative team telling me exactly what to film, how to film it, and why it'll go viral.</strong>{" "}
          First reel hit 64.9K views. I just paste and go."
        </blockquote>

        <div className="sc-proof__profile">
          <div className="sc-proof__avatar-wrap">
            <Image src="/dina-profile.jpg" alt="Dinabrightsbeauty" width={56} height={56} className="sc-proof__avatar" />
          </div>
          <div>
            <strong className="sc-proof__name">Dinabrightsbeauty</strong>
            <p className="sc-proof__handle">@cardinacssaul · Luxury Skincare Creator</p>
            <span className="sc-proof__platform">TikTok</span>
          </div>
        </div>

        <div className="sc-proof__card">
          <div className="sc-proof__card-header">
            <div className="sc-proof__card-avatar-wrap">
              <Image src="/dina-profile.jpg" alt="Dinabrightsbeauty" width={44} height={44} className="sc-proof__avatar" />
            </div>
            <div>
              <strong>Dinabrightsbeauty</strong>
              <p className="sc-proof__card-handle">@cardinacssaul</p>
              <p className="sc-proof__card-bio">✨ Glass Skin Starts Here · Luxury Glow Skincare</p>
            </div>
            <span className="sc-proof__verified">✓ SuperCool Client</span>
          </div>

          <div className="sc-proof__videos">
            {[
              { src: "/dina-cream.jpg", views: "64.9K" },
              { src: "/dina-ulta.jpg", views: "11.6K" },
              { src: "/dina-glow.jpg", views: "12.4K" },
            ].map((v) => (
              <div key={v.src} className="sc-proof__vid">
                <Image src={v.src} alt="Video thumbnail" fill className="sc-proof__vid-img" sizes="33vw" />
                <span className="sc-proof__vid-views">▶ {v.views}</span>
                <span className="sc-proof__vid-pin">Pinned</span>
              </div>
            ))}
          </div>

          <div className="sc-proof__metrics">
            {[["18.9K","Followers"],["35.9K","Likes"],["3 Days","To Viral"]].map(([v,l]) => (
              <div key={l} className="sc-proof__metric">
                <span className="sc-proof__metric-val">{v}</span>
                <span className="sc-proof__metric-label">{l}</span>
              </div>
            ))}
          </div>

          <div className="sc-proof__stat-row">
            {[["79%","Avg Retention"],["64.9K","Top Video"],["+247%","Engagement"]].map(([v,l]) => (
              <div key={l} className="sc-proof__big-stat">
                <span className="sc-proof__big-val">{v}</span>
                <span className="sc-proof__big-label">{l}</span>
              </div>
            ))}
          </div>

          <p className="sc-proof__attribution">Brief by SuperCool · Executed in Higgsfield · Verified Results</p>
        </div>
      </section>

      {/* ─────────────────────────────────────── PRICING */}
      <section className="sc-pricing">
        <p className="sc-section-eyebrow">Pricing Comparison</p>
        <h2 className="sc-h2">The smartest investment<br /><em>you'll make this year.</em></h2>
        <p className="sc-body sc-pricing__sub">
          Stop paying agency rates for content that isn't built for virality. SuperCool gives you the intelligence layer for a fraction of the cost.
        </p>

        <div className="sc-pricing__compare">
          {/* Without */}
          <div className="sc-pricing__col sc-pricing__col--without">
            <h3 className="sc-pricing__col-title">Without SuperCool</h3>
            <div className="sc-pricing__rows">
              {[
                ["AI UGC Agency", "CHF 3,000+ / mo"],
                ["Freelance Content Creators", "CHF 2,500+ / mo"],
                ["Trend Research Tools", "CHF 200 / mo"],
                ["Strategy + Creative Direction", "CHF 1,500+ / mo"],
              ].map(([item, price]) => (
                <div key={item} className="sc-pricing__row">
                  <span className="sc-pricing__row-item">{item}</span>
                  <span className="sc-pricing__row-price sc-pricing__row-price--strike">{price}</span>
                </div>
              ))}
              <div className="sc-pricing__row sc-pricing__row--total">
                <span><strong>Estimated Total</strong></span>
                <span className="sc-pricing__row-price sc-pricing__row-price--strike sc-pricing__row-price--total"><strong>CHF 7,200+ / mo</strong></span>
              </div>
            </div>
          </div>

          {/* With */}
          <div className="sc-pricing__col sc-pricing__col--with">
            <div className="sc-pricing__col-header">
              <h3 className="sc-pricing__col-title sc-pricing__col-title--red">SuperCool Influencer</h3>
              <span className="sc-pricing__best-badge">BEST VALUE</span>
            </div>
            <div className="sc-pricing__rows">
              {[
                "Trend Analysis + Hook Extraction",
                "Cinematic Prompt Architecture",
                "Director Briefs — Scene, Motion, FACE LOCK",
                "Realism Engineering (94/100)",
                "Full Creator Workflow System",
              ].map((item) => (
                <div key={item} className="sc-pricing__row">
                  <span className="sc-pricing__row-item">{item}</span>
                  <span className="sc-pricing__included">✓ Included</span>
                </div>
              ))}
            </div>

            <div className="sc-pricing__price-block">
              <span className="sc-pricing__currency">CHF</span>
              <span className="sc-pricing__amount">29</span>
              <span className="sc-pricing__period">/ month</span>
            </div>

            <Link href="/generate" className="sc-btn sc-btn--primary sc-btn--full">
              ⚡ Start Free — 3 Briefs
            </Link>
            <p className="sc-footnote-sm">3 free briefs · No credit card required</p>

            <p className="sc-pricing__savings">
              You save up to <strong>CHF 7,171 / month</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────── AFFILIATE */}
      <section className="sc-affiliate">
        <p className="sc-section-eyebrow">Affiliate program</p>
        <h2 className="sc-h2">Earn while you<br /><em>create.</em></h2>
        <p className="sc-body">
          Share SuperCool with your audience and earn recurring commission on every paying user you refer. No cap. No expiry.
        </p>

        <div className="sc-affiliate__badge-row">
          <span className="sc-dp__tag">Paid monthly</span>
          <span className="sc-dp__tag">Instant approval for creators</span>
          <span className="sc-dp__tag">Dedicated dashboard</span>
        </div>

        <div className="sc-affiliate__commission">
          <span className="sc-affiliate__pct">40%</span>
          <div>
            <strong>Recurring Commission</strong>
            <p>You earn 40% of every payment your referrals make — monthly, for as long as they subscribe. This is recurring income, not one-time.</p>
          </div>
        </div>

        <div className="sc-affiliate__examples">
          <strong>Example earnings</strong>
          {[
            ["10 Creator subscribers ($29/mo)", "$116/mo"],
            ["10 Agency subscribers ($79/mo)", "$316/mo"],
            ["25 mixed subscribers", "$580+/mo"],
            ["100 subscribers", "~$2,320/mo"],
          ].map(([ex, earn]) => (
            <div key={ex} className="sc-affiliate__ex-row">
              <span>{ex}</span>
              <strong>{earn}</strong>
            </div>
          ))}
        </div>

        <ul className="sc-affiliate__perks">
          {[
            "40% recurring on all plans",
            "Paid monthly via PayPal or bank transfer",
            "Real-time affiliate dashboard",
            "Custom referral link + promo assets",
            "No minimum threshold to withdraw",
          ].map(p => <li key={p}>✓ {p}</li>)}
        </ul>

        <Link href="/affiliate" className="sc-btn sc-btn--primary sc-btn--full">
          Join the Affiliate Program →
        </Link>
      </section>

      {/* ─────────────────────────────────────── FINAL CTA */}
      <section className="sc-final-cta">
        <h2 className="sc-h2">Stop creating.<br /><em>Start directing.</em></h2>
        <p className="sc-body">
          3 free briefs. No credit card. No setup.<br />
          Just your idea — and 60 seconds.
        </p>
        <Link href="/generate" className="sc-btn sc-btn--primary sc-btn--xl">
          ⚡ Generate Free Now
        </Link>
        <p className="sc-footnote-sm">Human Realism Engine™ · Motion Psychology™ · Creator OS</p>
      </section>

      {/* ─────────────────────────────────────── STYLES */}
      <style>{`
        /* ── TOKENS ───────────────────────────────────── */
        :root {
          --bg:        #0A0608;
          --bg2:       #110D0F;
          --bg3:       #1A1214;
          --red:       #9E182B;
          --red-light: #C41F35;
          --blush:     #F2AFBC;
          --ivory:     #F5F0E8;
          --muted:     #8A7A7E;
          --border:    rgba(255,255,255,0.08);
          --radius:    12px;
          --radius-lg: 20px;
        }

        /* ── RESET / BASE ─────────────────────────────── */
        .sc-home * { box-sizing: border-box; }
        .sc-home {
          background: var(--bg);
          color: var(--ivory);
          font-family: 'DM Sans', 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* ── TYPOGRAPHY ───────────────────────────────── */
        .sc-h2 {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: clamp(2rem, 7vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--ivory);
          margin: 0 0 1.25rem;
        }
        .sc-h2 em {
          font-style: italic;
          color: var(--blush);
        }
        .sc-section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 1rem;
        }
        .sc-section-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--red);
        }
        .sc-body {
          font-size: clamp(0.95rem, 3vw, 1.1rem);
          color: #B8A8AC;
          line-height: 1.7;
          margin: 0 0 1.5rem;
        }
        .sc-footnote-sm {
          font-size: 0.75rem;
          color: var(--muted);
          text-align: center;
          margin: 0.5rem 0 0;
        }

        /* ── BUTTONS ──────────────────────────────────── */
        .sc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: var(--radius);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          white-space: nowrap;
        }
        .sc-btn--primary {
          background: var(--red);
          color: #fff;
        }
        .sc-btn--primary:hover { background: var(--red-light); }
        .sc-btn--ghost {
          background: transparent;
          color: var(--ivory);
          border: 1px solid var(--border);
        }
        .sc-btn--ghost:hover { border-color: var(--blush); color: var(--blush); }
        .sc-btn--full { width: 100%; }
        .sc-btn--xl {
          padding: 18px 40px;
          font-size: 1rem;
          width: 100%;
          max-width: 360px;
        }

        /* ── SECTION PADDING ──────────────────────────── */
        .sc-hero,
        .sc-storyboard,
        .sc-how,
        .sc-features,
        .sc-intel,
        .sc-proof,
        .sc-pricing,
        .sc-affiliate,
        .sc-final-cta {
          padding: 64px 20px;
          max-width: 100%;
        }

        /* ── HERO ─────────────────────────────────────── */
        .sc-hero { text-align: center; }
        .sc-hero__badge {
          display: inline-block;
          padding: 6px 14px;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .sc-hero__h1 {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-size: clamp(2.5rem, 10vw, 5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--ivory);
          margin: 0 0 1.5rem;
        }
        .sc-hero__h1 em {
          font-style: italic;
          color: var(--blush);
          display: block;
        }
        .sc-hero__sub {
          font-size: clamp(0.95rem, 3vw, 1.1rem);
          color: #B8A8AC;
          max-width: 520px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }
        .sc-hero__ctas {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          margin-bottom: 1rem;
        }
        .sc-hero__ctas .sc-btn { width: 100%; max-width: 320px; }
        .sc-hero__footnote {
          font-size: 0.78rem;
          color: var(--muted);
          margin-bottom: 2.5rem;
        }
        .sc-hero__features {
          list-style: none;
          padding: 0;
          margin: 0 0 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sc-hero__feature-pill {
          display: inline-block;
          padding: 8px 14px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.82rem;
          color: var(--ivory);
          text-align: left;
        }

        /* ── DASHBOARD PREVIEW ────────────────────────── */
        .sc-dashboard-preview {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
          margin-top: 2rem;
        }
        .sc-dp__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .sc-dp__card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px;
        }
        .sc-dp__label {
          display: block;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .sc-dp__badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        .sc-dp__badge--live {
          background: rgba(158,24,43,0.2);
          border: 1px solid var(--red);
          color: var(--blush);
        }
        .sc-dp__stat {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-weight: 700;
          color: var(--blush);
          margin: 6px 0 4px;
          line-height: 1;
        }
        .sc-dp__caption {
          font-size: 0.72rem;
          color: var(--muted);
          line-height: 1.4;
        }
        .sc-dp__caption em { color: var(--blush); }
        .sc-dp__bars { margin-top: 8px; display: flex; flex-direction: column; gap: 4px; }
        .sc-dp__bar-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.62rem;
          color: var(--muted);
        }
        .sc-dp__bar-row span:first-child { min-width: 60px; }
        .sc-dp__bar-row span:last-child { min-width: 20px; text-align: right; }
        .sc-dp__bar-track {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
        }
        .sc-dp__bar-fill {
          height: 100%;
          background: var(--red);
          border-radius: 2px;
        }
        .sc-dp__hook {
          font-size: 0.8rem;
          color: var(--ivory);
          border-left: 2px solid var(--red);
          padding-left: 10px;
          margin: 6px 0;
          line-height: 1.4;
        }
        .sc-dp__prompt-text {
          font-size: 0.78rem;
          color: #B8A8AC;
          line-height: 1.6;
          margin: 6px 0 0;
        }
        .sc-dp__caption-text {
          font-size: 0.78rem;
          color: #B8A8AC;
          line-height: 1.6;
          margin: 6px 0 8px;
        }
        .sc-dp__tags, .sc-feat__tags, .sc-how__tags, .sc-affiliate__badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .sc-dp__tag {
          padding: 3px 10px;
          background: rgba(158,24,43,0.15);
          border: 1px solid rgba(158,24,43,0.35);
          border-radius: 100px;
          font-size: 0.68rem;
          color: var(--blush);
          font-weight: 600;
        }
        .sc-dp__tools { padding: 16px; }
        .sc-dp__tool-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .sc-dp__tool-badge {
          padding: 4px 10px;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 0.7rem;
          color: var(--ivory);
        }

        /* ── MARQUEE ──────────────────────────────────── */
        .sc-marquee {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 14px 0;
          background: var(--bg2);
        }
        .sc-marquee__track {
          display: flex;
          gap: 40px;
          animation: sc-marquee 25s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        .sc-marquee__item {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        @keyframes sc-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── STORYBOARD ───────────────────────────────── */
        .sc-storyboard { padding: 64px 20px; }
        .sc-storyboard__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          margin-bottom: 40px;
          border-radius: var(--radius);
          overflow: hidden;
        }
        .sc-sb__frame {
          position: relative;
          aspect-ratio: 9/16;
          overflow: hidden;
          background: var(--bg2);
        }
        .sc-sb__img { object-fit: cover; }
        .sc-sb__num {
          position: absolute;
          top: 6px;
          left: 8px;
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          z-index: 2;
        }
        .sc-sb__caption {
          position: absolute;
          bottom: 0;
          left: 0; right: 0;
          padding: 8px 6px 6px;
          background: linear-gradient(transparent, rgba(0,0,0,0.85));
          font-size: 0.55rem;
          color: rgba(255,255,255,0.8);
          z-index: 2;
        }

        /* ── BRIEF CARD ───────────────────────────────── */
        .sc-brief-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin: 2rem 0;
        }
        .sc-brief-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
        }
        .sc-brief-card__dot {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--muted);
        }
        .sc-brief-card__badge {
          padding: 4px 10px;
          background: rgba(158,24,43,0.15);
          border: 1px solid var(--red);
          border-radius: 6px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--blush);
        }
        .sc-brief-card__body { padding: 18px; }
        .sc-brief-card__field { margin-bottom: 16px; }
        .sc-brief-card__field-label {
          display: block;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 5px;
        }
        .sc-brief-card__field strong {
          font-size: 1rem;
          color: var(--ivory);
          line-height: 1.4;
        }
        .sc-brief-card__field p {
          font-size: 0.88rem;
          color: #B8A8AC;
          line-height: 1.6;
          margin: 0;
        }
        .sc-brief-card__shots {
          background: var(--bg3);
          border-radius: var(--radius);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sc-brief-card__shots p {
          font-size: 0.83rem;
          color: #B8A8AC;
          line-height: 1.5;
          margin: 0;
        }
        .sc-brief-card__shots strong { color: var(--ivory); }
        .sc-brief-card__hook {
          font-style: italic;
          font-size: 0.95rem;
          color: var(--blush);
          border-left: 2px solid var(--red);
          padding-left: 12px;
          margin: 0;
        }

        /* ── STATS ────────────────────────────────────── */
        .sc-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin: 1.5rem 0;
        }
        .sc-stats__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 14px 8px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }
        .sc-stats__val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1rem, 4vw, 1.6rem);
          font-weight: 700;
          color: var(--red);
          line-height: 1;
        }
        .sc-stats__label {
          font-size: 0.6rem;
          color: var(--muted);
          margin-top: 4px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── HOW IT WORKS ─────────────────────────────── */
        .sc-how__steps {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 2rem;
        }
        .sc-how__step {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px 20px;
          position: relative;
        }
        .sc-how__num {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 700;
          color: rgba(158,24,43,0.2);
          line-height: 1;
          margin-bottom: 8px;
        }
        .sc-how__title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--ivory);
          margin: 0 0 8px;
        }
        .sc-how__desc {
          font-size: 0.88rem;
          color: #B8A8AC;
          line-height: 1.6;
          margin: 0;
        }

        /* ── FEATURES GRID ────────────────────────────── */
        .sc-features__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 2rem;
        }
        .sc-feat__card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .sc-feat__img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: var(--bg3);
        }
        .sc-feat__img { object-fit: cover; }
        .sc-feat__body { padding: 18px; }
        .sc-feat__title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ivory);
          margin: 0 0 8px;
        }
        .sc-feat__desc {
          font-size: 0.85rem;
          color: #B8A8AC;
          line-height: 1.6;
          margin: 0;
        }
        .sc-features__footer {
          text-align: center;
          margin-top: 2rem;
          font-style: italic;
          color: var(--muted);
          font-size: 0.9rem;
        }

        /* ── INTELLIGENCE CARDS ───────────────────────── */
        .sc-intel { padding: 64px 0; }
        .sc-intel__scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 0 20px 16px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .sc-intel__scroll::-webkit-scrollbar { display: none; }
        .sc-intel__card {
          flex: 0 0 260px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px 20px;
          scroll-snap-align: start;
          position: relative;
        }
        .sc-intel__num {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(158,24,43,0.2);
          line-height: 1;
          margin-bottom: 12px;
        }
        .sc-intel__badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--blush);
          margin-bottom: 2px;
        }
        .sc-intel__cat {
          display: block;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 8px;
          font-weight: 700;
        }
        .sc-intel__title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--ivory);
          margin: 0 0 8px;
        }
        .sc-intel__desc {
          font-size: 0.82rem;
          color: #B8A8AC;
          line-height: 1.6;
          margin: 0;
        }

        /* ── SOCIAL PROOF ─────────────────────────────── */
        .sc-proof__quote {
          font-size: clamp(1rem, 3.5vw, 1.15rem);
          color: var(--ivory);
          line-height: 1.7;
          border-left: 3px solid var(--red);
          padding-left: 16px;
          margin: 0 0 1.5rem;
          font-style: normal;
        }
        .sc-proof__profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2rem;
        }
        .sc-proof__avatar-wrap, .sc-proof__card-avatar-wrap {
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .sc-proof__avatar-wrap { width: 56px; height: 56px; }
        .sc-proof__card-avatar-wrap { width: 44px; height: 44px; }
        .sc-proof__avatar { border-radius: 50%; object-fit: cover; }
        .sc-proof__name { font-size: 0.95rem; font-weight: 700; color: var(--ivory); }
        .sc-proof__handle { font-size: 0.78rem; color: var(--muted); margin: 0; }
        .sc-proof__platform {
          display: inline-block;
          padding: 2px 8px;
          background: rgba(158,24,43,0.15);
          border: 1px solid var(--red);
          border-radius: 4px;
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--blush);
          margin-top: 4px;
        }
        .sc-proof__card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .sc-proof__card-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .sc-proof__card-handle { font-size: 0.75rem; color: var(--muted); margin: 0; }
        .sc-proof__card-bio { font-size: 0.75rem; color: #B8A8AC; margin: 2px 0 0; }
        .sc-proof__verified {
          margin-left: auto;
          padding: 3px 8px;
          background: rgba(158,24,43,0.15);
          border: 1px solid var(--red);
          border-radius: 4px;
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--blush);
          white-space: nowrap;
        }
        .sc-proof__videos {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .sc-proof__vid {
          position: relative;
          aspect-ratio: 9/16;
          overflow: hidden;
          background: var(--bg3);
        }
        .sc-proof__vid-img { object-fit: cover; }
        .sc-proof__vid-views {
          position: absolute;
          bottom: 6px;
          left: 6px;
          font-size: 0.65rem;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.7);
          z-index: 2;
        }
        .sc-proof__vid-pin {
          position: absolute;
          top: 6px;
          right: 6px;
          padding: 2px 6px;
          background: rgba(0,0,0,0.6);
          border-radius: 4px;
          font-size: 0.58rem;
          color: #fff;
          z-index: 2;
        }
        .sc-proof__metrics {
          display: flex;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .sc-proof__metric {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 8px;
          border-right: 1px solid var(--border);
        }
        .sc-proof__metric:last-child { border-right: none; }
        .sc-proof__metric-val {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ivory);
          line-height: 1;
        }
        .sc-proof__metric-label {
          font-size: 0.62rem;
          color: var(--muted);
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .sc-proof__stat-row {
          display: flex;
          padding: 16px;
          gap: 12px;
        }
        .sc-proof__big-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .sc-proof__big-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 4vw, 1.6rem);
          font-weight: 700;
          color: var(--red);
          line-height: 1;
        }
        .sc-proof__big-label {
          font-size: 0.62rem;
          color: var(--muted);
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: center;
        }
        .sc-proof__attribution {
          padding: 10px 16px;
          font-size: 0.65rem;
          color: var(--muted);
          text-align: center;
          border-top: 1px solid var(--border);
        }

        /* ── PRICING ──────────────────────────────────── */
        .sc-pricing__sub { max-width: 560px; }
        .sc-pricing__compare {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 2rem;
        }
        .sc-pricing__col {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px 20px;
        }
        .sc-pricing__col--with {
          border-color: var(--red);
          background: var(--bg3);
        }
        .sc-pricing__col-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .sc-pricing__col-title {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 1rem;
        }
        .sc-pricing__col-title--red { color: var(--blush); margin: 0; }
        .sc-pricing__best-badge {
          padding: 3px 10px;
          background: rgba(158,24,43,0.15);
          border: 1px solid var(--red);
          border-radius: 4px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--blush);
        }
        .sc-pricing__rows { display: flex; flex-direction: column; gap: 0; margin-bottom: 1.5rem; }
        .sc-pricing__row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.85rem;
        }
        .sc-pricing__row:last-child { border-bottom: none; }
        .sc-pricing__row--total { padding-top: 14px; }
        .sc-pricing__row-item { color: #B8A8AC; flex: 1; line-height: 1.4; }
        .sc-pricing__row-price {
          font-size: 0.82rem;
          color: var(--muted);
          text-align: right;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .sc-pricing__row-price--strike { text-decoration: line-through; }
        .sc-pricing__row-price--total { font-size: 0.88rem; }
        .sc-pricing__included {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--blush);
          white-space: nowrap;
        }
        .sc-pricing__price-block {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin: 1.5rem 0 1rem;
          line-height: 1;
        }
        .sc-pricing__currency {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 8vw, 3.5rem);
          font-weight: 700;
          color: var(--red);
          line-height: 1;
        }
        .sc-pricing__amount {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 12vw, 5rem);
          font-weight: 700;
          color: var(--red);
          line-height: 1;
        }
        .sc-pricing__period {
          font-size: 0.9rem;
          color: var(--muted);
          align-self: flex-end;
          margin-bottom: 8px;
        }
        .sc-pricing__savings {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.82rem;
          color: var(--muted);
        }
        .sc-pricing__savings strong { color: var(--blush); }

        /* ── AFFILIATE ────────────────────────────────── */
        .sc-affiliate__commission {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          margin: 1.5rem 0;
        }
        .sc-affiliate__pct {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 700;
          color: var(--red);
          line-height: 1;
          flex-shrink: 0;
        }
        .sc-affiliate__commission strong {
          display: block;
          font-size: 1rem;
          color: var(--ivory);
          margin-bottom: 6px;
        }
        .sc-affiliate__commission p {
          font-size: 0.82rem;
          color: #B8A8AC;
          margin: 0;
          line-height: 1.6;
        }
        .sc-affiliate__examples {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px 20px;
          margin: 1rem 0 1.5rem;
        }
        .sc-affiliate__examples strong {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .sc-affiliate__ex-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.82rem;
          color: #B8A8AC;
          gap: 12px;
        }
        .sc-affiliate__ex-row:last-child { border-bottom: none; }
        .sc-affiliate__ex-row strong { color: var(--blush); white-space: nowrap; }
        .sc-affiliate__perks {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sc-affiliate__perks li {
          font-size: 0.85rem;
          color: #B8A8AC;
          display: flex;
          gap: 8px;
        }

        /* ── FINAL CTA ────────────────────────────────── */
        .sc-final-cta {
          text-align: center;
          padding: 80px 20px;
          background: var(--bg2);
          border-top: 1px solid var(--border);
        }
        .sc-final-cta .sc-btn { margin: 0 auto; display: flex; }

        /* ── TABLET 640px+ ────────────────────────────── */
        @media (min-width: 640px) {
          .sc-hero, .sc-storyboard, .sc-how, .sc-features,
          .sc-proof, .sc-pricing, .sc-affiliate, .sc-final-cta {
            padding: 80px 40px;
          }
          .sc-hero__ctas { flex-direction: row; justify-content: center; }
          .sc-hero__ctas .sc-btn { width: auto; }
          .sc-features__grid { grid-template-columns: repeat(2, 1fr); }
          .sc-pricing__compare { flex-direction: row; align-items: flex-start; }
          .sc-pricing__col { flex: 1; }
          .sc-storyboard__grid { grid-template-columns: repeat(4, 1fr); }
          .sc-stats { gap: 12px; }
        }

        /* ── DESKTOP 1024px+ ──────────────────────────── */
        @media (min-width: 1024px) {
          .sc-hero, .sc-storyboard, .sc-how, .sc-features,
          .sc-proof, .sc-pricing, .sc-affiliate, .sc-final-cta {
            padding: 96px 60px;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }
          .sc-storyboard {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: start;
          }
          .sc-storyboard__grid { grid-template-columns: repeat(4, 1fr); margin-bottom: 0; }
          .sc-storyboard__copy { padding-top: 0; }
          .sc-features__grid { grid-template-columns: repeat(3, 1fr); }
          .sc-how__steps { flex-direction: row; }
          .sc-intel__scroll { padding: 0 60px 16px; }
          .sc-intel__card { flex: 0 0 300px; }
          .sc-dp__row { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </main>
  );
}
