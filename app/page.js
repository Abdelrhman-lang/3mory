import { getProducts } from "@/services/products/getProducts";
import BannarSection from "./(components)/home/bannar-sec/BannarSection";
import BlogSection from "./(components)/home/blog-sec/BlogSection";
import CollectionSection from "./(components)/home/collection-sec/CollectionSection";
import FollowusSection from "./(components)/home/followus-sec/FollowusSection";
import Hero from "./(components)/home/hero/Hero";

export default async function Home() {
  const products = await getProducts()
  return (
    <section>
      <main>
        <Hero />
        <CollectionSection products={products} imgSrc={"/imgs/bannar1.webp"} title={"for women's collection"} text={"Contemporary, minimal and modern designs embody the Lavish Alice handwriting"} />
        <BannarSection />
        <CollectionSection products={products} imgSrc={"/imgs/banner3.webp"} title={"for men's collection"} text={"Contemporary, minimal and modern designs embody the Lavish Alice handwriting"} reverse={true} />
        <BlogSection />
        <FollowusSection />
      </main>
    </section>
  );
}
