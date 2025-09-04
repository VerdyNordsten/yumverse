import { AppLayout } from "../layout"

export default function CategoriesLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <AppLayout>{children}</AppLayout>
}