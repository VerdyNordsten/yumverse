import { AppLayout } from "../layout"

export default function RecipesLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <AppLayout>{children}</AppLayout>
}