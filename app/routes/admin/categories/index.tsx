import { Category } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { BiCategory } from "react-icons/bi"

type LoaderData = {
  categoriesItems: Array<Category>;
};


export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
      categoriesItems: await db.category.findMany(),
    };
  
    return json(data);
  };

export default function CategoryIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex flex-wrap justify-center mx-auto flex-row bg-white drop-shadow-lg p-10 w-100">
        {data.categoriesItems.map((category) => {
          return (
            <div
              className="columns-3 mb-5 w-56 flex flex-col p-5 mr-5 font-semibold text-white text-center rounded-lg bg-cyan-600"
              key={category.id}
            >
              <div className="text-center mx-auto">
                <BiCategory className="text-3xl" />
              </div>
              <Link to={`/admin/categories/${category.id}`}>
                {category.categoryName}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
