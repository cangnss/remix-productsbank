import { Outlet } from "@remix-run/react";

export default function AdminRoute(){
    return(
        <div>
            <h1>Admin</h1>
            <main>
                <Outlet />
            </main>
        </div>
    )
}