import { Outlet, LoaderFunction, useLoaderData } from "@remix-run/react";
import type { Product } from "@prisma/client"
import { json } from "@remix-run/node"
import { db } from "~/utils/db.server"


type LoaderData = {
    productItems: Array<Product>;
}


export const loader: LoaderFunction = async () => {
    
    const data: LoaderData = {
        productItems: await db.product.findMany(),
    };

    return json(data)
}

export default function ProductsRoute(){
    const data = useLoaderData<LoaderData>();

    return(
        <div>
            <h1>Products</h1>
            <main>
                <div>
                    {data.productItems.map((product)=>{
                        return(
                            <div key={product.id}>
                                <p>{product.productName} {product.productVendor} {product.productDescription}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="outlet">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}