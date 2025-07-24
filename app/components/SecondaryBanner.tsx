import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
};

const SecondaryBanner = ({ title, subtitle, breadcrumb = [] }: Props) => {
  return (
    <>
      <div className="p-20 bg-black text-white text-center">
        <h2 className="section-title">{title}</h2>
        <span className="section-title--sub !text-gray-300">
          {subtitle}
        </span>{" "}
        <div className="breadcrumbs  mt-4">
          {breadcrumb.map((item, index) => (
            <span key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:underline text-gray-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && " >> "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SecondaryBanner;
