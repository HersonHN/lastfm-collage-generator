import { StatsForm } from "~/components/StatsForm";

export const meta = () => {
  return [{ title: "LastFM collage generator" }];
};

export default function UserStats() {
  return (
    <div className="page-content">
      <h1 className="title">LastFM collage generator</h1>
      <StatsForm />
    </div>
  );
}
