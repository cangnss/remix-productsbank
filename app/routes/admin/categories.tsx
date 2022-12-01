import { Outlet, LoaderFunction, useLoaderData } from "@remix-run/react";
import type { Category } from "@prisma/client";
import { json } from "@remix-run/node";

export default function CategoriesRoute() {
  return (
    <div>
      <h1>Products</h1>
      <main>
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
