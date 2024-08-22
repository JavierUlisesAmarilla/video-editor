import {Editor} from "@/Components/Editor/Editor"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {useZustand} from "@/store/useZustand"
import {PageProps} from "@/types"
import {Head} from "@inertiajs/react"
import axios from "axios"
import {useEffect} from "react"
import {ToastContainer} from "react-toast"

export default function Dashboard({ auth }: PageProps) {
  const { setPageArr, setSelPageId } = useZustand()

  useEffect(() => {
    axios.get("/getPages").then((res) => {
      const pageArr = res.data.pages

      if (pageArr.length) {
        setPageArr(pageArr)
        setSelPageId(pageArr[0].id)
      }
    })
  }, [])

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard"/>
      <Editor/>
      <ToastContainer position="bottom-right" delay={3000}/>
    </AuthenticatedLayout>
  )
}
