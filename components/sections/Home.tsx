import AnimatedButton from "../ui/AnimatedButton";

export default function Home() {
  return (
    <div className="h-screen bg-black text-white">
      <main className="h-full flex flex-col justify-center items-center text-center gap-10 px-4">
        <h1 className="text-6xl md:text-9xl font-bold">Maven Advert</h1>
        <AnimatedButton type="submit">Submit</AnimatedButton>
      </main>
    </div>
  );
}
