import ProductView from "@/views/Auth/Product";
import { ProductType } from "@/types/product.type";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/lib/firebase/init";

const firestore = getFirestore(app);
export default function ProductPage(props: { products: ProductType[] }) {
  const { products } = props;
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const snapshot = await getDocs(collection(firestore, "products"));
  const data = await snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products: data,
    },
    // revalidate: 10
  };
}
