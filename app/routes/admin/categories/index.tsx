import { Category } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

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
      <div className="flex justify-center mx-auto flex-row bg-white drop-shadow-lg p-10 w-100">
        {data.categoriesItems.map((category) => {
          return (
            <div
              className="w-44 p-5 mr-5 font-semibold text-white text-center rounded-lg bg-cyan-600"
              key={category.id}
            >
              {category.categoryName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
