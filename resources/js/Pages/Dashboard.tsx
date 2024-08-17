import {Editor} from "@/Components/Editor/Editor"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {PageProps} from "@/types"
import {Head} from "@inertiajs/react"

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard"/>
            <Editor/>
        </AuthenticatedLayout>
    )
}
