import ProductView from "@/views/Auth/Product";
import { ProductType } from "@/types/product.type";

const ProductPage = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
};

export default ProductPage;

//ini dipanggil setiap melakukan request (setiap halamanya dibuka)
export async function getServerSideProps() {
  //fetch data
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  return {
    props: {
      products: response.data,
    },
  };
}
