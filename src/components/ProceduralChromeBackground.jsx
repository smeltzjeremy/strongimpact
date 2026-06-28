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
    uniforms.uTime.value = clock.getElapsedTime();
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
          float t = uTime * 0.14;

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

        vec3 darkMetallicWave(float phase) {
          vec3 bloodRed    = vec3(0.62, 0.04, 0.08);
          vec3 deepCrimson = vec3(0.28, 0.02, 0.05);
          vec3 darkSilver  = vec3(0.22, 0.24, 0.28);
          vec3 voidBlack   = vec3(0.04, 0.01, 0.02);
          float w = 0.5 + 0.5 * sin(phase * 0.9);
          return mix(mix(deepCrimson, bloodRed, w), mix(darkSilver, voidBlack, 1.0 - w), 0.5 + 0.5 * cos(phase * 1.3));
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

          float spec1 = pow(max(dot(normal, lightDir1), 0.0), 260.0);
          float spec2 = pow(max(dot(normal, lightDir2), 0.0), 180.0);

          vec3 darkSilverSpec = vec3(0.55, 0.58, 0.64);
          vec3 bloodSpec      = vec3(0.75, 0.08, 0.12);
          vec3 steelGlint     = vec3(0.68, 0.71, 0.76);

          vec3 specular = steelGlint * spec1 * 20.0 + darkSilverSpec * spec2 * 9.0;
          specular = mix(specular, mix(bloodSpec, darkSilverSpec, 0.35 + topo * 0.2) * (spec1 * 22.0 + spec2 * 8.0), uCrimsonMix * 0.9);

          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.2);

          vec3 bloodRed    = vec3(0.55, 0.05, 0.09);
          vec3 deepCrimson = vec3(0.14, 0.01, 0.03);
          vec3 darkSilver  = vec3(0.14, 0.16, 0.19);
          vec3 voidBlack   = vec3(0.02, 0.005, 0.01);

          float wavePhase = topo * 0.5 + fresnel * 0.45 + uTime * 0.05;
          vec3 darkWave = darkMetallicWave(wavePhase);

          vec3 rim = mix(
            darkSilverSpec * fresnel * 0.28,
            (darkWave * 0.35 + bloodRed * 0.15) * fresnel * 0.38,
            uCrimsonMix
          );

          vec3 base = mix(vec3(0.0), voidBlack + deepCrimson * 0.75 + darkSilver * 0.1, uCrimsonMix);
          base += mix(vec3(0.0), bloodRed * 0.04 + deepCrimson * 0.05, abs(topo) * 0.5 * uCrimsonMix);

          vec3 color = base + specular + rim;
          color += darkWave * abs(topo) * 0.05 * uCrimsonMix * uCrimsonIntensity;
          color += bloodRed * smoothstep(0.35, 0.95, abs(topo)) * 0.025 * uCrimsonMix * uCrimsonIntensity;

          color = smoothstep(0.08, 0.66, color);
          color = pow(color, vec3(1.08));

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