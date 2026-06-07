import { navigationLoader } from "@/lib/navigation-loader";
import { useRouter } from "next/router"

export function MyLink({children}) {
    const router = useRouter();
    const handleClick = (link: string) => {
        navigationLoader.show();
        router.push(link);
    }
    return (
        <button onclick={handleClick}>{children}</button>
    )
}