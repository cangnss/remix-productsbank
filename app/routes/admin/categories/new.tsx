import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

function validateCategoryName(categoryName: string) {
  if (categoryName.length < 3) {
    return "Category name's must be at least 30 characters.";
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    categoryName: string | undefined;
  };
  fields?: {
    categoryName: string;
  };
};

const badRequest = (data: ActionData) => {
  return json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const categoryName = form.get("categoryName");

  if (typeof categoryName != "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    categoryName: validateCategoryName(categoryName),
  };

  const fields = { categoryName };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }
  
  const category = await db.category.create({ data: fields });
  return redirect("/admin/categories")
};

export default function AddCategory() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="flex justify-center mx-auto flex-col bg-white drop-shadow-lg p-10 w-96">
      <div className="text-center">
        <p className="text-3xl">Add Category</p>
      </div>
      <div className="flex justify-center">
        <Form method="post">
          <div className="flex flex-row p-3 w-100">
            <label
              className="font-semibold my-auto mr-5"
              htmlFor="categoryName"
            >
              Category Name:
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              defaultValue={actionData?.fields?.categoryName}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.categoryName) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.categoryName ? "name-error" : undefined
              }
              className="w-50 p-3 bg-slate-200 rounded-lg"
            />
          </div>
          <div className="flex justify-end my-2 w-100">
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
