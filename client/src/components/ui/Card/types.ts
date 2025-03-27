export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	children: React.ReactNode;
	align?: "left" | "center" | "right";
}
