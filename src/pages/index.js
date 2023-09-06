import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-white ${inter.className}`}
    >
    <div>
      <Link href={"/trackerexpence"}>
      <h1 className='font-bold text-[50px] rounded bg-black cursor-pointer'>Expence Tracker</h1>
      </Link>
    </div>
    </main>
  )
}
