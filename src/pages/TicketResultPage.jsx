import { SectionResultLeft } from "../components/ticket-result/SectionResultLeft";
import { SectionResultRight } from "../components/ticket-result/SectionResultRight";

export const TicketResultPage = () => {
  return (
    <>
      <main className="flex flex-col lg:flex-row">
        <SectionResultLeft />
        <SectionResultRight />
      </main>
    </>
  );
};
