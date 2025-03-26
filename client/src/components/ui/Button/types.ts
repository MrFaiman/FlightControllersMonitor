export type ButtonVariant = "default" | "success";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	active?: boolean;
	variant?: ButtonVariant;
}
