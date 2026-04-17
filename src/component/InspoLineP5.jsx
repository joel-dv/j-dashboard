import { useEffect, useRef } from 'react'

export default function InspoLineP5() {
  const containerRef = useRef(null)
  const sketchRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    async function setupSketch() {
      const { default: p5 } = await import('p5')

      if (!isMounted || !containerRef.current) {
        return
      }

      const sketch = (p) => {
        let width = 0
        let height = 0

        function updateSize() {
          if (!containerRef.current) {
            return
          }

          width = containerRef.current.clientWidth
          height = containerRef.current.clientHeight
          p.resizeCanvas(width, height)
        }

        function drawLineField(time, scaleMultiplier, alpha) {
          const centerX = width * 0.5
          const centerY = height * 0.5
          const ringCount = 36
          const samples = 220
          const maxRadius = Math.min(width, height) * 0.30 * scaleMultiplier

          p.noFill()
          p.stroke(255, 255, 255, alpha)

          for (let ring = 0; ring < ringCount; ring += 1) {
            const ringProgress = ring / (ringCount - 1)
            const baseRadius = maxRadius * ringProgress
            const wobble = 10 + ringProgress * 26

            p.beginShape()

            // Give curveVertex extra points before and after the loop so the
            // circular seam closes smoothly instead of showing a right-edge join.
            for (let step = 0; step <= samples + 2; step +=1) {
              const angle = (step / samples) * p.TWO_PI
              const swirl =
                Math.sin(angle * 6 + time * 0.9 + ringProgress * 8) * wobble
              const breathing =
                Math.cos(angle * 13 - time * 0.45 + ringProgress * 12) *
                (6 + ringProgress * 16)

              const radius = baseRadius + swirl + breathing
              const x = centerX + Math.cos(angle) * radius
              const y = centerY + Math.sin(angle) * radius

              p.curveVertex(x, y)
            }

            p.endShape()
          }
        }

        p.setup = () => {
          width = containerRef.current?.clientWidth ?? window.innerWidth
          height = containerRef.current?.clientHeight ?? window.innerHeight

          const canvas = p.createCanvas(width, height)
          canvas.parent(containerRef.current)
          p.pixelDensity(1)
          p.noiseDetail(2, 0.5)
        }

        p.draw = () => {
          const time = p.millis() * 0.001

          p.background(6, 6, 10)
          drawLineField(time, 1, 48)
          drawLineField(time + 1.7, 0.86, 22)

          p.noStroke()
          for (let i = 0; i < 6; i += 1) {
            const glowRadius = Math.min(width, height) * (0.12 + i * 0.045)
            const glowAlpha = 8 - i

            p.fill(255, 255, 255, glowAlpha)
            p.circle(width * 0.5, height * 0.5, glowRadius * 2)
          }
        }

        p.windowResized = () => {
          updateSize()
        }
      }

      sketchRef.current = new p5(sketch)
    }

    setupSketch()

    return () => {
      isMounted = false

      if (sketchRef.current) {
        sketchRef.current.remove()
        sketchRef.current = null
      }
    }
  }, [])

  return <div ref={containerRef} className="inspo-canvas" />
}
