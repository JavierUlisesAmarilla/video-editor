import {Editor} from "@/Components/Editor/Editor"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {PageProps} from "@/types"
import {Head} from "@inertiajs/react"
import {useEffect} from "react"

export default function Dashboard({ auth }: PageProps) {
  useEffect(() => {
    console.log("test: Dashboard")
  }, [])

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard"/>
      <Editor/>
    </AuthenticatedLayout>
  )
}
