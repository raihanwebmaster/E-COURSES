
import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import { useSelector } from "react-redux";

interface AdminProtectedProps {
    children: React.ReactNode

}

export default function AdminProtected({children}: AdminProtectedProps) {
   const {user} = useSelector((state: any) => state.auth);
   const isAdmin = user && user.role === 'admin';
    return isAdmin ? children : redirect('/')
}