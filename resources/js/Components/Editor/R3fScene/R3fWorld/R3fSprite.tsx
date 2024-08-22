/* eslint-disable react/no-unknown-property */
import {Html} from "@react-three/drei"
import {Vector3} from "@react-three/fiber"
import {ReactNode} from "react"

export type R3fSpriteType = {
  children: ReactNode;
  position?: Vector3;
  onClick?: VoidFunction;
};

export const R3fSprite = ({ children, position, onClick }: R3fSpriteType) => {
  const onSpriteClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <group position={position}>
      <Html
        transform
        zIndexRange={[0, 0]}
        sprite={true}
        // occlude='raycast'
      >
        <div onClick={onSpriteClick}>{children}</div>
      </Html>
    </group>
  )
}
