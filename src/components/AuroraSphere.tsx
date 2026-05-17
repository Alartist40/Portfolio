import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface AuroraSphereProps {
  scrollSpeedRef: React.MutableRefObject<number>
}

export default function AuroraSphere({ scrollSpeedRef }: AuroraSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    container.appendChild(renderer.domElement)

    // Uniforms
    const uniforms = {
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uScrollSpeed: { value: 0.0 },
      uVortexIntensity: { value: 0.5 },
    }

    // Noise helpers injected into shaders
    const noiseHelpers = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  int octaves = 5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

vec2 karminVortex(vec2 uv, float time, float scrollSpeed) {
  float t = time * 0.3;
  vec2 vortex = vec2(0.0);
  float intensity = uVortexIntensity * smoothstep(0.0, 0.5, scrollSpeed);
  float strength = 0.15 * intensity;
  for (int i = -2; i <= 2; i++) {
    float yOffset = float(i) * 0.25;
    float xOffset = 0.15 * sin(t + float(i) * 1.7);
    vec2 center = vec2(0.5 + xOffset, yOffset);
    vec2 dir = uv - center;
    float dist = length(dir);
    float angle = atan(dir.y, dir.x);
    float rotationSpeed = 3.0 * intensity * (1.0 + scrollSpeed);
    float vortexStrength = strength * exp(-dist * dist * 8.0) * (1.0 + 0.3 * sin(t * 2.0 + float(i)));
    vortex.x += -sin(angle) * vortexStrength * rotationSpeed;
    vortex.y += cos(angle) * vortexStrength * rotationSpeed;
  }
  return vortex;
}

vec3 auroraGradient(float t) {
  vec3 c0 = vec3(0.02, 1.0, 0.65);
  vec3 c1 = vec3(0.23, 0.51, 0.95);
  vec3 c2 = vec3(0.96, 0.62, 0.04);
  vec3 c3 = vec3(0.93, 0.27, 0.60);
  vec3 c4 = vec3(0.55, 0.36, 0.96);
  if (t < 0.25) return mix(c0, c1, t / 0.25);
  else if (t < 0.5) return mix(c1, c2, (t - 0.25) / 0.25);
  else if (t < 0.75) return mix(c2, c3, (t - 0.5) / 0.25);
  else return mix(c3, c4, (t - 0.75) / 0.25);
}
`

    // Material with onBeforeCompile
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      envMapIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })

    material.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
      // Assign uniforms
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uMouse = uniforms.uMouse
      shader.uniforms.uResolution = uniforms.uResolution
      shader.uniforms.uScrollSpeed = uniforms.uScrollSpeed
      shader.uniforms.uVortexIntensity = uniforms.uVortexIntensity

      // Inject uniforms and varyings into vertex shader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uScrollSpeed;
uniform float uVortexIntensity;
varying vec2 vUv;
varying vec3 vPosition;
`
      )

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
vUv = uv;
vPosition = position;
`
      )

      // Inject noise helpers and uniforms into fragment shader
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `#include <common>
${noiseHelpers}
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uScrollSpeed;
uniform float uVortexIntensity;
varying vec2 vUv;
varying vec3 vPosition;
`
      )

      // Replace map_fragment with aurora code
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;
        uv.x *= aspect;
        float time = uTime * 0.2;

        // Three-layer domain-warped FBM
        vec2 q = vec2(fbm(uv + time), fbm(uv + vec2(1.3, 9.2) + time));
        vec2 r = vec2(fbm(uv + 3.0 * q + vec2(1.7, 9.2) + time * 0.5), fbm(uv + 3.0 * q + vec2(8.3, 2.8) + time * 0.5));
        float f = fbm(uv + 3.0 * r);

        // Kármán vortex warping
        vec2 vortex = karminVortex(vUv, uTime, abs(uScrollSpeed));
        float vortexInfluence = length(vortex) * 5.0;
        f += vortexInfluence * 0.3;
        uv += vortex * 0.1;

        // Colorize with aurora gradient
        vec3 color1 = auroraGradient(f);
        vec3 color2 = auroraGradient(f * 0.8 + 0.1);
        vec3 finalColor = mix(color1, color2, r.x);

        // Scroll-responsive highlights
        float scrollHighlight = smoothstep(0.1, 0.8, abs(uScrollSpeed)) * 0.3;
        finalColor += vec3(0.5, 0.7, 1.0) * scrollHighlight * snoise(uv * 3.0 + time);

        // Traveling specular highlight from mouse
        vec2 lightPos = uMouse * 2.0 - 1.0;
        float highlight = pow(max(dot(normalize(vPosition - vec3(lightPos * 2.0, 3.0)), normal), 0.0), 30.0);
        finalColor += vec3(0.9, 0.95, 1.0) * highlight * 0.8;

        // Swirling brightness
        float brightness = 0.8 + 0.2 * sin(time + f * 10.0);
        finalColor *= brightness;

        diffuseColor.rgb = finalColor;
`
      )
    }

    // Sphere geometry and mesh
    const geometry = new THREE.SphereGeometry(2.5, 64, 64)
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Mouse tracking
    const mouseTarget = { x: 0.5, y: 0.5 }
    const mouseSmooth = { x: 0.5, y: 0.5 }

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.x = e.clientX / window.innerWidth
      mouseTarget.y = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Animation loop
    const clock = new THREE.Clock()
    let animFrameId: number

    const animate = () => {
      animFrameId = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()
      uniforms.uTime.value = elapsed

      // Smooth mouse
      mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * 0.08
      mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * 0.08
      uniforms.uMouse.value.set(mouseSmooth.x, mouseSmooth.y)

      // Scroll speed from ref
      uniforms.uScrollSpeed.value +=
        (scrollSpeedRef.current - uniforms.uScrollSpeed.value) * 0.05

      // Vortex intensity
      const targetIntensity =
        Math.abs(uniforms.uScrollSpeed.value) > 0.3 ? 1.2 : 0.5
      uniforms.uVortexIntensity.value +=
        (targetIntensity - uniforms.uVortexIntensity.value) * 0.03

      // Sphere rotation
      if (!prefersReducedMotion) {
        sphere.rotation.y = elapsed * 0.05
        sphere.rotation.x = Math.sin(elapsed * 0.02) * 0.1
      } else {
        sphere.rotation.y = elapsed * 0.005
        sphere.rotation.x = Math.sin(elapsed * 0.002) * 0.01
      }

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [scrollSpeedRef])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
