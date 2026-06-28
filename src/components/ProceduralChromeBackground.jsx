// src/components/ProceduralChromeBackground.jsx
import React, { useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * @param {{
 *   variant?: 'default' | 'crimson-iridescent';
 *   intensity?: number;
 * }} props
 */
export default function ProceduralChromeBackground({
  variant = 'default',
  intensity = 1.0,
}) {
  const { size, clock } = useThree();
  const isCrimson = variant === 'crimson-iridescent';

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uTime: { value: 0 },
      uCrimsonMix: { value: isCrimson ? 1.0 : 0.0 },
      uCrimsonIntensity: { value: isCrimson ? intensity : 0.0 },
    }),
    [isCrimson, intensity],
  );

  useFrame(() => {
    uniforms.uResolution.value.set(size.width, size.height);
    if (isCrimson) {
      uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uCrimsonMix;
        uniform float uCrimsonIntensity;

        mat2 rot(float a) {
          float c = cos(a), s = sin(a);
          return mat2(c, -s, s, c);
        }

        float hash(vec2 p) {
          p = fract(p * vec2(127.1, 311.7));
          return fract(sin(dot(p, vec2(92.7, 549.3))) * 43758.5453123);
        }

        float noise(in vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          float n = mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                        mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
          return n * 2.0 - 1.0;
        }

        float liquidSilkTopology(vec2 p) {
          float value = 0.0;
          float amp = 0.75;
          float freq = 0.95;
          float t = uTime * 0.14 * uCrimsonMix;

          for (int i = 0; i < 3; i++) {
            p *= rot(0.95 + t * 0.05);
            float warpFactor = 1.35;
            p += vec2(sin(p.y * 1.1 + 0.5 + t), cos(p.x * 0.75 - 0.45 - t * 0.7)) * warpFactor;

            float layerNoise = noise(p * freq);

            if (i == 2) {
              layerNoise = 1.0 - abs(layerNoise);
              layerNoise = smoothstep(0.2, 0.8, layerNoise);
            } else {
              layerNoise = smoothstep(-0.6, 0.6, layerNoise);
              layerNoise = pow(abs(layerNoise), 1.4) * sign(layerNoise);
            }

            value += layerNoise * amp;
            freq *= 1.5;
            amp *= 0.48;
          }
          return value;
        }

        vec3 iridescentCrimson(float phase) {
          vec3 crimson = vec3(0.95, 0.12, 0.22);
          vec3 rose     = vec3(1.00, 0.38, 0.48);
          vec3 silver   = vec3(0.72, 0.76, 0.82);
          vec3 deepRed  = vec3(0.55, 0.04, 0.10);
          float w = 0.5 + 0.5 * sin(phase);
          vec3 a = mix(crimson, rose, w);
          vec3 b = mix(silver, deepRed, 1.0 - w);
          return mix(a, b, 0.5 + 0.5 * cos(phase * 1.7));
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= uResolution.x / uResolution.y;

          vec2 distortedUV = uv;
          distortedUV.y *= 0.85;
          distortedUV.x *= 1.15;

          float topologyScale = 0.55;

          vec2 epsX = vec2(0.0018, 0.0);
          vec2 epsY = vec2(0.0, 0.0018);

          float topo = liquidSilkTopology(distortedUV.yx * topologyScale);
          float gradX = liquidSilkTopology((distortedUV.yx + epsX) * topologyScale) - liquidSilkTopology((distortedUV.yx - epsX) * topologyScale);
          float gradY = liquidSilkTopology((distortedUV.yx + epsY) * topologyScale) - liquidSilkTopology((distortedUV.yx - epsY) * topologyScale);

          vec3 normal = normalize(vec3(-gradX * 44.0, -gradY * 44.0, 0.006));

          vec3 lightDir1 = normalize(vec3(1.05, 0.75, 0.48));
          vec3 lightDir2 = normalize(vec3(-1.1, -0.6, 0.32));
          vec3 viewDir = vec3(0.0, 0.0, 1.0);

          float spec1 = pow(max(dot(normal, lightDir1), 0.0), 200.0);
          float spec2 = pow(max(dot(normal, lightDir2), 0.0), 130.0);

          vec3 silverSpec = vec3(0.78, 0.82, 0.88);
          vec3 crimsonSpec = vec3(1.0, 0.35, 0.42);
          vec3 roseSpec    = vec3(1.0, 0.55, 0.62);

          vec3 specular = silverSpec * spec1 * 18.0 + silverSpec * spec2 * 8.0;
          specular = mix(specular, mix(crimsonSpec, roseSpec, 0.45 + topo * 0.3) * (spec1 * 20.0 + spec2 * 9.0), uCrimsonMix * 0.85);

          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.6);

          vec3 crimsonTint = vec3(0.92, 0.14, 0.24);
          vec3 roseTint    = vec3(0.98, 0.40, 0.50);
          vec3 darkSilver  = vec3(0.18, 0.20, 0.24);
          vec3 deepCrimson = vec3(0.12, 0.02, 0.04);

          float iridPhase = topo * 0.65 + fresnel * 0.9 + uTime * 0.07;
          vec3 iridescent = iridescentCrimson(iridPhase);

          vec3 rim = mix(
            vec3(0.88, 0.92, 0.96) * fresnel * 0.42,
            (iridescent * 0.55 + roseTint * 0.25) * fresnel * 0.75,
            uCrimsonMix
          );

          vec3 base = mix(vec3(0.0, 0.0, 0.002), deepCrimson + darkSilver * 0.15, uCrimsonMix * 0.7);
          base += mix(vec3(0.0), crimsonTint * 0.12 + roseTint * 0.06, abs(topo) * uCrimsonMix);

          vec3 color = base + specular + rim;
          color += iridescent * abs(topo) * 0.18 * uCrimsonMix * uCrimsonIntensity;
          color += crimsonTint * smoothstep(0.3, 0.9, abs(topo)) * 0.06 * uCrimsonMix * uCrimsonIntensity;

          color = smoothstep(0.10, 0.78, color);
          color = pow(color, vec3(1.05));

          gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
    });
  }, [uniforms]);

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}