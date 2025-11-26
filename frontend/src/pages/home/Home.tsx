import usePageMeta from "@/hooks/usePageMeta";

const Home = () => {
  usePageMeta({ title: "My Org home", description: "My Org home" });
  return <div>Hello from home</div>;
};

export default Home;
