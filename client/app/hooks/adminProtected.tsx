import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface AdminProtectedProps {
    children: React.ReactNode;
}

export default function AdminProtected({ children }: AdminProtectedProps) {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        } else if (user.role !== 'admin') {
            router.push('/');
        }
    }, [user, router]);

    if (!user || user.role !== 'admin') {
        return null; // or a loading spinner
    }

    return <>{children}</>;
}
