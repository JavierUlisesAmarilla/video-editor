import {toChunk} from "@/utils/common"

const modelArr: { type: string; imageSrc: string; modelSrc: string }[][] =
  toChunk(
    [
      {
        imageSrc: "/storage/model/arrow.png",
      },
      {
        imageSrc: "/storage/model/bathroom.png",
      },
      {
        imageSrc: "/storage/model/boot.png",
      },
      {
        imageSrc: "/storage/model/canon.png",
      },
      {
        imageSrc: "/storage/model/car.png",
      },
      {
        imageSrc: "/storage/model/casual_christ.png",
      },
      {
        imageSrc: "/storage/model/chick.png",
      },
      {
        imageSrc: "/storage/model/coin_race.png",
      },
      {
        imageSrc: "/storage/model/colosseum.png",
      },
      // {
      //   imageSrc: "/storage/model/cottage.png",
      // },
      {
        imageSrc: "/storage/model/crushed_chicken.png",
      },
      {
        imageSrc: "/storage/model/cup.png",
      },
      {
        imageSrc: "/storage/model/hamburger.png",
      },
      {
        imageSrc: "/storage/model/hands.png",
      },
      {
        imageSrc: "/storage/model/helmet.png",
      },
      {
        imageSrc: "/storage/model/hologram.png",
      },
      {
        imageSrc: "/storage/model/hydrant.png",
      },
      {
        imageSrc: "/storage/model/industrial_arm.png",
      },
      {
        imageSrc: "/storage/model/industrial_worker.png",
      },
      {
        imageSrc: "/storage/model/mouth.png",
      },
      {
        imageSrc: "/storage/model/park.png",
      },
      {
        imageSrc: "/storage/model/real_hammer.png",
      },
      {
        imageSrc: "/storage/model/revive.png",
      },
      {
        imageSrc: "/storage/model/teddy.png",
      },
      {
        imageSrc: "/storage/model/tentacles.png",
      },
      {
        imageSrc: "/storage/model/triceratops.png",
      },
      {
        imageSrc: "/storage/model/vest.png",
      },
    ],
    2
  )

export const Model = () => {
  return (
    <div className="flex flex-col gap-2">
      {modelArr.map((arr, i1) => (
        <div className="flex gap-2" key={i1}>
          {arr.map((v, i2) => (
            <img
              className="w-32 h-20 border rounded cursor-pointer border-gray-500"
              key={i2}
              src={v.imageSrc}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
