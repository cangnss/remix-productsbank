import { Category } from "@prisma/client"
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { LoaderFunction } from "@remix-run/server-runtime"
import { db } from "~/utils/db.server"

type LoaderData = { category: Category }


export const loader: LoaderFunction = async ({ params }) => {
    const category = await db.category.findUnique({ where: { id: params.categoryId }})
    
    if(!category) throw new Error("Category not found!")
    const data: LoaderData = { category }
    return json(data)
}


export default function CategoryDetail(){
    const data = useLoaderData<LoaderData>();
    let i = 0;
    return(
        <div className="w-100 flex justify-center">
            <div className="flex flex-row text-center text-white justify-between w-80 bg-blue-400 rounded-lg drop-shadow-lg">
                <div className="p-5">
                    {++i}
                </div>
                <div className="p-5">
                    {data?.category.id}
                </div>
                <div className="p-10">
                    {data?.category?.categoryName}
                </div>
                <div className="flex justify-center my-auto">
                    <Link to={`/admin/products/asd`}>
                        <button className="w-20 bg-white text-semibold text-black rounded-lg">Product detail</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}