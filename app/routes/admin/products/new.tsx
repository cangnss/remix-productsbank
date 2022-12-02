import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

function validateProductName(productName: string) {
  if (productName.length < 3) {
    return "Product's name must be at least 3 characters";
  }
}

function validateProductVendor(productVendor: string) {
  if (productVendor.length < 5) {
    return "Product's vendor name must be at least 5 characters.";
  }
}

function validateProductDescription(productDescription: string) {
  if (productDescription.length > 300) {
    return "Product's description must be at most 300 characters.";
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    productName: string | undefined;
    productVendor: string | undefined;
    productDescription: string | undefined;
  };
  fields?: {
    productName: string;
    productVendor: string;
    productDescription: string;
  };
};

const badRequest = (data: ActionData) => {
  return json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const productName = form.get("productName");
  const productVendor = form.get("productVendor");
  const productDescription = form.get("description");

  if (
    typeof productName !== "string" ||
    typeof productVendor !== "string" ||
    typeof productDescription !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    productName: validateProductName(productName),
    productVendor: validateProductVendor(productVendor),
    productDescription: validateProductDescription(productDescription),
  };

  const fields = { productName, productVendor, productDescription };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  try {
    const product = await db.product.create({ data: fields });
    return redirect(`admin/products/${product.id}`);
  } catch (error) {
    return json({ error }, { status: 500 });
  }
};

export default function AddProduct() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="flex justify-center mx-auto flex-col bg-white drop-shadow-lg p-10 w-80">
      <div className="text-center">
        <p className="text-3xl">Add Product</p>
      </div>
      <div className="flex justify-center">
        <Form method="post">
          <div className="flex flex-row p-3 w-100">
            <label className="font-semibold my-auto mr-5" htmlFor="productName">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              defaultValue={actionData?.fields?.productName}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.productName) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.productName ? "name-error" : undefined
              }
              className="w-50 p-3 bg-slate-200 rounded-lg"
            />
            {actionData?.fieldErrors?.productName ? (
              <p className="form-validation-error" role="alert" id="name-error">
                {actionData.fieldErrors.productName}
              </p>
            ) : null}
          </div>
          <div className="flex flex-row p-3 w-100">
            <label
              className="font-semibold my-auto mr-5"
              htmlFor="productVendor"
            >
              Product Vendor:
            </label>
            <input
              type="text"
              id="productVendor"
              name="productVendor"
              defaultValue={actionData?.fields?.productVendor}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.productVendor) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.productVendor
                  ? "content-error"
                  : undefined
              }
              className="w-50 p-3 bg-slate-200 rounded-lg"
            />
            {actionData?.fieldErrors?.productVendor ? (
              <p className="form-validation-error" role="alert" id="name-error">
                {actionData.fieldErrors.productVendor}
              </p>
            ) : null}
          </div>
          <div className="flex flex-row">
            <label htmlFor="description" className="font-semibold my-auto mr-5">
              Description:
            </label>
            <textarea
              id="content"
              name="description"
              defaultValue={actionData?.fields?.productDescription}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.productDescription) ||
                undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.productDescription
                  ? "content-error"
                  : undefined
              }
              className="w-52 p-3 bg-slate-200 rounded-lg"
            />
            {actionData?.fieldErrors?.productDescription ? (
              <p className="form-validation-error" role="alert" id="name-error">
                {actionData.fieldErrors.productDescription}
              </p>
            ) : null}
          </div>
          <div className="flex justify-end my-2 w-100">
            {actionData?.formError ? (
              <p className="form-validation-error" role="alert">
                {actionData.formError}
              </p>
            ) : null}
            <button
              type="submit"
              className="w-24 bg-cyan-700 text-white font-semibold p-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
