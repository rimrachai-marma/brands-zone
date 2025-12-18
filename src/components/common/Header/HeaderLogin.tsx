import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeaderLogin = () => {
  return (
    <div className="text-sm sm:text-base">
      <Button asChild variant="link" className="p-0">
        <Link href="/user-login">Login</Link>
      </Button>
    </div>
  );
};

export default HeaderLogin;
