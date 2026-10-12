import { useState, useEffect, useCallback } from "react";

interface SacredEntranceProps {
  onEnterComplete?: () => void;
  forceOpen?: boolean;
}

export default function SacredEntrance({ onEnterComplete, forceOpen = false }: SacredEntranceProps) {
  const [phase, setPhase] = useState<"closed" | "opening" | "opened">(
    forceOpen ? "opened" : "closed"
  );

  const handleOpen = useCallback(() => {
    if (phase !== "closed") return;
    setPhase("opening");

    try {
      sessionStorage.setItem("tb_sacred_entered", "true");
    } catch {
      // Ignore storage errors in private browsing
    }

    const timer = setTimeout(() => {
      setPhase("opened");
      onEnterComplete?.();
    }, 1100);

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

  useEffect(() => {
    if (forceOpen) {
      setPhase("opened");
      return;
    }

    // Auto-open after 2.4 seconds so the visitor can admire the sacred sanctum gates
    // and seamlessly transition into the celebration website
    const autoTimer = setTimeout(() => {
      handleOpen();
    }, 2400);

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
      className={`sacred-sanctum-wrapper ${isOpening ? "is-opening" : ""}`}
      onClick={handleOpen}
      role="banner"
      aria-label="Sacred Sanctum Entrance Gates"
    >
      {/* Skip Button */}
      <button
        className="sacred-skip-btn"
        onClick={handleSkip}
        type="button"
        aria-label="Skip entrance animation"
      >
        <span>Skip Intro</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Center Celestial Light Glow Behind Gates */}
      <div className="sacred-light-burst" aria-hidden="true" />

      {/* Top Sacred Toran / Garland Archway */}
      <div className="sacred-toran-banner" aria-hidden="true">
        <div className="toran-garland-beads">
          {Array.from({ length: 19 }).map((_, i) => (
            <div key={i} className="toran-leaf-pendant">
              <svg viewBox="0 0 24 36" className="toran-mango-svg" fill="none">
                <path d="M12 2 C16 8, 22 18, 12 34 C2 18, 8 8, 12 2 Z" fill="#d97706" opacity="0.85" />
                <path d="M12 2 C15 7, 19 16, 12 30 C5 16, 9 7, 12 2 Z" fill="#f59e0b" />
                <circle cx="12" cy="34" r="2.5" fill="#f5c862" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* LEFT TEMPLE DOOR PANEL */}
      <div className={`sacred-door sacred-door-left ${isOpening ? "door-open-left" : ""}`}>
        {/* Door Inset Molding Frame */}
        <div className="door-inner-molding">
          {/* Top Panel */}
          <div className="door-panel-box top-panel">
            <div className="door-corner-filigree top-left" />
            <div className="door-corner-filigree top-right" />
            <div className="panel-center-mandala">
              <svg viewBox="0 0 100 100" className="mandala-svg">
                <circle cx="50" cy="50" r="38" stroke="#d49a22" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                <circle cx="50" cy="50" r="26" stroke="#f5c862" strokeWidth="1" fill="none" />
                <path d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M25 75 L75 25" stroke="#c88a16" strokeWidth="1" opacity="0.6" />
                <circle cx="50" cy="50" r="8" fill="#d49a22" />
              </svg>
            </div>
          </div>

          {/* Middle Panel with Brass Studs */}
          <div className="door-panel-box mid-panel">
            <div className="brass-studs-grid">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="brass-door-stud" />
              ))}
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="door-panel-box bot-panel">
            <div className="door-corner-filigree bot-left" />
            <div className="door-corner-filigree bot-right" />
            <div className="panel-center-mandala">
              <svg viewBox="0 0 100 100" className="mandala-svg">
                <circle cx="50" cy="50" r="32" stroke="#d49a22" strokeWidth="1.5" fill="none" />
                <circle cx="50" cy="50" r="14" stroke="#f5c862" strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="6" fill="#c88a16" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brass Door Handle & Ring (Left Side) */}
        <div className="sacred-door-handle handle-left">
          <div className="handle-rosette">
            <div className="handle-ring" />
          </div>
        </div>

        {/* Vertical Gold Seam Trim */}
        <div className="door-seam-trim seam-left" />
      </div>

      {/* RIGHT TEMPLE DOOR PANEL */}
      <div className={`sacred-door sacred-door-right ${isOpening ? "door-open-right" : ""}`}>
        {/* Door Inset Molding Frame */}
        <div className="door-inner-molding">
          {/* Top Panel */}
          <div className="door-panel-box top-panel">
            <div className="door-corner-filigree top-left" />
            <div className="door-corner-filigree top-right" />
            <div className="panel-center-mandala">
              <svg viewBox="0 0 100 100" className="mandala-svg">
                <circle cx="50" cy="50" r="38" stroke="#d49a22" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                <circle cx="50" cy="50" r="26" stroke="#f5c862" strokeWidth="1" fill="none" />
                <path d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M25 75 L75 25" stroke="#c88a16" strokeWidth="1" opacity="0.6" />
                <circle cx="50" cy="50" r="8" fill="#d49a22" />
              </svg>
            </div>
          </div>

          {/* Middle Panel with Brass Studs */}
          <div className="door-panel-box mid-panel">
            <div className="brass-studs-grid">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="brass-door-stud" />
              ))}
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="door-panel-box bot-panel">
            <div className="door-corner-filigree bot-left" />
            <div className="door-corner-filigree bot-right" />
            <div className="panel-center-mandala">
              <svg viewBox="0 0 100 100" className="mandala-svg">
                <circle cx="50" cy="50" r="32" stroke="#d49a22" strokeWidth="1.5" fill="none" />
                <circle cx="50" cy="50" r="14" stroke="#f5c862" strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="6" fill="#c88a16" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brass Door Handle & Ring (Right Side) */}
        <div className="sacred-door-handle handle-right">
          <div className="handle-rosette">
            <div className="handle-ring" />
          </div>
        </div>

        {/* Vertical Gold Seam Trim */}
        <div className="door-seam-trim seam-right" />
      </div>

      {/* CENTER GOLDEN MEDALLION & SANCTUM SEAL */}
      <div className={`sacred-center-seal ${isOpening ? "seal-dissolve" : ""}`}>
        {/* Divine Aura Halo */}
        <div className="seal-aura-ring" />

        {/* Lotus Medallion Disc */}
        <div className="seal-lotus-disc">
          {/* Animated Golden Sunburst Spokes */}
          <div className="seal-chakra-rays" />

          {/* Lord Balaji Sacred Namam & Symbols */}
          <div className="seal-sacred-symbols">
            <svg viewBox="0 0 140 100" className="sacred-namam-svg" fill="none">
              {/* Left Shankha (Conch) Motif */}
              <g transform="translate(14, 28) scale(0.7)">
                <path d="M16 4 C24 4, 30 10, 30 20 C30 32, 18 42, 6 42 C2 42, 0 38, 0 34 C0 26, 8 18, 16 4 Z" fill="url(#goldGradient)" />
                <path d="M14 10 C18 14, 22 22, 20 28" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              </g>

              {/* Central Thirunamam (Lord Venkateswara's Holy Tilak) */}
              <g transform="translate(48, 10)">
                {/* Left White Wing (Urdhva Pundra) */}
                <path d="M4 12 C4 35, 14 55, 22 65 C18 55, 14 35, 14 12 Z" fill="#ffffff" filter="drop-shadow(0 0 6px rgba(255,255,255,0.7))" />
                {/* Right White Wing */}
                <path d="M40 12 C40 35, 30 55, 22 65 C26 55, 30 35, 30 12 Z" fill="#ffffff" filter="drop-shadow(0 0 6px rgba(255,255,255,0.7))" />
                {/* Central Holy Vermilion Sindoor Line (Srichoornam) */}
                <path d="M22 6 C22 25, 21 45, 22 68" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" filter="drop-shadow(0 0 5px rgba(220,38,38,0.9))" />
                {/* Auspicious Yellow Turmeric Base */}
                <circle cx="22" cy="72" r="3" fill="#f59e0b" />
              </g>

              {/* Right Sudarshana Chakra Motif */}
              <g transform="translate(94, 28) scale(0.7)">
                <circle cx="20" cy="24" r="16" fill="url(#goldGradient)" />
                <circle cx="20" cy="24" r="9" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.7" />
                <path d="M20 4 L20 44 M0 24 L40 24 M6 10 L34 38 M6 38 L34 10" stroke="#b45309" strokeWidth="1.5" />
              </g>

              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Sacred Invocations & Grand Branding */}
          <div className="seal-text-content">
            <span className="seal-vedic-mantra">|| OM NAMO VENKATESHAYA ||</span>
            <h1 className="seal-temple-heading">Tirumala Balaji</h1>
            <span className="seal-events-tag">MARRIAGES &amp; EVENTS</span>
            <div className="seal-divider-line">
              <span className="divider-diamond">◆</span>
            </div>
            <p className="seal-invitation-subtext">
              Entering the Sacred Sanctum of Divine Marriage Blessings
            </p>
          </div>

          {/* Enter Button & Touch Prompt */}
          <div className="seal-action-box">
            <button
              className="seal-enter-button"
              onClick={handleOpen}
              type="button"
            >
              <span>Enter Sacred Ceremony</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <span className="seal-touch-hint">Tap anywhere to enter immediately</span>
          </div>
        </div>
      </div>
    </div>
  );
}
