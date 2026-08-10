import { SearchCheck } from "lucide-react";

export default function CorrectAlert() {
  return (
    <div role="alert" className="alert alert-success">
      <SearchCheck size={32} color="black" />

      <span>Character Found!</span>
    </div>
  );
}
