import {CustomFlexLayout} from "@/Layouts/CustomFlexLayout"
import {Asset} from "./Asset/Asset"
import {Scene} from "./Scene"
import {Slide} from "./Slide"

export const Editor = () => {
  return (
    <CustomFlexLayout
      components={{
        slide: <Slide/>,
        scene: <Scene/>,
        asset: <Asset/>,
        timeline: <div>Timeline</div>,
      }}
      json={{
        global: {
          tabEnableClose: false,
          tabEnableRename: false,
          tabSetEnableMaximize: false,
        },
        borders: [
          {
            type: "border",
            location: "bottom",
            size: 250,
            children: [
              {
                type: "tab",
                name: "Timeline",
                component: "timeline",
              },
            ],
          },
        ],
        layout: {
          type: "row",
          children: [
            {
              type: "tabset",
              weight: 1,
              children: [
                {
                  type: "tab",
                  name: "Slide",
                  component: "slide",
                },
              ],
            },
            {
              type: "tabset",
              weight: 8,
              children: [
                {
                  type: "tab",
                  name: "Scene",
                  component: "scene",
                },
              ],
            },
            {
              type: "tabset",
              weight: 3,
              children: [
                {
                  type: "tab",
                  name: "Asset",
                  component: "asset",
                },
              ],
            },
          ],
        },
      }}
    />
  )
}
