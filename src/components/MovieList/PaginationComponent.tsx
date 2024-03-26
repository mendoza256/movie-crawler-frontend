import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationComponentProps {
  data: any;
  page: string;
}

const PaginationComponent = ({ data, page }: PaginationComponentProps) => {
  const currentPages = Array.from({ length: 3 }).map((_, i) => page + i + 1);

  function handlePreviousPage() {
    if (Number(page) <= 1) return;
    window.location.href = `/?page=${Number(page) - 1}`;
  }

  function handleNextPage() {
    if (Number(page) >= 20) return;
    window.location.href = `/?page=${Number(page) + 1}`;
  }

  return (
    <>
      {data ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handlePreviousPage} />
            </PaginationItem>
            {currentPages.map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className={`${
                    i === parseInt(page) ? "font-black" : "font-normal"
                  }`}
                  href="#"
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </>
  );
};

export default PaginationComponent;
