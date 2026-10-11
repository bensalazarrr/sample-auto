import Link from "next/link";
import { Wrench } from "lucide-react";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Sample Auto home">
      <span className="brand-mark">
        <Wrench size={22} />
      </span>
      <span>
        SAMPLE<span className="brand-light"> AUTO</span>
        <small>SERVICE. PARTS. PEACE OF MIND.</small>
      </span>
    </Link>
  );
}
