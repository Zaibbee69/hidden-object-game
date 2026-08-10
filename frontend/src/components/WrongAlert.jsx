import { CircleX } from "lucide-react";
export default function WrongAlert() {
  return (
    <div role="alert" className="alert alert-error">
      <CircleX size={32} color="black" />
      <span>False! Not the correct character.</span>
    </div>
  );
}
