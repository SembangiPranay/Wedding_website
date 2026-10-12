import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

interface SacredEntranceProps {
  onEnterComplete?: () => void;
  forceOpen?: boolean;
}

// Auspicious South Indian cast-bronze temple bell chime (Ghanta) synthesized via Web Audio API
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
    const gains = [0.42, 0.24, 0.16, 0.08, 0.04];
    const decays = [2.8, 2.2, 1.7, 1.2, 0.8];

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
    // Non-blocking fallback
  }
}

// Procedural 1024x2048 4K gold relief texture for the temple door leaves
function createDoorTexture(isLeft: boolean): { texture: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d")!;

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = 1024;
  bumpCanvas.height = 2048;
  const bumpCtx = bumpCanvas.getContext("2d")!;

  // 1. Base Rich Temple Teak & 24K Gold Sheen
  const baseGrad = ctx.createLinearGradient(0, 0, 1024, 2048);
  baseGrad.addColorStop(0, "#4a1218");
  baseGrad.addColorStop(0.3, "#2d080e");
  baseGrad.addColorStop(0.7, "#1c0408");
  baseGrad.addColorStop(1, "#120205");
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 2048);

  bumpCtx.fillStyle = "#222222";
  bumpCtx.fillRect(0, 0, 1024, 2048);

  // 2. Stepped Beveled Outer Golden Frame
  const drawBeveledBorder = (x: number, y: number, w: number, h: number, borderW: number) => {
    // Diffuse Canvas
    const frameGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    frameGrad.addColorStop(0, "#fff4cc");
    frameGrad.addColorStop(0.25, "#d49a22");
    frameGrad.addColorStop(0.65, "#f59e0b");
    frameGrad.addColorStop(1, "#78350f");

    ctx.strokeStyle = frameGrad;
    ctx.lineWidth = borderW;
    ctx.strokeRect(x, y, w, h);

    // Bump Map Canvas (White = raised relief, Black = recessed)
    bumpCtx.strokeStyle = "#ffffff";
    bumpCtx.lineWidth = borderW;
    bumpCtx.strokeRect(x, y, w, h);
  };

  drawBeveledBorder(30, 30, 964, 1988, 16);
  drawBeveledBorder(60, 60, 904, 1928, 8);

  // 3. Three Architectural Panels (Top, Mid, Bottom)
  const panels = [
    { y: 90, h: 560 },
    { y: 680, h: 680 },
    { y: 1390, h: 560 },
  ];

  panels.forEach((p) => {
    // Outer panel box
    ctx.fillStyle = "rgba(40, 8, 12, 0.75)";
    ctx.fillRect(90, p.y, 844, p.h);

    drawBeveledBorder(90, p.y, 844, p.h, 12);
    drawBeveledBorder(115, p.y + 25, 794, p.h - 50, 4);

    bumpCtx.fillStyle = "#444444";
    bumpCtx.fillRect(90, p.y, 844, p.h);
  });

  // 4. Sacred Vaishnavite Relievo Work
  const drawEmblem = () => {
    const goldFill = "#ffd54f";

    // Top Panel: Ashta-Dala Lotus Chakra (Center 512, y: 370)
    ctx.save();
    ctx.translate(512, 370);
    bumpCtx.save();
    bumpCtx.translate(512, 370);

    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      ctx.rotate(Math.PI / 4);
      bumpCtx.rotate(Math.PI / 4);

      ctx.fillStyle = goldFill;
      ctx.beginPath();
      ctx.ellipse(0, 110, 35, 75, 0, 0, Math.PI * 2);
      ctx.fill();

      bumpCtx.fillStyle = "#dddddd";
      bumpCtx.beginPath();
      bumpCtx.ellipse(0, 110, 35, 75, 0, 0, Math.PI * 2);
      bumpCtx.fill();
    }

    ctx.fillStyle = "#fff8e1";
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI * 2);
    ctx.fill();

    bumpCtx.fillStyle = "#ffffff";
    bumpCtx.beginPath();
    bumpCtx.arc(0, 0, 65, 0, Math.PI * 2);
    bumpCtx.fill();

    ctx.restore();
    bumpCtx.restore();

    // Mid Panel: Left Door has Holy Shankha, Right Door has Sudarshana Chakra
    ctx.save();
    ctx.translate(512, 1020);
    bumpCtx.save();
    bumpCtx.translate(512, 1020);

    if (isLeft) {
      // Conch (Panchajanya Shankha)
      ctx.fillStyle = goldFill;
      ctx.beginPath();
      ctx.arc(0, 0, 160, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#2d080e";
      ctx.beginPath();
      ctx.arc(0, 0, 140, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(0, 0, 70, 110, 0.2, 0, Math.PI * 2);
      ctx.fill();

      bumpCtx.fillStyle = "#ffffff";
      bumpCtx.beginPath();
      bumpCtx.arc(0, 0, 160, 0, Math.PI * 2);
      bumpCtx.fill();
    } else {
      // Holy Discus (Sudarshana Chakra)
      ctx.fillStyle = goldFill;
      ctx.beginPath();
      ctx.arc(0, 0, 160, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#2d080e";
      ctx.beginPath();
      ctx.arc(0, 0, 130, 0, Math.PI * 2);
      ctx.fill();

      for (let s = 0; s < 8; s++) {
        ctx.strokeStyle = "#ffe082";
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((s * Math.PI) / 4) * 145, Math.sin((s * Math.PI) / 4) * 145);
        ctx.stroke();
      }

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.fill();

      bumpCtx.fillStyle = "#ffffff";
      bumpCtx.beginPath();
      bumpCtx.arc(0, 0, 160, 0, Math.PI * 2);
      bumpCtx.fill();
    }

    ctx.restore();
    bumpCtx.restore();

    // Bottom Panel: Sacred Purna Kalasham Motif (y: 1670)
    ctx.save();
    ctx.translate(512, 1670);
    bumpCtx.save();
    bumpCtx.translate(512, 1670);

    ctx.fillStyle = goldFill;
    // Pot base
    ctx.beginPath();
    ctx.arc(0, 30, 110, 0, Math.PI);
    ctx.fill();
    // Coconut crest
    ctx.beginPath();
    ctx.arc(0, -60, 50, 0, Math.PI * 2);
    ctx.fill();

    bumpCtx.fillStyle = "#cccccc";
    bumpCtx.beginPath();
    bumpCtx.arc(0, 30, 110, 0, Math.PI);
    bumpCtx.fill();
    bumpCtx.beginPath();
    bumpCtx.arc(0, -60, 50, 0, Math.PI * 2);
    bumpCtx.fill();

    ctx.restore();
    bumpCtx.restore();
  };

  drawEmblem();

  const texture = new THREE.CanvasTexture(canvas);
  const bump = new THREE.CanvasTexture(bumpCanvas);

  return { texture, bump };
}

