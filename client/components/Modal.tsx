import { XCircleIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";
function Modal({
  children,
  setModal,
  title,
}: {
  children: React.ReactNode;
  setModal: Dispatch<SetStateAction<boolean>>;
  title: string;
}) {
  return (
    <div className="modal">
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <abbr title="close">
          <XCircleIcon
            onClick={() => setModal(false)}
            className="modal__closeIcon"
          />
        </abbr>
        {children}
      </div>
    </div>
  );
}

export default Modal;
