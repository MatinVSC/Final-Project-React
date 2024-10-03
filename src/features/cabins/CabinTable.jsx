import styled from "styled-components";
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useFetchCabin } from "../../hooks/useFetchCabin";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function CabinTable() {
  const { isLoading, cabins } = useFetchCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />
  if (!cabins.length) return <Empty resource='Cabins' />

  // filter
  const filterValue = searchParams.get('discount') || 'all';
  let filterCabin;
  if (filterValue === 'all') filterCabin = cabins;
  if (filterValue === 'no-discount') filterCabin = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount') filterCabin = cabins.filter(cabin => cabin.discount > 0);

  // sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filterCabin.sort((a, b) => (a[field] - b[field]) * modifier);


  return (
    <Menus>
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedCabins}
        render={(cabin => (
            <CabinRow key={cabin.id} cabin={cabin} />
        ))}
      />
    </Table>
    </Menus>
  )
}