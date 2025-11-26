import usePageMeta from "@/hooks/usePageMeta";

const Sales = () => {
  usePageMeta({ title: "My Org Sales", description: "My Org Sales" });
  return <div>Sales page!</div>;
};

export default Sales;
