import Image from "next/image";
import ProductCategories from "./components/ProductCategories";
import ProductList from "./components/ProductList";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {" "}
      <div className=" py-40 px-4 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full items-center">
          {/* Left Side – Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left text-text">
            <h1 className="font-raleway font-semibold text-5xl">
              Juillet Studio
            </h1>
            <p className="text-base mt-6 mb-10 max-w-md text-text-light text-lg leading-7">
              Explore our cozy crochet and charming handmade jewellery — crafted
              with heart, just for you.
            </p>

            <Link href="/categories/all">
              <button className="bg-black text-white px-6 py-3">
                Explore Categories
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/crochet-1.jpg"
              alt="Crochet 1"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/earrings-1.jpg"
              alt="Jewellery 1"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/necklace-1.jpg"
              alt="Crochet 2"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/sunflower.jpg"
              alt="Jewellery 2"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <ProductCategories />
      <ProductList />
    </>
  );
}
