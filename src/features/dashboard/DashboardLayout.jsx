import styled from "styled-components";
import { useRecentBookings } from "../../hooks/useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "../../hooks/useRecentStays";
import Stats from "./Stats";
import { useFetchCabin } from '../../hooks/useFetchCabin'
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashbordLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const { confirmedStays, isLoading: loadingStay, numDays } = useRecentStays();
  const { cabins, isLOading: loadingCabins } = useFetchCabin();

  if (isLoading || loadingStay || loadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart
        bookings={bookings}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}