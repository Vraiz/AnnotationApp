'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();

  useEffect(() => {
  var userID = localStorage.getItem('userID');
  if(userID != null) {
      router.push('/annotate')
  }
  }, []);

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
