import EditBlog from "@/components/EditBlog";
import LayoutPage from "@/components/LayoutPage";

export default async function page() {
  return (
    <LayoutPage>
      <EditBlog />
    </LayoutPage>
  );
}
