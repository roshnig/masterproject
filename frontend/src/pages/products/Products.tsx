import usePageMeta from "@/hooks/usePageMeta";
import React from "react";

const Products = () => {
  usePageMeta({ title: "My Org Products" });
  return <div>Products page!</div>;
};

export default Products;
