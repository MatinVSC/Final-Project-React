import DashbordLayout from "../features/dashboard/DashboardLayout";
import DashbordFilter from '../features/dashboard/DashboardFilter';
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashbordFilter />
      </Row>
      <DashbordLayout />
    </>
  );
}

export default Dashboard;
