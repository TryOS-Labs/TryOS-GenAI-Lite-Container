import { ReactNode } from "react";
import ReactDOM from "react-dom";

type Props = {
    children: ReactNode;
    isOpen: boolean;
};

function Modal({ children, isOpen }: Props) {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-[#151b25] bg-opacity-50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-[#151b25]  p-4 shadow-lg text-white border-4 border-[#1F2937] relative">
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;
