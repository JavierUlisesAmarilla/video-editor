import {CustomFlexLayout} from "@/Layouts/CustomFlexLayout"
import {Slide} from "./Slide"

export const Editor = () => {
  return (
    <CustomFlexLayout
      components={{
        slide: <Slide/>,
        scene: <div>Scene</div>,
        asset: <div>Asset</div>,
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
              weight: 7,
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
              weight: 2,
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
