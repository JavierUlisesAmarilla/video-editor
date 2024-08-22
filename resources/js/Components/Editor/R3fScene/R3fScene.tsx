import {IS_PERFORMANCE_MONITORING} from "@/utils/constants"
import {BakeShadows, Preload} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import {Suspense} from "react"
import {R3fCamera} from "./R3fCamera"
import {R3fControls} from "./R3fControls"
import {R3fLight} from "./R3fLight"
import {R3fPerformance} from "./R3fPerformance"
import {R3fWorld} from "./R3fWorld/R3fWorld"

export const R3fScene = () => {
  return (
    <Suspense>
      <Canvas>
        <R3fCamera/>
        <R3fControls/>
        <R3fLight/>
        {IS_PERFORMANCE_MONITORING ? (
          <R3fPerformance>
            <R3fWorld/>
          </R3fPerformance>
        ) : (
          <R3fWorld/>
        )}
        <BakeShadows/>
        <Preload all/>
      </Canvas>
    </Suspense>
  )
}
