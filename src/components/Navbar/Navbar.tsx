import Link from 'next/link';
import { routes } from '@/router';

const Navbar = () => {
   return (
    <nav>
      <Link href={routes.home}>
        Home
      </Link>
      <Link href={routes.products}>
        Produtos
      </Link>
    </nav>
  );
};

export default Navbar;
