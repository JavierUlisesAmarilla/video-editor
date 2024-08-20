import {toChunk} from "@/utils/common"

const multimediaArr: { type: string; src: string }[][] = toChunk(
  [
    {
      type: "img",
      src: "/storage/image/1.jpg",
    },
    {
      type: "img",
      src: "/storage/image/2.jpg",
    },
    {
      type: "img",
      src: "/storage/image/3.jpg",
    },
    {
      type: "img",
      src: "/storage/image/1.gif",
    },
    {
      type: "img",
      src: "/storage/image/2.gif",
    },
    {
      type: "img",
      src: "/storage/image/3.gif",
    },
    {
      type: "img",
      src: "/storage/image/1.svg",
    },
    {
      type: "img",
      src: "/storage/image/2.svg",
    },
    {
      type: "img",
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
  ],
  2
)

export const Multimedia = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {multimediaArr.map((arr, i1) => (
        <div className="flex gap-4" key={i1}>
          {arr.map((v, i2) => (
            <div key={i2}>
              {v.type === "img" && <img className="w-32 h-20" src={v.src}/>}
              {v.type === "video" && (
                <video className="w-32 h-20" src={v.src} autoPlay loop/>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
