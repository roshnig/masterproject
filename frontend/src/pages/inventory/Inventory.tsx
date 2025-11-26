import usePageMeta from "@/hooks/usePageMeta";

const Inventory = () => {
  usePageMeta({ title: "My Org Inventory", description: "My Org Inventory" });
  return <div>Inventory page!</div>;
};

export default Inventory;
