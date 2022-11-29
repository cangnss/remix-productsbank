export default function NewJokeRoute() {
  return (
    <div className="flex justify-center flex-colbg-white drop-shadow-lg">
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div className="p-3 w-100">
          <label className="font-semibold">
            Name: <input type="text" name="name" className="w-50 p-3 bg-slate-200 rounded-lg" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="w-50 bg-cyan-700 p-5">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
