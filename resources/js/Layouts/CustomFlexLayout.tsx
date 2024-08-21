import * as FlexLayout from "flexlayout-react"
import "flexlayout-react/style/light.css"
import {ReactNode} from "react"

export const CustomFlexLayout = ({
  json,
  components,
  onRenderTab,
}: {
  json: FlexLayout.IJsonModel;
  components: Record<string, ReactNode>;
  onRenderTab?: () => void;
}) => {
  const factory = (node: FlexLayout.TabNode) => {
    const component = node.getComponent() as string
    return components[component]
  }

  return (
    <FlexLayout.Layout
      model={FlexLayout.Model.fromJson(json)}
      factory={factory}
      onRenderTab={onRenderTab}
    />
  )
}
