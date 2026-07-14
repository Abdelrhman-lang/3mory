import Link from "next/link";

export default function Login() {
  return (
    <div>
      <ul className="flex items-center gap-3 text-primary text-xs">
        <li className="transition-colors duration-300 hover:text-secondary">
          <Link href={"/sign-in"}>Login</Link>
        </li>
        <li>/</li>
        <li className="transition-colors duration-300 hover:text-secondary">
          <Link href={"/sign-up"}>Register</Link>
        </li>
      </ul>
    </div>
  );
}
