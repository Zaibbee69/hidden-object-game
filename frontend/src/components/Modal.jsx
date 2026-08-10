import { useEffect } from "react";

export default function Modal() {
  useEffect(() => {
    const modal = document.getElementById("win_modal");

    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  }, []);

  return (
    <dialog id="win_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Congratulations!</h3>
        <p className="py-4">You found all characters!</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
