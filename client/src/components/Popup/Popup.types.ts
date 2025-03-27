import { DialogProps } from "../ui/Dialog/Dialog.types";

export interface PopupProps extends Pick<DialogProps, "show" | "onClose"> {
	onSubmit: (values: { alt: number; his: number; adi: number }) => void;
}
