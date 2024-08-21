import {Editor} from "@/Components/Editor/Editor"
import {Experience} from "@/Components/Editor/Experience/Experience"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {useZustand} from "@/store/useZustand"
import {PageProps} from "@/types"
import {Head} from "@inertiajs/react"
import axios from "axios"
import {useEffect} from "react"
import {ToastContainer} from "react-toast"

export default function Dashboard({ auth }: PageProps) {
  const { setPageArr } = useZustand()

  useEffect(() => {
    axios.get("/getPages").then((res) => {
      setPageArr(res.data.pages)
    })
    setTimeout(() => {
      const container = document.getElementById("container")
      if (container) {
        new Experience(container)
      }
    }, 500)
  }, [])

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard"/>
      <Editor/>
      <ToastContainer position="bottom-right" delay={3000}/>
    </AuthenticatedLayout>
  )
}
