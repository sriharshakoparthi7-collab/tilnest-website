import React, { useRef, useEffect, useState } from "react";

/**
 * Lightweight Three.js climate sphere.
 * `mode` controls the mood: "chaos" (amber/unstable) -> "order" (cyan/calm).
 * `intensity` 0..1 drives particle agitation and heat.
 */
export default function ClimateGlobe({ mode = "chaos", intensity = 0.6, className = "" }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ mode, intensity });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    stateRef.current = { mode, intensity };
  }, [mode, intensity]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let renderer, scene, camera, frameId, THREE;
    let globe, particles, rings = [];
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };

    import("three").then((mod) => {
      if (disposed) return;
      THREE = mod;
      const w = mount.clientWidth;
      const h = mount.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      mount.appendChild(renderer.domElement);

      // Core wireframe globe
      const geo = new THREE.IcosahedronGeometry(1.8, 4);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x0d9488,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      });
      globe = new THREE.Mesh(geo, mat);
      scene.add(globe);

      // Inner solid glow sphere
      const innerGeo = new THREE.SphereGeometry(1.74, 48, 48);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xccfbf1,
        transparent: true,
        opacity: 0.35,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      scene.add(inner);

      // Particle cloud around globe
      const COUNT = 900;
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(COUNT * 3);
      const radii = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        const r = 2.1 + Math.random() * 1.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        radii[i] = r;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xd9a01e,
        size: 0.035,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // Orbital rings
      for (let k = 0; k < 3; k++) {
        const ringGeo = new THREE.TorusGeometry(2.4 + k * 0.35, 0.006, 8, 120);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.32 - k * 0.06,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.2 + k * 0.25;
        ring.rotation.y = k * 0.4;
        scene.add(ring);
        rings.push(ring);
      }

      mount.addEventListener("mousemove", onMove);

      const basePositions = positions.slice();
      const color1 = new THREE.Color(0xd9a01e);
      const color2 = new THREE.Color(0x10b981);
      const tmpColor = new THREE.Color();

      const clock = new THREE.Clock();
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const { mode: m, intensity: inten } = stateRef.current;
        const orderFactor = m === "order" ? 1 : 0;
        // smooth target via lerp stored on globe
        globe._order = globe._order ?? orderFactor;
        globe._order += (orderFactor - globe._order) * 0.03;
        const ord = globe._order;
        const agi = (0.4 + inten * 0.9) * (1 - ord * 0.7);

        globe.rotation.y = t * 0.08;
        globe.rotation.x = Math.sin(t * 0.1) * 0.08;
        inner.rotation.y = -t * 0.05;

        // particle agitation
        const pos = particles.geometry.attributes.position.array;
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3;
          const wobble = Math.sin(t * 1.5 + i) * 0.06 * agi;
          pos[ix] = basePositions[ix] * (1 + wobble);
          pos[ix + 1] = basePositions[ix + 1] * (1 + wobble);
          pos[ix + 2] = basePositions[ix + 2] * (1 + wobble);
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = t * 0.03;

        // color shift chaos->order
        tmpColor.copy(color1).lerp(color2, ord);
        particles.material.color.copy(tmpColor);
        globe.material.color.copy(color2);

        rings.forEach((ring, idx) => {
          ring.rotation.z = t * (0.1 + idx * 0.05);
          ring.material.opacity = (0.1 + ord * 0.25) - idx * 0.03;
        });

        // mouse parallax
        camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
        camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        if (!mount) return;
        const nw = mount.clientWidth;
        const nh = mount.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);
      globe._cleanup = () => window.removeEventListener("resize", onResize);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      if (mount) mount.removeEventListener("mousemove", onMove);
      if (globe?._cleanup) globe._cleanup();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement?.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className={`relative ${className}`}>
        <div
          className="absolute inset-0 m-auto rounded-full"
          style={{
            width: "60%",
            aspectRatio: "1",
            background:
              mode === "order"
                ? "radial-gradient(circle at 40% 35%, rgba(13,148,136,0.4), rgba(16,185,129,0.12) 45%, transparent 70%)"
                : "radial-gradient(circle at 40% 35%, rgba(217,160,30,0.4), rgba(13,148,136,0.12) 45%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>
    );
  }

  return <div ref={mountRef} className={`${className}`} />;
}