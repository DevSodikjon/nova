export default function Newsletter() {
  return (
    <section className="bg-[#faf8f3] py-14 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">Notes from the studio</p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-black">
            New stories, quietly delivered.
          </h2>

          <p className="mt-4 text-[#6b6b63]">
            Receive collection notes, care advice and private invitations. No noise—only what matters.
          </p>

          <form className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-0 sm:rounded-md sm:border sm:border-black/15 sm:bg-white">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-[#9a9a92] sm:flex-1 sm:rounded-none sm:border-0 sm:py-3.5"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/85 sm:w-auto sm:rounded-none sm:py-3.5 sm:whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}