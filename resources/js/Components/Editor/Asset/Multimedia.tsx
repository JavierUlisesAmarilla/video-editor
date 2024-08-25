import {useApi} from "@/hooks/useApi"
import {IMultimediaInfo} from "@/types"

const multimediaArr: IMultimediaInfo[] = [
  {
    type: "image",
    src: "/storage/image/1.jpg",
  },
  {
    type: "image",
    src: "/storage/image/2.jpg",
  },
  {
    type: "image",
    src: "/storage/image/3.jpg",
  },
  {
    type: "gif",
    src: "/storage/image/1.gif",
  },
  {
    type: "gif",
    src: "/storage/image/2.gif",
  },
  {
    type: "gif",
    src: "/storage/image/3.gif",
  },
  {
    type: "svg",
    src: "/storage/image/1.svg",
  },
  {
    type: "svg",
    src: "/storage/image/2.svg",
  },
  {
    type: "svg",
    src: "/storage/image/3.svg",
  },
  {
    type: "video",
    src: "/storage/video/1.mp4",
  },
  {
    type: "video",
    src: "/storage/video/2.mp4",
  },
  {
    type: "video",
    src: "/storage/video/3.mp4",
  },
]

export const Multimedia = () => {
  const { createNewMultimediaToSelPage } = useApi()

  return (
    <div className="flex gap-2 flex-wrap">
      {multimediaArr.map((v, i) => (
        <div className="cursor-pointer border border-gray-500 rounded" key={i}>
          {["image", "gif", "svg"].indexOf(v.type) > -1 && (
            <img
              className="w-32 h-20"
              src={v.src}
              onClick={() => createNewMultimediaToSelPage(v)}
            />
          )}
          {v.type === "video" && (
            <video
              className="w-32 h-20"
              src={v.src}
              loop
              // @ts-expect-error -- TODO
              onMouseOver={(e) => e.target.play()}
              // @ts-expect-error -- TODO
              onMouseOut={(e) => e.target.pause()}
              onClick={() => createNewMultimediaToSelPage(v)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
