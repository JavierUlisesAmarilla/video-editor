import {useZustand} from "@/store/useZustand"
import {PageObject} from "@/types"
import axios from "axios"
import {BsCollectionPlay} from "react-icons/bs"
import {toast} from "react-toast"

const audioArr: { src: string; name: string }[] = [
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
]

export const Audio = () => {
  const { selPageId, setPageObject, setSelPageObjectId } = useZustand()

  return (
    <div className="flex flex-wrap gap-2">
      {audioArr.map((v, i) => (
        <div
          className="w-32 h-20 border rounded bg-black text-white flex flex-col items-center justify-center gap-1 cursor-pointer relative border-gray-500"
          key={i}
          // @ts-expect-error -- TODO
          onMouseOver={(e) => e.target.lastChild.play()}
          // @ts-expect-error -- TODO
          onMouseOut={(e) => e.target.lastChild.pause()}
          onClick={async () => {
            if (!selPageId) {
              return
            }
            const newPageObject: PageObject = {
              page_id: selPageId,
              type: "audio",
              url: v.src,
            }
            const res = await axios.post("/savePageObject", newPageObject)
            toast("Audio created.")
            newPageObject.id = res.data.id
            setPageObject(newPageObject)
            setSelPageObjectId(res.data.id)
          }}
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
  )
}
