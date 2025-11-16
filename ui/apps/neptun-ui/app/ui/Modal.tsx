import { useLayoutEffect, useRef } from 'react';

export const Modal = ({
  open,
  onClosed,
}: {
  open: boolean;
  onClosed: () => void;
}) => {
  const modal = useRef<HTMLDialogElement | null>(null);
  const prevState = useRef(false);

  useLayoutEffect(() => {
    const modalWindow = modal.current;
    if (prevState.current === open || modalWindow === null) return;
    open ? modalWindow.showModal() : modalWindow.close();
    prevState.current = open;
    const onModalClosed = () => {
      prevState.current = false;
      onClosed();
    };
    modalWindow.addEventListener('close', onModalClosed);
    return () => {
      if (modalWindow) {
        modalWindow.removeEventListener('close', onModalClosed);
      }
    };
  }, [onClosed, open]);

  return (
    <dialog id="my_modal_2" className="modal" ref={modal}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Log out</h3>
        <p className="py-4">Are you sure you want to log out?</p>
        <div className="modal-action flex ">
          <form method="dialog" className="flex flex-row gap-2">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary flex-grow">Yes</button>
            <button className="btn flex-grow">No</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
