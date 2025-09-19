import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo1.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logo}
        alt="Logo"
        width={60}
        height={60}
        priority
      />
      <span className="font-bold text-3xl text-[#dbc3d2]">Letterboxd</span>
    </Link>
  );
}
