import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main>
      <div id="home_main">
        <Link href="/quiz">
        <button id="Start Button" type="button">Start</button>
        </Link>
      </div>
      
    </main>
  );
}
