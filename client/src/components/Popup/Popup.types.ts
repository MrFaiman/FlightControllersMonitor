import { DialogProps } from "../ui/Dialog/Dialog.types";

export interface PopupProps extends Pick<DialogProps, "show" | "close"> {}
