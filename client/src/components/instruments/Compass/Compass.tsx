import React, { useRef, useEffect } from "react";
import { CompassProps, ArrowOptions, MAX_HEADING, MIN_HEADING } from "./Compass.types";
import { Card } from "@components/ui";

const drawArrow = (
	ctx: CanvasRenderingContext2D,
	centerX: number,
	centerY: number,
	radius: number,
	color: string,
	options: ArrowOptions = {}
) => {
	const { rotation = 0, arrowLength = radius - 10, arrowHeadSize = 5, lineWidth = 2 } = options;

	ctx.save();
	ctx.translate(centerX, centerY);
	ctx.rotate(rotation);

	// Draw arrow line
	ctx.beginPath();
	ctx.moveTo(0, -arrowLength);
	ctx.lineTo(0, 0);
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.stroke();

	// Draw arrow head
	ctx.beginPath();
	ctx.moveTo(0, -arrowLength);
	ctx.lineTo(-arrowHeadSize, -arrowLength + arrowHeadSize);
	ctx.lineTo(arrowHeadSize, -arrowLength + arrowHeadSize);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();

	ctx.restore();
};

const Compass: React.FC<CompassProps> = ({
	value,
	displayMode = "visual",
	width = 300,
	height = 300,
	padding = 0,
}) => {
	if (displayMode === "text") {
		return (
			<Card title="HSI" align="center">
				<span style={{ textAlign: "center" }}>{value}</span>
			</Card>
		);
	}

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Center point
		const centerX = width / 2;
		const centerY = height / 2;
		const radius = Math.min(width, height) / 2 - padding;

		// Draw compass circle
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.stroke();

		// Compass text
		ctx.font = "14px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		// Draw degree numbers
		for (let angle = MIN_HEADING; angle <= MAX_HEADING; angle += 90) {
			const radian = (angle * Math.PI) / 180;
			const labelX = centerX + radius * 0.7 * Math.sin(radian);
			const labelY = centerY - radius * 0.7 * Math.cos(radian);

			// Draw degree number
			ctx.fillStyle = "black";
			ctx.fillText(angle.toString(), labelX, labelY);
		}

		// Fixed north arrow
		drawArrow(ctx, centerX, centerY, radius, "red");

		const rotationRadian = ((value % MAX_HEADING) * Math.PI) / 180;
		drawArrow(ctx, centerX, centerY, radius, "orange", { rotation: rotationRadian });

		return () => {
			ctx.clearRect(0, 0, width, height);
		};
	}, [value, width, height, padding]);

	return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Compass;