export default function SacredEntrance({
  onEnterComplete,
  forceOpen = false,
}: SacredEntranceProps) {
  const [phase, setPhase] = useState<"closed" | "opening" | "opened">(
    forceOpen ? "opened" : "closed"
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const handleOpen = useCallback(() => {
    if (phaseRef.current !== "closed") return;
    setPhase("opening");
    playSacredTempleBell();

    try {
      sessionStorage.setItem("tb_sacred_entered", "true");
    } catch {
      // Ignore
    }

    const timer = setTimeout(() => {
      setPhase("opened");
      onEnterComplete?.();
    }, 2100);

    return () => clearTimeout(timer);
  }, [onEnterComplete]);

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

  // Mount Three.js 3D WebGL Gateway Scene
  useEffect(() => {
    if (forceOpen || phase === "opened" || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Camera & Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0204);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.3);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff1cf, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffecd1, 2.5);
    dirLight.position.set(0, 4, 5);
    scene.add(dirLight);

    // Flanking Temple Diya Lights (Warm amber points)
    const leftDiya = new THREE.PointLight(0xff9900, 2.2, 5.5);
    leftDiya.position.set(-2.2, 0, 1.2);
    scene.add(leftDiya);

    const rightDiya = new THREE.PointLight(0xff9900, 2.2, 5.5);
    rightDiya.position.set(2.2, 0, 1.2);
    scene.add(rightDiya);

    // Intense Inner Sanctum Back-Light (God rays origin)
    const sanctumLight = new THREE.PointLight(0xffd54f, 3.5, 9);
    sanctumLight.position.set(0, 0, -1.8);
    scene.add(sanctumLight);

    // 4. Double Temple Doors (3D Geometry & PBR Gold Relief Material)
    const doorGeo = new THREE.BoxGeometry(1.68, 4.9, 0.14);

    const leftTex = createDoorTexture(true);
    const rightTex = createDoorTexture(false);

    const leftMat = new THREE.MeshStandardMaterial({
      map: leftTex.texture,
      bumpMap: leftTex.bump,
      bumpScale: 0.045,
      color: 0xffd54f,
      metalness: 0.92,
      roughness: 0.22,
    });

    const rightMat = new THREE.MeshStandardMaterial({
      map: rightTex.texture,
      bumpMap: rightTex.bump,
      bumpScale: 0.045,
      color: 0xffd54f,
      metalness: 0.92,
      roughness: 0.22,
    });

    // Left Door Pivot (Hinged at x = -1.68)
    const leftPivot = new THREE.Group();
    leftPivot.position.set(-1.68, 0, 0);
    scene.add(leftPivot);

    const leftDoorMesh = new THREE.Mesh(doorGeo, leftMat);
    leftDoorMesh.position.set(0.84, 0, 0);
    leftPivot.add(leftDoorMesh);

    // Right Door Pivot (Hinged at x = +1.68)
    const rightPivot = new THREE.Group();
    rightPivot.position.set(1.68, 0, 0);
    scene.add(rightPivot);

    const rightDoorMesh = new THREE.Mesh(doorGeo, rightMat);
    rightDoorMesh.position.set(-0.84, 0, 0);
    rightPivot.add(rightDoorMesh);

    // 5. Physical 3D Conical Brass Studs (Koppulu)
    const studGeo = new THREE.ConeGeometry(0.045, 0.08, 16);
    studGeo.rotateX(Math.PI / 2); // Point outward towards camera
    const studMat = new THREE.MeshStandardMaterial({
      color: 0xffea79,
      metalness: 0.96,
      roughness: 0.12,
    });

    // Add 16 3D studs per door leaf
    const studPositions = [
      { x: 0.35, y: 1.6 },
      { x: 0.35, y: 1.2 },
      { x: 0.35, y: 0.8 },
      { x: 0.35, y: 0.4 },
      { x: 0.35, y: 0.0 },
      { x: 0.35, y: -0.4 },
      { x: 0.35, y: -0.8 },
      { x: 0.35, y: -1.2 },
      { x: 1.35, y: 1.6 },
      { x: 1.35, y: 1.2 },
      { x: 1.35, y: 0.8 },
      { x: 1.35, y: 0.4 },
      { x: 1.35, y: 0.0 },
      { x: 1.35, y: -0.4 },
      { x: 1.35, y: -0.8 },
      { x: 1.35, y: -1.2 },
    ];

    studPositions.forEach((pos) => {
      const leftStud = new THREE.Mesh(studGeo, studMat);
      leftStud.position.set(pos.x, pos.y, 0.08);
      leftPivot.add(leftStud);

      const rightStud = new THREE.Mesh(studGeo, studMat);
      rightStud.position.set(-pos.x, pos.y, 0.08);
      rightPivot.add(rightStud);
    });

    // 6. Flanking Dravidian Architectural Pilasters
    const pillarGeo = new THREE.BoxGeometry(0.42, 5.4, 0.45);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x996515,
      metalness: 0.85,
      roughness: 0.32,
    });

    const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
    leftPillar.position.set(-2.0, 0, 0.05);
    scene.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, pillarMat);
    rightPillar.position.set(2.0, 0, 0.05);
    scene.add(rightPillar);

    // Top Beam Architrave
    const archGeo = new THREE.BoxGeometry(4.4, 0.4, 0.45);
    const archMesh = new THREE.Mesh(archGeo, pillarMat);
    archMesh.position.set(0, 2.55, 0.05);
    scene.add(archMesh);

    // 7. Inner Sanctum Halo & Volumetric God Rays Disc
    const raysCanvas = document.createElement("canvas");
    raysCanvas.width = 512;
    raysCanvas.height = 512;
    const rCtx = raysCanvas.getContext("2d")!;
    const rGrad = rCtx.createRadialGradient(256, 256, 10, 256, 256, 256);
    rGrad.addColorStop(0, "rgba(255, 255, 230, 1.0)");
    rGrad.addColorStop(0.2, "rgba(255, 215, 0, 0.85)");
    rGrad.addColorStop(0.5, "rgba(255, 140, 0, 0.35)");
    rGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    rCtx.fillStyle = rGrad;
    rCtx.fillRect(0, 0, 512, 512);

    const raysTex = new THREE.CanvasTexture(raysCanvas);
    const raysMat = new THREE.MeshBasicMaterial({
      map: raysTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
      depthWrite: false,
    });

    const raysMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 5.2), raysMat);
    raysMesh.position.set(0, 0, -1.7);
    scene.add(raysMesh);

    // 8. 3D Swirling Golden Stardust Particles
    const particleCount = 220;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pSpeed = new Float32Array(particleCount);

    for (let p = 0; p < particleCount; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 5.5;
      pPos[p * 3 + 1] = (Math.random() - 0.5) * 5.0;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 3.5;
      pSpeed[p] = 0.4 + Math.random() * 0.8;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d")!;
    const pGrad = pCtx.createRadialGradient(32, 32, 2, 32, 32, 32);
    pGrad.addColorStop(0, "rgba(255, 255, 240, 1)");
    pGrad.addColorStop(0.35, "rgba(255, 215, 0, 0.85)");
    pGrad.addColorStop(1, "rgba(255, 140, 0, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTex = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 9. Resize Listener
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 10. Interactive Parallax Tilt
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 11. 60FPS Render & Cinematic Fly-Through Animation Loop
    let animId: number;
    let openProgress = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Ambient Stardust Motion
      const positions = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * pSpeed[i] * 0.4;
        positions[i * 3] += Math.sin(elapsed + i) * 0.003;
        if (positions[i * 3 + 1] > 2.8) {
          positions[i * 3 + 1] = -2.8;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      // Volumetric Rays Rotation
      raysMesh.rotation.z = elapsed * 0.15;

      // Door Parting & Camera Fly-Through Choreography
      if (phaseRef.current === "opening") {
        openProgress = Math.min(1.0, openProgress + delta * 0.65);

        // Smooth cubic-bezier easing: 1 - pow(1 - t, 3)
        const ease = 1 - Math.pow(1 - openProgress, 3);

        // Swing inward into sanctum: 84 degrees (+1.46 rad left, -1.46 rad right)
        leftPivot.rotation.y = ease * 1.46;
        rightPivot.rotation.y = -ease * 1.46;

        // Camera Dolly-In: Push through the doors toward the sanctum
        camera.position.z = 4.3 - ease * 2.65;
        camera.position.y = ease * 0.15;

        // Sanctum light flares up as doors open
        sanctumLight.intensity = 3.5 + ease * 8.5;
        raysMat.opacity = Math.min(1.0, 0.85 + ease * 0.35);

        // Gentle fade-out near the end of the fly-through
        if (openProgress > 0.72) {
          const fadeT = (openProgress - 0.72) / 0.28;
          renderer.domElement.style.opacity = `${Math.max(0, 1 - fadeT)}`;
        }
      } else {
        // Subtle resting parallax
        scene.rotation.y = mouseX * 0.04;
        scene.rotation.x = -mouseY * 0.03;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup resources cleanly when unmounted
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      renderer.dispose();
      doorGeo.dispose();
      studGeo.dispose();
      pillarGeo.dispose();
      archGeo.dispose();
      pGeo.dispose();
      leftTex.texture.dispose();
      leftTex.bump.dispose();
      rightTex.texture.dispose();
      rightTex.bump.dispose();
      raysTex.dispose();
      pTex.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [forceOpen, phase]);

  // Auto-open timer and keyboard support
  useEffect(() => {
    if (forceOpen) {
      setPhase("opened");
      return;
    }

    const autoTimer = setTimeout(() => {
      handleOpen();
    }, 2600);

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
      className={`keka-3d-entrance-wrapper ${isOpening ? "is-opening" : ""}`}
      onClick={handleOpen}
      role="banner"
      aria-label="Tirumala Bangaru Vakili - Sacred 3D Temple Entrance"
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="keka-three-canvas-container" />

      {/* Accessible Glassmorphic Skip Pill */}
      <button
        className="keka-skip-pill"
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

      {/* Central 24K Bangaru Mudra (Auspicious Sanctum Seal) */}
      <div className={`keka-center-medallion ${isOpening ? "medallion-bloom-out" : ""}`}>
        <div className="keka-halo-pulse" />

        <div className="keka-seal-disc">
          {/* Srivari Thirunamam, Shankha & Chakra Emblem */}
          <div className="keka-emblem-box">
            <svg viewBox="0 0 180 100" className="keka-namam-svg" fill="none">
              {/* Left Conch */}
              <g transform="translate(16, 28) scale(0.72)">
                <path
                  d="M18 4 C28 4, 36 12, 36 24 C36 38, 22 50, 6 50 C2 50, 0 45, 0 40 C0 30, 10 20, 18 4 Z"
                  fill="url(#goldGrad)"
                />
                <path
                  d="M16 10 C22 16, 26 26, 24 32"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </g>

              {/* Central Lord Balaji Thirunamam */}
              <g transform="translate(64, 8)">
                <path
                  d="M4 14 C4 42, 16 66, 26 78 C20 66, 15 42, 15 14 Z"
                  fill="#ffffff"
                  filter="drop-shadow(0 0 6px rgba(255,255,255,0.9))"
                />
                <path
                  d="M48 14 C48 42, 36 66, 26 78 C32 66, 37 42, 37 14 Z"
                  fill="#ffffff"
                  filter="drop-shadow(0 0 6px rgba(255,255,255,0.9))"
                />
                <path
                  d="M18 78 C26 74, 26 74, 34 78 C32 84, 20 84, 18 78 Z"
                  fill="url(#goldGrad)"
                />
                <path
                  d="M26 6 C26 30, 25 56, 26 82"
                  stroke="#dc2626"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 6px rgba(220,38,38,0.95))"
                />
                <circle cx="26" cy="87" r="3.5" fill="#f59e0b" />
              </g>

              {/* Right Discus */}
              <g transform="translate(122, 28) scale(0.72)">
                <circle cx="24" cy="27" r="19" fill="url(#goldGrad)" />
                <circle
                  cx="24"
                  cy="27"
                  r="11"
                  stroke="#ffffff"
                  strokeWidth="2"
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
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff9e6" />
                  <stop offset="35%" stopColor="#fde68a" />
                  <stop offset="70%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="keka-mantra-title">|| OM NAMO VENKATESHAYA ||</span>
          <h1 className="keka-brand-heading">Tirumala Balaji</h1>
          <span className="keka-brand-sub">MARRIAGES &amp; EVENTS</span>

          <div className="keka-divider">
            <span className="keka-div-line" />
            <span className="keka-div-pip">✦</span>
            <span className="keka-div-line" />
          </div>

          <p className="keka-invitation-text">
            Entering the Sacred Bangaru Vakili of Divine Matrimony
          </p>

          <button className="keka-enter-btn" onClick={handleOpen} type="button">
            <span>Enter Sacred Ceremony</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <span className="keka-tap-hint">Tap anywhere to enter immediately</span>
        </div>
      </div>
    </div>
  );
}
