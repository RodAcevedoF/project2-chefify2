// ModalRoot.tsx
import { Modal } from "./Modal";
import { useModalContext } from "../../../contexts/modalContext/modal.context";
//import { LoginForm } from "./LoginForm";
//import { RegisterForm } from "./RegisterForm";

export const MODALS = {
  login: <div>Login</div>,
  register: <div>Register</div>,
} as const;

export const ModalRoot = () => {
  const { activeModal } = useModalContext();

  if (!activeModal || !(activeModal in MODALS)) return null;

  return <Modal id={activeModal}>{MODALS[activeModal]}</Modal>;
};
