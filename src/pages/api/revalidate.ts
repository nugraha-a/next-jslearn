// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.query.token !== process.env.REVALIDATE_TOKEN) {
      return res
        .status(401)
        .json({ revalidated: false, message: "Insert Correct Token" });
    }

    if (req.query.data === "product") {
      await res.revalidate("/product/static");
      return res.status(200).json({ revalidated: true });
    }

    return res.json({
      revalidated: false,
      message: "Pilih Data Yang Akan Di Revalidate",
    });
  } catch (error) {
    if (error instanceof Error) {
        return res.status(500).send({ revalidated: false, message: error.message });
    }
    return res.status(500).send({ revalidated: false, message: 'Unknown Error' });
  }
}
