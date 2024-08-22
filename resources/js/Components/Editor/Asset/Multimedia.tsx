const multimediaArr: { type: string; src: string }[] = [
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
]

export const Multimedia = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      {multimediaArr.map((v, i) => (
        <div className="cursor-pointer border border-gray-500 rounded" key={i}>
          {v.type === "img" && <img className="w-32 h-20" src={v.src}/>}
          {v.type === "video" && (
            <video
              className="w-32 h-20"
              src={v.src}
              loop
              // @ts-expect-error -- TODO
              onMouseOver={(e) => e.target.play()}
              // @ts-expect-error -- TODO
              onMouseOut={(e) => e.target.pause()}
            />
          )}
        </div>
      ))}
    </div>
  )
}
