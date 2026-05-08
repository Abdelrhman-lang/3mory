import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function BreadcrumbBasic({ page = "type your page name" }) {
    return (

        <Breadcrumb className={"pt-10"}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className={"text-sm"}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage className={"text-sm text-primary"}>{page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>


    )
}
