import LawsPassed from "@/components/LawsPassed";
export default function PresidentPage({
  params,
}: {
  params: { president: string };
}) {
  return (
    <main>
      <LawsPassed president={decodeURIComponent(params.president)}></LawsPassed>
    </main>
  );
}
