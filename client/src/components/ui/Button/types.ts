export type ButtonVariant = "default" | "success";
export type ButtonSize = "small" | "medium" | "large" | "xl" | "xxl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	active?: boolean;
	variant?: ButtonVariant;
	size?: ButtonSize;
}
