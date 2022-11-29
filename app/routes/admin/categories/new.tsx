export default function AddCategory() {
    return (
      <div className="flex justify-center mx-auto flex-col bg-white drop-shadow-lg p-10 w-96">
        <div className="text-center">
          <p className="text-3xl">Add Category</p>
        </div>
        <div className="flex justify-center">
          <form method="post">
            <div className="flex flex-row p-3 w-100">
              <label className="font-semibold my-auto mr-5" htmlFor="categoryName">
                Category Name:
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
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
          </form>
        </div>
      </div>
    );
  }
  