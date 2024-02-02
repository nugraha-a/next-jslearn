import { fetcher } from "@/lib/swr/fetcher";
import { ProductType } from "@/types/product.type";
import DetailProductView from "@/views/Auth/Product/Detail";
import { useRouter } from "next/router";
import useSWR from "swr";

const DetailProductPage = ({ product }: { product: ProductType }) => {
  // CLIENT SIDE
  // const { query } = useRouter();
  // const { data, error, isLoading } = useSWR(`/api/product/${query.product}`, fetcher);
  return (
    <div>
      {/* CLIENT SIDE */}
      {/* <DetailProductView product={isLoading ? [] : data.data} /> */}
      {/* SERVER SIDE */}
      {<DetailProductView product={product} />}
    </div>
  );
};

// SERVER SIDE
export async function getServerSideProps({
  params,
}: {
  params: { product: string };
}) {
  //fetch data
  const res = await fetch(
    `http://localhost:3000/api/product/${params.product}`
  );

  const response = await res.json();
  return {
    props: {
      product: response.data,
    },
  };
}

// // STATIC SIDE
// export async function getStaticPaths(){
//   const res = await fetch("http://localhost:3000/api/product");
//   const response = await res.json();

//   const paths = response.data.map((product: ProductType) => ({
//     params: {
//       product: product.id,
//     }
//   }));

//   return {paths, fallback: false}
// }

// export async function getStaticProps({
//   params,
// }: {
//   params: { product: string };
// }) {
//   //fetch data
//   const res = await fetch(
//     `http://localhost:3000/api/product/${params.product}`
//   );
//   const response = await res.json();
//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }

export default DetailProductPage;
