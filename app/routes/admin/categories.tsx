import { Outlet, LoaderFunction, useLoaderData } from "@remix-run/react";
import type { Category } from "@prisma/client";
import { json } from "@remix-run/node";
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

export default function CategoriesRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>Products</h1>
      <main>
        <div className="flex justify-center mx-auto flex-row bg-white drop-shadow-lg p-10 w-100">
          {data.categoriesItems.map((category) => {
            return (
              <div className="w-44 p-5 mr-5 font-semibold text-white text-center rounded-lg bg-cyan-600" key={category.id}>
                {category.categoryName}
              </div>
            );
          })}
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
