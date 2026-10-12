import { useState, useEffect, useCallback, useRef } from "react";

interface SacredEntranceProps {
  onEnterComplete?: () => void;
  forceOpen?: boolean;
}

// Auspicious South Indian cast-bronze temple bell chime (Ghanta) synthesized via native Web Audio API
function playSacredTempleBell() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const fundamental = 587.33; // D5 pitch - auspicious resonant temple frequency
    const harmonics = [1, 2.01, 3.02, 4.22, 5.4];
    const gains = [0.38, 0.22, 0.14, 0.07, 0.035];
    const decays = [2.6, 2.0, 1.6, 1.1, 0.7];

    harmonics.forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(fundamental * ratio, now);

      gain.gain.setValueAtTime(gains[i], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decays[i]);
    });
  } catch {
    // Non-blocking fallback for autoplay policies
  }
}

export default function SacredEntrance({
  onEnterComplete,
  forceOpen = false,
}: SacredEntranceProps) {
  const [phase, setPhase] = useState<"closed" | "opening" | "opened">(
    forceOpen ? "opened" : "closed"
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleOpen = useCallback(() => {
    if (phase !== "closed") return;
    setPhase("opening");
    playSacredTempleBell();

    try {
      sessionStorage.setItem("tb_sacred_entered", "true");
    } catch {
      // Ignore in strict private mode
    }

    const timer = setTimeout(() => {
      setPhase("opened");
      onEnterComplete?.();
    }, 1350);

    return () => clearTimeout(timer);
  }, [phase, onEnterComplete]);

  const handleSkip = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setPhase("opened");
      try {
        sessionStorage.setItem("tb_sacred_entered", "true");
      } catch {
        // Ignore
      }
      onEnterComplete?.();
    },
    [onEnterComplete]
  );

  // 60FPS Golden Dust Motes & Diya Sparks Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || phase === "opened") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 42;
    const motes = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 2.2,
      vy: -(0.35 + Math.random() * 0.75),
      vx: (Math.random() - 0.5) * 0.5,
      alpha: 0.25 + Math.random() * 0.55,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      const speedMultiplier = phase === "opening" ? 2.5 : 1.0;

      for (const m of motes) {
        m.y += m.vy * speedMultiplier;
        m.x += Math.sin(elapsed + m.pulsePhase) * 0.5 + m.vx;
        m.pulsePhase += m.pulseSpeed;

        if (m.y < -15) m.y = height + 15;
        if (m.x < -15) m.x = width + 15;
        if (m.x > width + 15) m.x = -15;

        const currentAlpha = Math.max(
          0.1,
          Math.min(0.9, m.alpha + Math.sin(m.pulsePhase) * 0.25)
        );

        const grad = ctx.createRadialGradient(
          m.x,
          m.y,
          0,
          m.x,
          m.y,
          m.radius * 3.5
        );
        grad.addColorStop(0, `rgba(255, 255, 235, ${currentAlpha})`);
        grad.addColorStop(0.35, `rgba(245, 200, 98, ${currentAlpha * 0.85})`);
        grad.addColorStop(1, "rgba(217, 119, 6, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [phase]);

  // Keyboard navigation & auto-open timer
  useEffect(() => {
    if (forceOpen) {
      setPhase("opened");
      return;
    }

    const autoTimer = setTimeout(() => {
      handleOpen();
    }, 2500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        if (e.key === "Escape") {
          setPhase("opened");
          onEnterComplete?.();
        } else {
          handleOpen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(autoTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleOpen, forceOpen, onEnterComplete]);

  if (phase === "opened") {
    return null;
  }

  const isOpening = phase === "opening";

  return (
    <div
      className={`bangaru-vakili-viewport ${isOpening ? "is-opening" : ""}`}
      onClick={handleOpen}
      role="banner"
      aria-label="Tirumala Bangaru Vakili - Sacred Golden Entrance"
    >
      {/* Accessible Glassmorphic Skip Pill */}
      <button
        className="vakili-skip-pill"
        onClick={handleSkip}
        type="button"
        aria-label="Skip entrance animation"
      >
        <span>Skip Intro</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* BACKGROUND SANCTUM LAYER (Garbha Griha Radiance & God Rays) */}
      <div className="garbha-griha-ambient-glow" aria-hidden="true" />
      <div className="vakili-god-rays" aria-hidden="true" />
      <canvas ref={canvasRef} className="sanctum-dust-canvas" aria-hidden="true" />

      {/* ARCHITECTURAL FRAMEWORK (Maha Torana & Dravidian Pilasters) */}
      {/* Top Ornate Torana with Brass Bells & Mango Leaves */}
      <div className="vakili-maha-torana" aria-hidden="true">
        <div className="torana-pediment-crest">
          <div className="crest-kalash-icon" />
        </div>
        <div className="torana-garland-strip">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="torana-pendant-cluster">
              {/* Auspicious Mango Leaf */}
              <svg viewBox="0 0 24 38" className="torana-leaf-svg" fill="none">
                <path
                  d="M12 2 C17 9, 22 19, 12 36 C2 19, 7 9, 12 2 Z"
                  fill="url(#leafGold)"
                />
                <path
                  d="M12 4 L12 34"
                  stroke="#fbbf24"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
              {/* Sacred Temple Ghanta (Brass Bell) on every other pendant */}
              {i % 2 === 1 && (
                <div className="torana-ghanta-bell">
                  <div className="ghanta-body" />
                  <div className="ghanta-clapper" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Flanking Dravidian Pilasters */}
      <div className="vakili-pilaster pilaster-left" aria-hidden="true" />
      <div className="vakili-pilaster pilaster-right" aria-hidden="true" />

      {/* Sacred Gadapa (Threshold Base) */}
      <div className="vakili-gadapa-threshold" aria-hidden="true">
        <div className="gadapa-brass-plate" />
        <div className="gadapa-pasupu-kumkuma">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="gadapa-bindu-pair">
              <span className="bindu-pasupu" />
              <span className="bindu-kumkum" />
            </div>
          ))}
        </div>
      </div>

      {/* 3D SPATIAL STAGE: INWARD-SWINGING DOUBLE DOORS */}
      <div className="bangaru-doors-stage">
        {/* LEFT DOOR LEAF (Hinged at left 0% 50%, swings inward +78deg) */}
        <div className={`door-leaf door-leaf-left ${isOpening ? "swing-inward-left" : ""}`}>
          <div className="door-face-front">
            {/* Architectural Beveled Frame */}
            <div className="door-arch-frame">
              {/* TOP PANEL: Gajalakshmi & Ashta-Dala Lotus Relief */}
              <div className="vakili-panel-plate panel-top">
                <div className="panel-beveled-molding">
                  <svg viewBox="0 0 100 100" className="lotus-relief-svg" fill="none">
                    <circle cx="50" cy="50" r="42" stroke="url(#goldRelief)" strokeWidth="2" strokeDasharray="5 3" />
                    <circle cx="50" cy="50" r="34" stroke="url(#goldRelief)" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="24" fill="rgba(69, 26, 3, 0.45)" stroke="url(#goldRelief)" strokeWidth="1.5" />
                    {/* 8 Lotus Petals */}
                    <path
                      d="M50 18 C54 26, 54 32, 50 36 C46 32, 46 26, 50 18 Z
                         M50 82 C54 74, 54 68, 50 64 C46 68, 46 74, 50 82 Z
                         M18 50 C26 54, 32 54, 36 50 C32 46, 26 46, 18 50 Z
                         M82 50 C74 54, 68 54, 64 50 C68 46, 74 46, 82 50 Z
                         M27 27 C34 33, 38 36, 40 32 C36 30, 33 27, 27 27 Z
                         M73 73 C66 67, 62 64, 60 68 C64 70, 67 73, 73 73 Z
                         M73 27 C67 34, 64 38, 68 40 C70 36, 73 33, 73 27 Z
                         M27 73 C33 66, 36 62, 32 60 C30 64, 27 67, 27 73 Z"
                      fill="url(#goldRelief)"
                    />
                    <circle cx="50" cy="50" r="8" fill="url(#goldRelief)" />
                    <circle cx="50" cy="50" r="3.5" fill="#fff9e6" />
                  </svg>
                </div>
              </div>

              {/* MID PANEL: Conical Brass Bosses (Koppulu) & Vaishnavite Shankha */}
              <div className="vakili-panel-plate panel-mid">
                <div className="panel-beveled-molding">
                  <div className="koppulu-bosses-grid">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="koppam-brass-stud">
                        <div className="stud-starburst-washer" />
                      </div>
                    ))}
                  </div>
                  {/* Subtle Panchajanya Conch Emboss */}
                  <div className="panel-sacred-watermark">
                    <svg viewBox="0 0 50 70" className="watermark-svg" fill="none">
                      <path
                        d="M25 8 C38 8, 46 18, 46 32 C46 48, 28 62, 10 62 C4 62, 0 57, 0 52 C0 38, 12 28, 25 8 Z"
                        fill="url(#goldRelief)"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* BOT PANEL: Purna Kalasham & Temple Arch Motifs */}
              <div className="vakili-panel-plate panel-bot">
                <div className="panel-beveled-molding">
                  <svg viewBox="0 0 100 80" className="kalash-motif-svg" fill="none">
                    <path
                      d="M50 14 C56 14, 62 20, 62 26 C62 30, 58 34, 50 34 C42 34, 38 30, 38 26 C38 20, 44 14, 50 14 Z"
                      fill="url(#goldRelief)"
                    />
                    <path
                      d="M32 38 C32 32, 68 32, 68 38 L64 62 C64 68, 36 68, 36 62 Z"
                      fill="url(#goldRelief)"
                    />
                    <circle cx="50" cy="50" r="5" fill="#fff9e6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Simhamukha (Lion Mask) Cast Brass Door Knocker */}
            <div className="simhamukha-knocker-wrap knocker-left">
              <div className="simhamukha-mask" />
              <div className="simhamukha-brass-ring" />
            </div>

            {/* Raised Astragal Center Seam & 3D Door Thickness Edge */}
            <div className="door-astragal-trim trim-right" />
            <div className="door-thickness-edge edge-right" />
            {/* Dynamic Inward Shadow Falloff */}
            <div className="door-dynamic-shadow" />
          </div>
        </div>

        {/* RIGHT DOOR LEAF (Hinged at right 100% 50%, swings inward -78deg) */}
        <div className={`door-leaf door-leaf-right ${isOpening ? "swing-inward-right" : ""}`}>
          <div className="door-face-front">
            {/* Architectural Beveled Frame */}
            <div className="door-arch-frame">
              {/* TOP PANEL: Gajalakshmi & Ashta-Dala Lotus Relief */}
              <div className="vakili-panel-plate panel-top">
                <div className="panel-beveled-molding">
                  <svg viewBox="0 0 100 100" className="lotus-relief-svg" fill="none">
                    <circle cx="50" cy="50" r="42" stroke="url(#goldRelief)" strokeWidth="2" strokeDasharray="5 3" />
                    <circle cx="50" cy="50" r="34" stroke="url(#goldRelief)" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="24" fill="rgba(69, 26, 3, 0.45)" stroke="url(#goldRelief)" strokeWidth="1.5" />
                    {/* 8 Lotus Petals */}
                    <path
                      d="M50 18 C54 26, 54 32, 50 36 C46 32, 46 26, 50 18 Z
                         M50 82 C54 74, 54 68, 50 64 C46 68, 46 74, 50 82 Z
                         M18 50 C26 54, 32 54, 36 50 C32 46, 26 46, 18 50 Z
                         M82 50 C74 54, 68 54, 64 50 C68 46, 74 46, 82 50 Z
                         M27 27 C34 33, 38 36, 40 32 C36 30, 33 27, 27 27 Z
                         M73 73 C66 67, 62 64, 60 68 C64 70, 67 73, 73 73 Z
                         M73 27 C67 34, 64 38, 68 40 C70 36, 73 33, 73 27 Z
                         M27 73 C33 66, 36 62, 32 60 C30 64, 27 67, 27 73 Z"
                      fill="url(#goldRelief)"
                    />
                    <circle cx="50" cy="50" r="8" fill="url(#goldRelief)" />
                    <circle cx="50" cy="50" r="3.5" fill="#fff9e6" />
                  </svg>
                </div>
              </div>

              {/* MID PANEL: Conical Brass Bosses (Koppulu) & Sudarshana Chakra */}
              <div className="vakili-panel-plate panel-mid">
                <div className="panel-beveled-molding">
                  <div className="koppulu-bosses-grid">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="koppam-brass-stud">
                        <div className="stud-starburst-washer" />
                      </div>
                    ))}
                  </div>
                  {/* Subtle Sudarshana Chakra Emboss */}
                  <div className="panel-sacred-watermark">
                    <svg viewBox="0 0 60 60" className="watermark-svg" fill="none">
                      <circle cx="30" cy="30" r="22" stroke="url(#goldRelief)" strokeWidth="3" opacity="0.8" />
                      <circle cx="30" cy="30" r="14" stroke="#fbbf24" strokeWidth="1.5" fill="none" opacity="0.7" />
                      <path d="M30 4 L30 56 M4 30 L56 30 M11 11 L49 49 M11 49 L49 11" stroke="url(#goldRelief)" strokeWidth="2" opacity="0.75" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* BOT PANEL: Purna Kalasham & Temple Arch Motifs */}
              <div className="vakili-panel-plate panel-bot">
                <div className="panel-beveled-molding">
                  <svg viewBox="0 0 100 80" className="kalash-motif-svg" fill="none">
                    <path
                      d="M50 14 C56 14, 62 20, 62 26 C62 30, 58 34, 50 34 C42 34, 38 30, 38 26 C38 20, 44 14, 50 14 Z"
                      fill="url(#goldRelief)"
                    />
                    <path
                      d="M32 38 C32 32, 68 32, 68 38 L64 62 C64 68, 36 68, 36 62 Z"
                      fill="url(#goldRelief)"
                    />
                    <circle cx="50" cy="50" r="5" fill="#fff9e6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Simhamukha (Lion Mask) Cast Brass Door Knocker */}
            <div className="simhamukha-knocker-wrap knocker-right">
              <div className="simhamukha-mask" />
              <div className="simhamukha-brass-ring" />
            </div>

            {/* Raised Astragal Center Seam & 3D Door Thickness Edge */}
            <div className="door-astragal-trim trim-left" />
            <div className="door-thickness-edge edge-left" />
            {/* Dynamic Inward Shadow Falloff */}
            <div className="door-dynamic-shadow" />
          </div>
        </div>
      </div>

      {/* FOREGROUND BANGARU MUDRA (SACRED GOLDEN SANCTUM SEAL) */}
      <div className={`vakili-center-mudra ${isOpening ? "mudra-unlatch-bloom" : ""}`}>
        {/* Pulsing Divine Radiance Halo */}
        <div className="mudra-aura-halo" />

        {/* 24K Chased Gold Medallion Disc */}
        <div className="mudra-lotus-disc">
          {/* Rotating Solar Chakra Micro-Rays */}
          <div className="mudra-chakra-spokes" />

          {/* Authentic Lord Balaji Thirunamam, Shankha & Chakra */}
          <div className="mudra-sacred-emblem">
            <svg viewBox="0 0 180 110" className="sacred-emblem-svg" fill="none">
              {/* Left Panchajanya Conch */}
              <g transform="translate(14, 32) scale(0.75)">
                <path
                  d="M18 4 C28 4, 36 12, 36 24 C36 38, 22 50, 6 50 C2 50, 0 45, 0 40 C0 30, 10 20, 18 4 Z"
                  fill="url(#goldRelief)"
                />
                <path
                  d="M16 10 C22 16, 26 26, 24 32"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </g>

              {/* Central Srivari Thirunamam (Holy Tilak) */}
              <g transform="translate(62, 10)">
                {/* Left White Wing (Urdhva Pundra) */}
                <path
                  d="M4 14 C4 42, 16 66, 26 78 C20 66, 15 42, 15 14 Z"
                  fill="url(#pearlWhite)"
                  filter="drop-shadow(0 0 6px rgba(255,255,255,0.85))"
                />
                {/* Right White Wing */}
                <path
                  d="M48 14 C48 42, 36 66, 26 78 C32 66, 37 42, 37 14 Z"
                  fill="url(#pearlWhite)"
                  filter="drop-shadow(0 0 6px rgba(255,255,255,0.85))"
                />
                {/* Lotus Paduka Base */}
                <path
                  d="M18 78 C26 74, 26 74, 34 78 C32 84, 20 84, 18 78 Z"
                  fill="url(#goldRelief)"
                />
                {/* Center Srichoornam Holy Vermilion Line */}
                <path
                  d="M26 6 C26 30, 25 56, 26 82"
                  stroke="url(#srichoornamRed)"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 6px rgba(220,38,38,0.95))"
                />
                <circle cx="26" cy="87" r="3.5" fill="#f59e0b" />
              </g>

              {/* Right Sudarshana Chakra */}
              <g transform="translate(120, 32) scale(0.75)">
                <circle cx="24" cy="27" r="19" fill="url(#goldRelief)" />
                <circle
                  cx="24"
                  cy="27"
                  r="11"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  fill="none"
                  opacity="0.85"
                />
                <path
                  d="M24 4 L24 50 M1 27 L47 27 M8 11 L40 43 M8 43 L40 11"
                  stroke="#78350f"
                  strokeWidth="1.8"
                />
                <circle cx="24" cy="27" r="4.5" fill="#fef08a" />
              </g>

              <defs>
                <linearGradient id="goldRelief" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff9e6" />
                  <stop offset="25%" stopColor="#fde68a" />
                  <stop offset="55%" stopColor="#d97706" />
                  <stop offset="85%" stopColor="#92400e" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>
                <linearGradient id="pearlWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#fdfbf7" />
                  <stop offset="100%" stopColor="#e5e7eb" />
                </linearGradient>
                <linearGradient id="srichoornamRed" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="45%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
                <linearGradient id="leafGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Vedic Invocation & Royal Typographic Crest */}
          <div className="mudra-crest-typography">
            <span className="mudra-vedic-mantra">|| OM NAMO VENKATESHAYA ||</span>
            <h1 className="mudra-royal-title">Tirumala Balaji</h1>
            <span className="mudra-sub-brand">MARRIAGES &amp; EVENTS</span>

            <div className="mudra-ornate-divider">
              <span className="divider-line" />
              <span className="divider-lotus-pip">✦</span>
              <span className="divider-line" />
            </div>

            <p className="mudra-sacred-caption">
              Entering the Sacred Bangaru Vakili of Divine Matrimony
            </p>
          </div>

          {/* Interactive Enter Action */}
          <div className="mudra-action-area">
            <button
              className="mudra-enter-button"
              onClick={handleOpen}
              type="button"
            >
              <span>Enter Sacred Ceremony</span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <span className="mudra-tap-hint">Tap anywhere to enter immediately</span>
          </div>
        </div>
      </div>
    </div>
  );
}
