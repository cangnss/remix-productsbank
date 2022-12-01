import { Product } from "@prisma/client";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = {
  productItems: Array<Product>;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    productItems: await db.product.findMany(),
  };

  return json(data);
};

export const action: ActionFunction = async () => {
  return json(null)
}

export default function ProductIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      product index
      {data.productItems.map((product) => {
        return (
          <div key={product.id} className="flex flex-row">
            <div className="p-3">
              <p>
                {product.productName} {product.productVendor}
              </p>
            </div>
            <div>
              <Link to={`${product.id}`}>
                <button className="bg-slate-600 w-24 p-2 text-white font-semibold rounded-lg">
                  Detail
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
