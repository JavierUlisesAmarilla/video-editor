import {toChunk} from "@/utils/common"
import {BsCollectionPlay} from "react-icons/bs"

const audioArr: { src: string; name: string }[][] = toChunk(
  [
    {
      src: "/storage/audio/epic_entry.mp3",
      name: "Epic Entry",
    },
    {
      src: "/storage/audio/retro_game_over.mp3",
      name: "Retro Game Over",
    },
    {
      src: "/storage/audio/shotgun.mp3",
      name: "Shotgun",
    },
  ],
  2
)

export const Audio = () => {
  return (
    <div className="flex flex-col gap-4">
      {audioArr.map((arr, i1) => (
        <div className="flex gap-4" key={i1}>
          {arr.map((v, i2) => (
            <div
              className="w-32 h-20 border rounded bg-black text-white flex flex-col items-center justify-center gap-1 cursor-pointer relative"
              key={i2}
              // @ts-expect-error -- TODO
              onMouseOver={(e) => e.target.lastChild.play()}
              // @ts-expect-error -- TODO
              onMouseOut={(e) => e.target.lastChild.pause()}
            >
              <div className="pointer-events-none">{v.name}</div>
              <BsCollectionPlay className="text-3xl pointer-events-none"/>
              <audio
                className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none"
                src={v.src}
                loop
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
