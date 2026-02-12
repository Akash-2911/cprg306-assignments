import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>

      <Link href="/week-2">
        Go to Week 2
      </Link>
      <br></br>
      <Link href="/week-3">
        Go to Week 3
      </Link>
      <br></br>
      <Link href="/week-4">
        Go to Week 4
      </Link>
      <br></br>
      <Link href="/week-5">
        Go to Week 5
      </Link>
    </div>
  );
}
