import Image from "next/image";
import Link from "next/link";

type Props = {
  hideLabel?: boolean;
};

const Logo = ({ hideLabel }: Props) => {
  return (
    <Link href="/" className="text-neutral-50 flex items-center gap-2">
      <Image width={28} height={28} src="/feet-amber.png" alt="Logo" />
      {!hideLabel && <span className="font-bold text-xl">Thiara</span>}
    </Link>
  );
};

export default Logo;
