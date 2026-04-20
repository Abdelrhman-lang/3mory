import Image from "next/image";
import SubHeader from "./(components)/sub-header/SubHeader";
import Header from "./(components)/header/Header";
import Hero from "./(components)/hero/Hero";
import CollectionSection from "./(components)/collection-sec/CollectionSection";
import BannarSection from "./(components)/bannar-sec/BannarSection";
import BlogSection from "./(components)/blog-sec/BlogSection";
import FollowusSection from "./(components)/followus-sec/FollowusSection";

export default function Home() {
  return (
    <section>
      <main>
        <Hero />
        <CollectionSection imgSrc={"/imgs/bannar1.webp"} title={"for women's collection"} text={"Contemporary, minimal and modern designs embody the Lavish Alice handwriting"} />
        <BannarSection />
        <CollectionSection imgSrc={"/imgs/banner3.webp"} title={"for men's collection"} text={"Contemporary, minimal and modern designs embody the Lavish Alice handwriting"} reverse={true} />
        <BlogSection />
        <FollowusSection />
      </main>
    </section>
  );
}
