// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";

type Data = {
  data: any;
  statusCode: number;
  status: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.product![1]) {
    const data = await retrieveDataById("products", req.query.product![1]);
    
    if (data === undefined) {
      res.status(404).json({ statusCode: 404, status: false, data: data });
    }

    res.status(200).json({ statusCode: 200, status: true, data: data });

  } else {
    const data = await retrieveData("products");
    res.status(200).json({ statusCode: 200, status: true, data: data });
  }
}

// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   data: {
//     id: number;
//     name: string;
//     price: number;
//     size: string;
//   }[];
//   statusCode: number;
//   status: boolean;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const data = [
//     {
//       id: 1,
//       name: "Baju Baru",
//       price: 100000,
//       size: "xl",
//     },
//     {
//       id: 2,
//       name: "Baju Lama",
//       price: 100000,
//       size: ";",
//     },
//   ];
//   res.status(200).json({ statusCode: 200, status: true, data: data });
// }
