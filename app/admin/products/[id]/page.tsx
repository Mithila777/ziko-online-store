"use client";

import { useParams } from "next/navigation";
import ProductForm from "../ProductForm";

export default function UpdateProductPage() {
  const { id } = useParams();
  return <ProductForm productId={id as string} />;
}
