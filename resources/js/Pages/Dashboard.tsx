import {Editor} from "@/Components/Editor/Editor"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {useApi} from "@/hooks/useApi"
import {useZustand} from "@/store/useZustand"
import {PageProps} from "@/types"
import {Head} from "@inertiajs/react"
import {useEffect} from "react"
import {ToastContainer} from "react-toast"

export default function Dashboard({ auth }: PageProps) {
  const { setPageArr, setSelPageId, setPageObjectArr } = useZustand()
  const { getAll } = useApi()

  useEffect(() => {
    getAll().then((res) => {
      const pageArr = res.data.pages
      const pageObjectArr = res.data.pageObjects

      if (pageArr.length) {
        setPageArr(pageArr)
        setSelPageId(pageArr[0].id)
      }

      if (pageObjectArr.length) {
        setPageObjectArr(pageObjectArr)
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
