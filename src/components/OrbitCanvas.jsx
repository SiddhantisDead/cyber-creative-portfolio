import { useEffect, useRef } from "react";

const ACCENT_HEX = "#00ff9c";
const LOOP_DURATION = 16;
const MOTION_INTENSITY = 1;

const RINGS = [
  { rf: 0.54, turns: 1, segs: [[0, 1.7], [3.1, 1.15]], w: 1.4, a: 0.34, glow: false },
  { rf: 0.76, turns: -1, segs: [[0.4, 2.5], [3.7, 0.95]], w: 2.2, a: 0.5, glow: true },
  { rf: 0.98, turns: 1, segs: [[0, 6.2833]], w: 1, a: 0.16, glow: false },
  { rf: 1.16, turns: -2, segs: [[1, 1.25], [4.1, 2.1]], w: 3.2, a: 0.6, glow: true },
  { rf: 1.34, turns: 1, segs: [[2.2, 1.5]], w: 1.6, a: 0.3, glow: false },
];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function mix(rgb, amt) {
  return rgb.map((c) => Math.round(c + (255 - c) * amt));
}

function rgba(c, a) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

function roundedRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

// deterministic PRNG so the composition is stable across reloads
function buildFragments(count) {
  let seed = 20260724 >>> 0;
  const rng = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const rand = (a, b) => a + (b - a) * rng();
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const TAU = Math.PI * 2;
  const types = ["dot", "dot", "dot", "ring", "pill", "line", "chip", "pill", "ring", "dot"];
  const roles = ["acc", "accL", "accL", "light", "acc", "deep", "accL", "light"];
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push({
      rf: rand(0.18, 0.99),
      a0: rand(0, TAU),
      turns: pick([1, -1, 1, -1, 2, -2]),
      sBase: rand(3.5, 9.5),
      bobAmp: rand(0, 0.045),
      bobFreq: pick([1, 2, 3]),
      bobPh: rand(0, TAU),
      twFreq: pick([1, 2, 3]),
      twPh: rand(0, TAU),
      spin: pick([0, 1, -1, 2, -2]),
      spinPh: rand(0, TAU),
      type: pick(types),
      role: pick(roles),
      wf: rand(1.6, 3.4),
    });
  }
  // one pinned larger "UI card" fragment for a showcase nod
  out.push({ rf: 0.62, a0: 0.5, turns: 1, sBase: 13, bobAmp: 0.03, bobFreq: 1, bobPh: 0, twFreq: 1, twPh: 0.6, spin: 0, spinPh: 0, type: "card", role: "deep", wf: 2.6 });
  return out;
}

