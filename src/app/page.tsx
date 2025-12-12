import Button from "@/components/button";

export default function Home() {
  return (
    <div className="flex flex-col  h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
      <div className="w-full h-[50vh] flex flex-col items-start justify-start">
        <textarea
          name="text"
          id="text"
          className="w-full h-[50vh] border-2 border-gray-300 rounded-md p-2"
        ></textarea>
        <Button
          type="button"
          label="Summarize"
          className="max-w-[300px]! w-full mt-10"
        />
      </div>
    </div>
  );
}
