import {useApi} from "@/hooks/useApi"
import {Item, Menu} from "react-contexify"
import "react-contexify/dist/ReactContexify.css"
import {BiDuplicate} from "react-icons/bi"
import {BsTrash} from "react-icons/bs"

export const CONTEXIFY_ID = "contexify"

export const Contexify = () => {
  const {
    deleteSelPageObjectCond,
    deleteSelPageObject,
    duplicateSelPageObjectToNextPageCond,
    duplicateSelPageObjectToNextPage,
  } = useApi()

  return (
    <Menu id={CONTEXIFY_ID}>
      <Item disabled={!deleteSelPageObjectCond()} onClick={deleteSelPageObject}>
        <div className="flex gap-1 items-center">
          <BsTrash className="text-base"/>
          <div>Remove object</div>
        </div>
      </Item>
      <Item disabled={!duplicateSelPageObjectToNextPageCond()} onClick={duplicateSelPageObjectToNextPage}>
        <div className="flex gap-1 items-center">
          <BiDuplicate className="text-base"/>
          <div>Duplicate to next page</div>
        </div>
      </Item>
    </Menu>
  )
}