export function OrbitCanvas({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // scale back detail/resolution on small screens or weaker devices
    const lite =
      window.matchMedia("(max-width: 640px)").matches ||
      (navigator.hardwareConcurrency || 4) <= 4;
    const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.5);
    const targetFrameMs = 1000 / (lite ? 24 : 30);
    const frags = buildFragments(lite ? 10 : 20);

    let w = 0;
    let h = 0;
    let bgGradient = null;

    const buildBgGradient = () => {
      const cx = w / 2;
      const cy = h / 2;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.72);
      g.addColorStop(0, "#0e1610");
      g.addColorStop(0.55, "#0b1210");
      g.addColorStop(1, "#0a0e14");
      return g;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bgGradient = buildBgGradient();
    };

    const ACC = hexToRgb(ACCENT_HEX);
    const ACC_L = mix(ACC, 0.5);
    const DEEP = ACC.map((c) => Math.round(c * 0.5));
    const LIGHT = [218, 227, 238];
    const colorOf = (role) =>
      role === "acc" ? ACC : role === "accL" ? ACC_L : role === "deep" ? DEEP : LIGHT;

    const draw = (t) => {
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.44;
      const TAU = Math.PI * 2;
      const p = (t % LOOP_DURATION) / LOOP_DURATION;

      const ignite = (0.5 - 0.5 * Math.cos(TAU * p)) * MOTION_INTENSITY;
      const pulse = 0.5 + 0.5 * Math.sin(TAU * 2 * p);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      const halo = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.5);
      halo.addColorStop(0, rgba(ACC, 0.05 + 0.06 * ignite));
      halo.addColorStop(0.5, rgba(ACC, 0.03 + 0.03 * ignite));
      halo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      for (const rg of RINGS) {
        const rad = R * rg.rf;
        const rot = TAU * rg.turns * p;
        ctx.lineWidth = rg.w;
        ctx.strokeStyle = rgba(ACC_L, rg.a * (0.7 + 0.3 * pulse));
        if (rg.glow && !lite) {
          ctx.shadowBlur = 16;
          ctx.shadowColor = rgba(ACC, 0.8);
        } else {
          ctx.shadowBlur = 0;
        }
        for (const [start, len] of rg.segs) {
          ctx.beginPath();
          ctx.arc(cx, cy, rad, rot + start, rot + start + len);
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;

      const sScale = R / 300;
      for (const f of frags) {
        const ang = f.a0 + TAU * f.turns * p;
        const rad =
          R * f.rf + f.bobAmp * MOTION_INTENSITY * R * Math.sin(TAU * f.bobFreq * p + f.bobPh);
        const x = cx + Math.cos(ang) * rad;
        const y = cy + Math.sin(ang) * rad;
        const tw =
          0.55 + 0.45 * MOTION_INTENSITY * (0.5 + 0.5 * Math.sin(TAU * f.twFreq * p + f.twPh));
        const s = f.sBase * sScale;
        const col = colorOf(f.role);
        const spin = ang + f.spinPh + TAU * f.spin * p;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(spin);
        ctx.globalCompositeOperation = "lighter";

        // per-fragment glow is skipped (only a handful of ring/core draws use
        // shadowBlur) — canvas shadow blur is expensive and this loop can run
        // 10-20x per frame, so flat fills keep the animation smooth.
        if (f.type === "dot") {
          ctx.fillStyle = rgba(col, 0.55 * tw + 0.2);
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.6, 0, TAU);
          ctx.fill();
        } else if (f.type === "ring") {
          ctx.lineWidth = Math.max(1, s * 0.16);
          ctx.strokeStyle = rgba(col, 0.6 * tw + 0.15);
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.75, 0, TAU);
          ctx.stroke();
        } else if (f.type === "pill") {
          ctx.fillStyle = rgba(col, 0.5 * tw + 0.15);
          roundedRect(ctx, -s * f.wf, -s * 0.42, s * f.wf * 2, s * 0.84, s * 0.42);
          ctx.fill();
        } else if (f.type === "chip") {
          ctx.fillStyle = rgba(col, 0.55 * tw + 0.18);
          roundedRect(ctx, -s * 0.9, -s * 0.6, s * 1.8, s * 1.2, s * 0.32);
          ctx.fill();
        } else if (f.type === "line") {
          ctx.fillStyle = rgba(col, 0.5 * tw + 0.12);
          roundedRect(ctx, -s * f.wf, -s * 0.14, s * f.wf * 2, s * 0.28, s * 0.14);
          ctx.fill();
        } else if (f.type === "card") {
          ctx.globalCompositeOperation = "source-over";
          const cw = s * 2.4;
          const ch = s * 1.7;
          ctx.fillStyle = "rgba(22,27,34,0.92)";
          roundedRect(ctx, -cw / 2, -ch / 2, cw, ch, s * 0.28);
          ctx.fill();
          ctx.fillStyle = rgba(ACC, 0.5 * tw + 0.28);
          roundedRect(ctx, -cw / 2 + s * 0.28, -ch / 2 + s * 0.3, cw * 0.42, s * 0.32, s * 0.16);
          ctx.fill();
          ctx.fillStyle = rgba(ACC_L, 0.28);
          roundedRect(ctx, -cw / 2 + s * 0.28, s * 0.05, cw * 0.72, s * 0.2, s * 0.1);
          ctx.fill();
          roundedRect(ctx, -cw / 2 + s * 0.28, s * 0.42, cw * 0.5, s * 0.2, s * 0.1);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.globalCompositeOperation = "lighter";

      const cr = R * (0.24 + 0.16 * ignite);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      core.addColorStop(0, rgba([230, 255, 244], 0.55 + 0.4 * ignite));
      core.addColorStop(0.28, rgba(ACC_L, 0.4 + 0.32 * ignite));
      core.addColorStop(0.62, rgba(ACC, 0.16 + 0.12 * ignite));
      core.addColorStop(1, "rgba(10,20,16,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, TAU);
      ctx.fill();

      const discR = R * (0.07 + 0.03 * ignite);
      const disc = ctx.createRadialGradient(cx, cy, 0, cx, cy, discR);
      disc.addColorStop(0, rgba([240, 255, 248], 0.5 + 0.35 * ignite));
      disc.addColorStop(1, rgba(ACC_L, 0));
      ctx.fillStyle = disc;
      ctx.beginPath();
      ctx.arc(cx, cy, discR, 0, TAU);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
    };

    // Setting canvas.width/height (inside resize()) clears the bitmap, even
    // to the same value. ResizeObserver fires an initial "baseline" callback
    // shortly after observe() starts even with no real size change, which
    // would silently wipe the single static draw() below in the
    // reduced-motion path (the animated rAF loop redraws every frame so it
    // never notices) — so redraw after every resize when motion is reduced.
    const handleResize = () => {
      resize();
      if (reduceMotion) draw(0);
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    // pause the animation loop entirely while the hero is scrolled off-screen
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    let raf;
    const t0 = performance.now();
    if (!reduceMotion) {
      let lastDraw = 0;
      const loop = (now) => {
        if (isVisible && now - lastDraw >= targetFrameMs) {
          draw((now - t0) / 1000);
          lastDraw = now;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
