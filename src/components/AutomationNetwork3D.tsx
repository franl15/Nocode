"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NetworkFallbackVisual } from "@/components/NetworkFallbackVisual";

gsap.registerPlugin(ScrollTrigger);

const HUB_LABELS = [
  "WHATSAPP IA",
  "WEB 0.6s",
  "CRM SYNC",
  "AGENDA 24/7",
  "PDF AUTO",
  "API CORE",
];

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function createRadialGlowTexture(
  innerColor: string,
  midColor: string,
  size = 64
): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const half = size / 2;
  const g = ctx.createRadialGradient(half, half, 0, half, half, half);
  g.addColorStop(0, innerColor);
  g.addColorStop(0.32, midColor);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export default function AutomationNetwork3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasGL = supportsWebGL();

    const update = () => {
      setCanRender3D(hasGL && mqDesktop.matches && !mqReduced.matches);
    };

    update();
    mqDesktop.addEventListener("change", update);
    mqReduced.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqReduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!canRender3D) return;
    const container = wrapRef.current;
    if (!container) return;

    // 1. Scene with atmospheric exponential fog matching Pure Black #000000 canvas
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.135);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    camera.position.set(0, 0.05, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Subtle studio lighting
    const ambient = new THREE.AmbientLight(0x7ea2db, 0.75);
    const pointLight = new THREE.PointLight(0x7ea2db, 3.2, 14);
    pointLight.position.set(1.6, 0.4, 2.2);
    scene.add(ambient, pointLight);

    // Procedural radial glow textures (zero external assets)
    const nodeGlowTex = createRadialGlowTexture(
      "rgba(242,240,235,1)",
      "rgba(126,162,219,0.55)",
      64
    );
    const coreHaloTex = createRadialGlowTexture(
      "rgba(126,162,219,0.42)",
      "rgba(126,162,219,0.12)",
      128
    );

    // =========================================================================
    // LAYER 1 (BACK): Distant ambient depth field (slowest mouse parallax)
    // =========================================================================
    const bgDustGroup = new THREE.Group();
    scene.add(bgDustGroup);

    const dustCount = 90;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.35) * 11;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      dustPos[i * 3 + 2] = -1.5 - Math.random() * 5.5;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x7ea2db,
      map: nodeGlowTex,
      size: 0.14,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    bgDustGroup.add(dustPoints);

    // =========================================================================
    // LAYER 2 (MID): Dense Glowing 3D Neural Network Hemisphere (Auros-style horizon dome)
    // =========================================================================
    const networkAnchor = new THREE.Group();
    networkAnchor.position.set(0, -2.55, -0.2);
    scene.add(networkAnchor);

    // Volumetric radial #7EA2DB horizon glow sprite behind neural dome
    const coreSpriteMat = new THREE.SpriteMaterial({
      map: coreHaloTex,
      color: 0x7ea2db,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const coreSprite = new THREE.Sprite(coreSpriteMat);
    coreSprite.scale.set(10.8, 6.5, 1);
    coreSprite.position.set(0, 1.65, -0.9);
    networkAnchor.add(coreSprite);

    const networkGroup = new THREE.Group();
    networkAnchor.add(networkGroup);

    // 140 neural nodes forming a dense luminous 3D hemisphere rising prominently from the bottom edge
    const totalNodes = 140;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < totalNodes; i++) {
      // Dense upper dome shell (y in [0.12, 1.0])
      const t = i / (totalNodes - 1);
      const y = 0.12 + t * 0.88;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const isHub = i < HUB_LABELS.length;
      const r = isHub ? 2.48 : 2.25 + ((i * 23) % 32) / 100;
      nodePositions.push(
        new THREE.Vector3(
          Math.cos(theta) * radiusAtY * r * 1.15,
          y * r * 1.02,
          Math.sin(theta) * radiusAtY * r * 1.02
        )
      );
    }

    // Self-illuminated glowing cores (InstancedMesh — single draw call)
    const nodeGeo = new THREE.SphereGeometry(0.048, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xf2f0eb,
      emissive: 0x7ea2db,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.1,
    });
    const nodeMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, totalNodes);
    const dummy = new THREE.Object3D();
    const colorHub = new THREE.Color(0xffffff);
    const colorSat = new THREE.Color(0x7ea2db);

    const haloPositions = new Float32Array(totalNodes * 3);
    const haloColors = new Float32Array(totalNodes * 3);

    for (let i = 0; i < totalNodes; i++) {
      const pos = nodePositions[i];
      dummy.position.copy(pos);
      dummy.scale.setScalar(i < HUB_LABELS.length ? 1.55 : 0.78);
      dummy.updateMatrix();
      nodeMesh.setMatrixAt(i, dummy.matrix);
      const col = i < HUB_LABELS.length ? colorHub : colorSat;
      nodeMesh.setColorAt(i, col);

      haloPositions[i * 3] = pos.x;
      haloPositions[i * 3 + 1] = pos.y;
      haloPositions[i * 3 + 2] = pos.z;
      haloColors[i * 3] = col.r;
      haloColors[i * 3 + 1] = col.g;
      haloColors[i * 3 + 2] = col.b;
    }
    nodeMesh.instanceMatrix.needsUpdate = true;
    if (nodeMesh.instanceColor) nodeMesh.instanceColor.needsUpdate = true;
    networkGroup.add(nodeMesh);

    // Additive radial glow halo on every node
    const haloGeo = new THREE.BufferGeometry();
    haloGeo.setAttribute("position", new THREE.BufferAttribute(haloPositions, 3));
    haloGeo.setAttribute("color", new THREE.BufferAttribute(haloColors, 3));
    const haloMat = new THREE.PointsMaterial({
      map: nodeGlowTex,
      size: 0.48,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const haloPoints = new THREE.Points(haloGeo, haloMat);
    networkGroup.add(haloPoints);

    // 3D Neural Edges (LineSegments — dense glowing synaptic web)
    const edges: [number, number][] = [];
    const lineCoords: number[] = [];
    for (let i = 0; i < totalNodes; i++) {
      for (let j = i + 1; j < totalNodes; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.05) {
          edges.push([i, j]);
          lineCoords.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z,
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z
          );
        }
      }
    }

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineCoords, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x7ea2db,
      transparent: true,
      opacity: 0.42,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    networkGroup.add(edgeLines);

    // Luminous Data Pulses with 6-point glowing trails (NO white squares!)
    const pulseCount = 24;
    const trailSegments = 7; // 1 bright head + 6 fading trail sparks
    const totalTrailPts = pulseCount * trailSegments;
    const trailPositions = new Float32Array(totalTrailPts * 3);
    const trailColors = new Float32Array(totalTrailPts * 3);

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
    trailGeo.setAttribute("color", new THREE.BufferAttribute(trailColors, 3));
    const trailMat = new THREE.PointsMaterial({
      map: nodeGlowTex,
      size: 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const trailPoints = new THREE.Points(trailGeo, trailMat);
    networkGroup.add(trailPoints);

    const pulses = Array.from({ length: pulseCount }, (_, k) => ({
      edgeIdx: (k * 7) % Math.max(1, edges.length),
      t: (k * 0.17) % 1,
      speed: 0.005 + (k % 4) * 0.0014,
      forward: k % 2 === 0,
    }));

    // =========================================================================
    // LAYER 3 (FRONT): Precision orbital rings centered on neural hemisphere
    // =========================================================================
    const frontRingsGroup = new THREE.Group();
    frontRingsGroup.position.set(0, -2.55, 0.15);
    scene.add(frontRingsGroup);

    const ringGeo1 = new THREE.RingGeometry(2.55, 2.565, 96);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x7ea2db,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.16,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.set(Math.PI * 0.42, 0.25, 0);

    const ringGeo2 = new THREE.RingGeometry(3.05, 3.062, 96);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xf2f0eb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.set(Math.PI * 0.56, -0.35, 0.2);

    frontRingsGroup.add(ring1, ring2);

    // =========================================================================
    // Resize, Visibility, Multi-Layer Mouse Parallax & GSAP ScrollTrigger
    // =========================================================================
    let width = 1;
    let height = 1;
    let isVisible = true;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    const scrollState = { rotY: 0, rotX: 0, camZ: 6.2, camY: 0.05 };

    const st = ScrollTrigger.create({
      trigger: "#inicio",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollState.rotY = self.progress * Math.PI * 0.75;
        scrollState.rotX = self.progress * 0.32;
        scrollState.camZ = 6.2 - self.progress * 1.15;
        scrollState.camY = 0.05 - self.progress * 0.55;
      },
    });

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 1.0;
      targetMouseY = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId = 0;
    let idleRot = 0;
    const tmpVec = new THREE.Vector3();
    const trailPosVec = new THREE.Vector3();
    const headCol = new THREE.Color(0xffffff);
    const tailCol = new THREE.Color(0x7ea2db);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      idleRot += 0.0022;
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.055;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.055;

      // Multi-layer parallax across depth layers
      bgDustGroup.position.x = -smoothMouseX * 0.25;
      bgDustGroup.position.y = smoothMouseY * 0.2;
      bgDustGroup.rotation.y = idleRot * 0.15;

      networkGroup.rotation.y = idleRot + smoothMouseX * 0.55 + scrollState.rotY;
      networkGroup.rotation.x = 0.08 + smoothMouseY * 0.28 + scrollState.rotX;
      networkAnchor.position.x = -smoothMouseX * 0.3;
      networkAnchor.position.y = -2.55 + smoothMouseY * 0.2;

      frontRingsGroup.position.x = -smoothMouseX * 0.5;
      frontRingsGroup.position.y = -2.55 + smoothMouseY * 0.32;
      frontRingsGroup.rotation.y = idleRot * 0.45 + smoothMouseX * 0.35;
      frontRingsGroup.rotation.x = smoothMouseY * 0.25;

      // GSAP Scroll-driven camera movement
      camera.position.z += (scrollState.camZ - camera.position.z) * 0.08;
      camera.position.y += (scrollState.camY - camera.position.y) * 0.08;
      camera.lookAt(0, -0.35, 0);

      // Update luminous light-trail pulses
      if (edges.length > 0) {
        const posAttr = trailGeo.attributes.position as THREE.BufferAttribute;
        const colAttr = trailGeo.attributes.color as THREE.BufferAttribute;

        for (let p = 0; p < pulseCount; p++) {
          const pl = pulses[p];
          pl.t += pl.speed;
          if (pl.t >= 1) {
            pl.t = 0;
            pl.edgeIdx = (pl.edgeIdx + 7) % edges.length;
          }
          const [a, b] = edges[pl.edgeIdx];
          const from = nodePositions[pl.forward ? a : b];
          const to = nodePositions[pl.forward ? b : a];

          for (let s = 0; s < trailSegments; s++) {
            const idx = p * trailSegments + s;
            const segT = Math.max(0, pl.t - s * 0.032);
            trailPosVec.lerpVectors(from, to, segT);
            posAttr.setXYZ(idx, trailPosVec.x, trailPosVec.y, trailPosVec.z);

            const fade = Math.pow(1 - s / trailSegments, 1.8);
            const cMix = s === 0 ? headCol : tailCol;
            colAttr.setXYZ(idx, cMix.r * fade, cMix.g * fade, cMix.b * fade);
          }
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);

      // Project anchored labels with depth-based scale & opacity (only in right half so text stays crystal clear)
      networkGroup.updateMatrixWorld();
      for (let i = 0; i < HUB_LABELS.length; i++) {
        const el = labelRefs.current[i];
        if (!el) continue;
        tmpVec.copy(nodePositions[i]).applyMatrix4(networkGroup.matrixWorld);
        const worldZ = tmpVec.z;
        tmpVec.project(camera);
        const sx = (tmpVec.x * 0.5 + 0.5) * width;
        const sy = (-tmpVec.y * 0.5 + 0.5) * height;

        // Map worldZ (-2.2 .. +2.2) to depth scale (0.76 .. 1.08) and opacity
        const depthNorm = Math.max(0, Math.min(1, (worldZ + 1.8) / 3.6));
        const depthScale = 0.76 + depthNorm * 0.32;
        const inSafeRightZone = sx > width * 0.48 && sx < width - 110 && sy > 155 && sy < height - 120;
        const opacity = inSafeRightZone && worldZ > -0.6 ? 0.28 + depthNorm * 0.7 : 0;

        el.style.transform = `translate3d(${sx + 8}px, ${sy - 10}px, 0) scale(${depthScale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      nodeGlowTex.dispose();
      coreHaloTex.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      trailGeo.dispose();
      trailMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      coreSpriteMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [canRender3D]);

  if (!canRender3D) {
    return (
      <div className="hidden lg:flex absolute inset-y-0 right-0 w-[44%] items-center justify-center p-10">
        <NetworkFallbackVisual />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      data-cursor="interactive"
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Anchored Hub Labels scaled dynamically by 3D Z-distance */}
      {HUB_LABELS.map((label, idx) => (
        <div
          key={label}
          ref={(el) => {
            labelRefs.current[idx] = el;
          }}
          className="pointer-events-none absolute top-0 left-0 z-10 flex items-center gap-1.5 opacity-0 origin-left will-change-transform"
        >
          <span className="w-3 h-px bg-[#7EA2DB]/70" />
          <span className="bg-[#030712]/88 backdrop-blur-xs border border-[#7EA2DB]/45 px-2 py-0.5 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#F2F0EB] whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export { NetworkFallbackVisual };
