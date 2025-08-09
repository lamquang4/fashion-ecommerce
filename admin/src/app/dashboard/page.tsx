import LayoutPage from "../../components/LayoutPage";
import Dashboard from "../../components/Dashboard";

export default async function page() {
  return (
    <LayoutPage>
      <Dashboard />
    </LayoutPage>
  );
}
