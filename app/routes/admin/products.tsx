import { Outlet, useLoaderData, Link } from "@remix-run/react";
import type { Product } from "@prisma/client"
import { json, LoaderFunction } from "@remix-run/node"

export default function ProductsRoute(){
    return(
        <div>
            <h1>Products</h1>
            <main>
                <div className="outlet">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}