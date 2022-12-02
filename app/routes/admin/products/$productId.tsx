import { json, LoaderFunction } from "@remix-run/node"
import { PrismaClient, Product } from "@prisma/client"
import { db } from "~/utils/db.server"
import { useLoaderData } from "@remix-run/react"

type LoaderData = { product: Product }

export const loader: LoaderFunction = async ({ params }) => {
    const product = await db.product.findUnique({
        where: { id: params.productId }
    }) 
    console.log(product)
    if(!product) throw new Error("Product not found!")
    const data: LoaderData = { product }
    return json(data)
}

export default function ProductDetail(){
    const data = useLoaderData<LoaderData>();
    
    return(
        <div>
            {data.product?.productName}        
        </div>
    )
}