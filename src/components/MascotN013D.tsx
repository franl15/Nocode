"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type MascotPose = "sitting" | "waving" | "presenting" | "pointing";

interface MascotN013DProps {
  pose: MascotPose;
  size?: number;
  className?: string;
  label?: string;
}

export function MascotN013D({
  pose,
  size = 150,
  className = "",
  label = "N-01 en 3D",
}: MascotN013DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [can3D, setCan3D] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) return;

    const el = hostRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCan3D(true);
          io.disconnect();
        }
      },
      { rootMargin: "220px 0px 220px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!can3D) return;
    const container = hostRef.current;
    if (!container) return;

    let cancelled = false;
    let rafId = 0;
    let cleanup: (() => void) | undefined;

    void import("three").then((THREE) => {
      if (cancelled || !hostRef.current) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(size, size, false);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.domElement.style.width = `${size}px`;
      renderer.domElement.style.height = `${size}px`;
      renderer.domElement.style.display = "block";
      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
      camera.position.set(0, 0.12, 4.45);
      camera.lookAt(0, -0.02, 0);

      // Studio lighting crafted to make N-01's matte-charcoal helmet pop cleanly on #000000
      const hemi = new THREE.HemisphereLight(0xdbe8ff, 0x162238, 1.25);
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      keyLight.position.set(2.4, 3.6, 3.4);
      const rimLeft = new THREE.DirectionalLight(0x9ab8e8, 2.4);
      rimLeft.position.set(-3.2, 2.2, -1.8);
      const rimTop = new THREE.PointLight(0xdbe8ff, 3.2, 9);
      rimTop.position.set(0.2, 2.6, -1.4);
      const frontFill = new THREE.PointLight(0x7ea2db, 1.4, 8);
      frontFill.position.set(-1.6, -0.4, 2.8);
      scene.add(hemi, keyLight, rimLeft, rimTop, frontFill);

      // Official N-01 Materials (matching public/images/nocode-mascot.jpg)
      const matteCharcoalMat = new THREE.MeshStandardMaterial({
        color: 0x262c38,
        metalness: 0.42,
        roughness: 0.34,
      });
      const darkLimbMat = new THREE.MeshStandardMaterial({
        color: 0x1a1f29,
        metalness: 0.48,
        roughness: 0.3,
      });
      const pearlArmorMat = new THREE.MeshStandardMaterial({
        color: 0xeceff4,
        metalness: 0.24,
        roughness: 0.24,
      });
      const visorGlassMat = new THREE.MeshStandardMaterial({
        color: 0x050810,
        metalness: 0.88,
        roughness: 0.08,
      });
      const visorRimMat = new THREE.MeshStandardMaterial({
        color: 0x5c687d,
        metalness: 0.72,
        roughness: 0.22,
      });
      const eyeGlowMat = new THREE.MeshBasicMaterial({
        color: 0x8fd6ff,
      });
      const orbitRingMat = new THREE.MeshStandardMaterial({
        color: 0xcbd8ec,
        metalness: 0.85,
        roughness: 0.18,
      });
      const glassCubeMat = new THREE.MeshStandardMaterial({
        color: 0x4b5c78,
        metalness: 0.35,
        roughness: 0.14,
        transparent: true,
        opacity: 0.55,
      });
      const cubeEdgeMat = new THREE.LineBasicMaterial({
        color: 0x9ab8e8,
        transparent: true,
        opacity: 0.5,
      });

      const robot = new THREE.Group();
      scene.add(robot);

      // Helper to build N-01's iconic happy chevron eye (^)
      const buildChevronEye = () => {
        const g = new THREE.Group();
        const segGeo = new THREE.CapsuleGeometry(0.036, 0.095, 6, 12);
        const leftSeg = new THREE.Mesh(segGeo, eyeGlowMat);
        leftSeg.position.set(-0.044, 0, 0);
        leftSeg.rotation.z = -0.78;
        const rightSeg = new THREE.Mesh(segGeo, eyeGlowMat);
        rightSeg.position.set(0.044, 0, 0);
        rightSeg.rotation.z = 0.78;
        g.add(leftSeg, rightSeg);
        return g;
      };

      // ================= HEAD GROUP (sleek matte-charcoal helmet, NO antenna) =================
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.56, 0);
      robot.add(headGroup);

      // Main rounded helmet
      const helmet = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 36, 30),
        matteCharcoalMat
      );
      helmet.scale.set(1.06, 0.94, 0.96);
      headGroup.add(helmet);

      // Subtle glossy visor bezel rim
      const visorBezel = new THREE.Mesh(
        new THREE.TorusGeometry(0.45, 0.022, 14, 36),
        visorRimMat
      );
      visorBezel.scale.set(1.06, 0.86, 1);
      visorBezel.position.set(0, -0.01, 0.36);
      headGroup.add(visorBezel);

      // Large glossy curved black visor faceplate
      const visor = new THREE.Mesh(
        new THREE.SphereGeometry(0.54, 32, 26),
        visorGlassMat
      );
      visor.scale.set(0.95, 0.77, 0.44);
      visor.position.set(0, -0.01, 0.35);
      headGroup.add(visor);

      // Iconic glowing ^ ^ chevron eyes
      const leftEye = buildChevronEye();
      leftEye.position.set(-0.17, 0.03, 0.59);
      const rightEye = buildChevronEye();
      rightEye.position.set(0.17, 0.03, 0.59);
      headGroup.add(leftEye, rightEye);

      // Iconic dual-layer circular ear pods (pearl-white ring + matte-charcoal core)
      const earOuterGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.075, 28);
      const earInnerGeo = new THREE.CylinderGeometry(0.135, 0.135, 0.095, 24);
      ([-1, 1] as const).forEach((side) => {
        const earGroup = new THREE.Group();
        earGroup.position.set(side * 0.61, -0.02, -0.02);
        earGroup.rotation.z = Math.PI / 2;
        const outer = new THREE.Mesh(earOuterGeo, pearlArmorMat);
        const inner = new THREE.Mesh(earInnerGeo, matteCharcoalMat);
        inner.position.y = -side * 0.014;
        earGroup.add(outer, inner);
        headGroup.add(earGroup);
      });

      // ================= NECK + TORSO (pearl-white chest shell + dark center panel) =================
      const neckRing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.28, 0.1, 24),
        visorRimMat
      );
      neckRing.position.set(0, 0.04, 0);
      robot.add(neckRing);

      // Pearl-white rounded chest armor
      const chestArmor = new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 30, 26),
        pearlArmorMat
      );
      chestArmor.scale.set(1.04, 1.08, 0.88);
      chestArmor.position.set(0, -0.34, 0);
      robot.add(chestArmor);

      // Matte-black center vertical chest stripe / core panel (signature N-01 detail)
      const centerPanel = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.16, 0.38, 12, 20),
        darkLimbMat
      );
      centerPanel.scale.set(1.1, 1, 0.55);
      centerPanel.position.set(0, -0.37, 0.31);
      robot.add(centerPanel);

      // Small metallic collar badge / slot at upper chest
      const chestSlot = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.042, 0.04),
        pearlArmorMat
      );
      chestSlot.position.set(0, -0.13, 0.37);
      const chestSlotInner = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.018, 0.046),
        darkLimbMat
      );
      chestSlotInner.position.set(0, -0.13, 0.375);
      robot.add(chestSlot, chestSlotInner);

      // Compact matte-black backpack with pearl-white accent ring
      const backpack = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.19, 0.2, 10, 18),
        matteCharcoalMat
      );
      backpack.scale.set(1.15, 1, 0.72);
      backpack.position.set(0, -0.26, -0.38);
      robot.add(backpack);

      // ================= ARMS (matte black + pearl-white wrist cuffs) =================
      const buildArm = (side: -1 | 1) => {
        const pivot = new THREE.Group();
        pivot.position.set(side * 0.5, -0.16, 0.02);

        const upperArm = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.115, 0.28, 10, 18),
          darkLimbMat
        );
        upperArm.position.set(0, -0.18, 0);
        pivot.add(upperArm);

        // Pearl-white wrist cuff
        const cuff = new THREE.Mesh(
          new THREE.SphereGeometry(0.118, 18, 16),
          pearlArmorMat
        );
        cuff.scale.set(1, 0.88, 1);
        cuff.position.set(0, -0.35, 0);
        pivot.add(cuff);

        // Small dark hand tip
        const hand = new THREE.Mesh(
          new THREE.SphereGeometry(0.075, 14, 14),
          darkLimbMat
        );
        hand.position.set(0, -0.43, 0.01);
        pivot.add(hand);

        return pivot;
      };

      const leftArmPivot = buildArm(-1);
      const rightArmPivot = buildArm(1);
      robot.add(leftArmPivot, rightArmPivot);

      // ================= LEGS (chubby matte-black + pearl-white ankle ring) =================
      const buildLeg = (side: -1 | 1) => {
        const pivot = new THREE.Group();
        pivot.position.set(side * 0.21, -0.74, 0.02);

        const legMesh = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.135, 0.24, 10, 18),
          darkLimbMat
        );
        legMesh.scale.set(1, 1, 0.94);
        legMesh.position.set(0, -0.14, 0);
        pivot.add(legMesh);

        // Thin pearl-white ankle ring
        const ankleRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.112, 0.016, 10, 24),
          pearlArmorMat
        );
        ankleRing.rotation.x = Math.PI / 2;
        ankleRing.position.set(0, -0.27, 0);
        pivot.add(ankleRing);

        return pivot;
      };

      const leftLegPivot = buildLeg(-1);
      const rightLegPivot = buildLeg(1);
      robot.add(leftLegPivot, rightLegPivot);

      // ================= SIGNATURE ORBITAL RING + FLOATING GLASS CUBES =================
      const orbitGroup = new THREE.Group();
      orbitGroup.position.set(0, -0.1, 0);
      orbitGroup.rotation.z = -0.34;
      orbitGroup.rotation.x = 0.42;
      robot.add(orbitGroup);

      const orbitRadius = pose === "sitting" ? 0.96 : 1.06;
      const orbitRing = new THREE.Mesh(
        new THREE.TorusGeometry(orbitRadius, 0.013, 12, 64),
        orbitRingMat
      );
      orbitRing.rotation.x = Math.PI / 2;
      orbitGroup.add(orbitRing);

      const cubesOrbit = new THREE.Group();
      orbitGroup.add(cubesOrbit);
      const cubeGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
      const cubeEdgesGeo = new THREE.EdgesGeometry(cubeGeo);
      const cubeAngles = [0.4, 2.5, 4.6];
      const cubes: InstanceType<typeof THREE.Group>[] = [];

      cubeAngles.forEach((angle, i) => {
        const cubeHolder = new THREE.Group();
        const r = orbitRadius + (i === 1 ? 0.06 : 0);
        cubeHolder.position.set(
          Math.cos(angle) * r,
          i === 1 ? 0.12 : -0.04,
          Math.sin(angle) * r
        );
        const cubeMesh = new THREE.Mesh(cubeGeo, glassCubeMat);
        const cubeWire = new THREE.LineSegments(cubeEdgesGeo, cubeEdgeMat);
        cubeHolder.add(cubeMesh, cubeWire);
        cubesOrbit.add(cubeHolder);
        cubes.push(cubeHolder);
      });

      // ================= APPLY POSE =================
      if (pose === "waving") {
        rightArmPivot.rotation.z = 2.35;
        rightArmPivot.rotation.x = -0.22;
        leftArmPivot.rotation.z = -0.28;
        headGroup.rotation.z = -0.07;
        robot.rotation.y = -0.2;
      } else if (pose === "sitting") {
        // Seated on card edge with chubby legs dangling forward
        leftLegPivot.rotation.x = -1.35;
        rightLegPivot.rotation.x = -1.25;
        leftArmPivot.rotation.x = -0.4;
        leftArmPivot.rotation.z = -0.24;
        rightArmPivot.rotation.x = -0.4;
        rightArmPivot.rotation.z = 0.24;
        robot.position.y = 0.12;
        robot.rotation.y = 0.22;
      } else if (pose === "presenting") {
        leftArmPivot.rotation.z = -0.88;
        leftArmPivot.rotation.x = -0.32;
        rightArmPivot.rotation.z = 1.05;
        rightArmPivot.rotation.x = -0.36;
        robot.rotation.y = -0.18;
      } else if (pose === "pointing") {
        rightArmPivot.rotation.z = 1.45;
        rightArmPivot.rotation.x = -0.2;
        leftArmPivot.rotation.z = -0.24;
        headGroup.rotation.y = 0.22;
        robot.rotation.y = 0.14;
      }

      // Mouse look + visibility pause
      let isVisible = true;
      const visIo = new IntersectionObserver(
        ([entry]) => {
          isVisible = Boolean(entry?.isIntersecting);
        },
        { threshold: 0.05 }
      );
      visIo.observe(container);

      let targetX = 0;
      let targetY = 0;
      const onMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / 500));
        targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / 400));
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      const clock = new THREE.Clock();
      const baseRobotY = robot.position.y;
      const baseRobotRotY = robot.rotation.y;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (!isVisible) return;

        const t = clock.getElapsedTime();

        // Gentle hover / breathing
        robot.position.y =
          baseRobotY + Math.sin(t * 2.0) * (pose === "sitting" ? 0.022 : 0.055);
        robot.rotation.y = baseRobotRotY + targetX * 0.25;
        headGroup.rotation.y += (targetX * 0.32 - headGroup.rotation.y) * 0.08;
        headGroup.rotation.x += (targetY * 0.18 - headGroup.rotation.x) * 0.08;

        // Slow orbital ring cubes rotation
        cubesOrbit.rotation.y = t * 0.45;
        cubes.forEach((c, idx) => {
          c.rotation.x = t * 0.6 + idx;
          c.rotation.y = t * 0.8 + idx;
        });

        // Pose-specific subtle micro-motion
        if (pose === "waving") {
          rightArmPivot.rotation.z = 2.35 + Math.sin(t * 5.0) * 0.2;
        } else if (pose === "sitting") {
          leftLegPivot.rotation.x = -1.35 + Math.sin(t * 2.3) * 0.08;
          rightLegPivot.rotation.x = -1.25 - Math.sin(t * 2.3) * 0.08;
        }

        // Cute periodic happy blink
        const blinkCycle = t % 4.4;
        const eyeScaleY = blinkCycle > 4.22 ? 0.18 : 1;
        leftEye.scale.y = eyeScaleY;
        rightEye.scale.y = eyeScaleY;

        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        visIo.disconnect();
        window.removeEventListener("mousemove", onMove);
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
            obj.geometry.dispose();
          }
        });
        matteCharcoalMat.dispose();
        darkLimbMat.dispose();
        pearlArmorMat.dispose();
        visorGlassMat.dispose();
        visorRimMat.dispose();
        eyeGlowMat.dispose();
        orbitRingMat.dispose();
        glassCubeMat.dispose();
        cubeEdgeMat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, [can3D, pose, size]);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={label}
      style={{ width: size, height: size }}
      className={`relative shrink-0 flex items-center justify-center select-none ${className}`}
    >
      {/* Mobile / Reduced-motion / Pre-mount static fallback */}
      {!can3D && (
        <div
          style={{ width: Math.min(size, 64), height: Math.min(size, 64) }}
          className="rounded-[14px] overflow-hidden border border-[#7EA2DB]/40 bg-[#0A0A0D]"
        >
          <Image
            src="/images/nocode-mascot.jpg"
            alt={label}
            width={64}
            height={64}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
