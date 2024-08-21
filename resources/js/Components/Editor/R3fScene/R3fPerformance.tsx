import {DPR_FACTOR} from "@/utils/constants"
import {PerformanceMonitor} from "@react-three/drei"
import {useThree} from "@react-three/fiber"
import {ReactNode} from "react"

export const R3fPerformance = ({ children }: { children: ReactNode }) => {
  const { setDpr } = useThree()

  return (
    <PerformanceMonitor
      onChange={({ factor }) => {
        const newDpr = (0.5 + 1.5 * factor) * DPR_FACTOR
        setDpr(newDpr)
      }}
      onIncline={() => {
        setDpr(2 * DPR_FACTOR)
      }}
      onDecline={() => {
        setDpr(0.5 * DPR_FACTOR)
      }}
      flipflops={3}
      onFallback={() => {
        setDpr(0.5 * DPR_FACTOR)
      }}
    >
      {children}
    </PerformanceMonitor>
  )
}
