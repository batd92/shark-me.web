export type Coordinates = {
    x: number;
    y: number;
};

export class Canvas {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;

    constructor(canvasElement: HTMLCanvasElement) {
        this.canvas = canvasElement;
        this.context = this.canvas.getContext('2d', {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;
    }

    public listenMovements(listener: any): void {
        this.canvas.addEventListener('touchmove', listener);
        this.canvas.addEventListener('pointermove', listener);
    }

    public cleanUp(listener: any): void {
        this.canvas.removeEventListener('touchmove', listener);
        this.canvas.removeEventListener('pointermove', listener);
    }

    public drawImage(img: HTMLImageElement): void {
        this.context.drawImage(img, 0, 0);
    }

    public setDimensions(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    public getDimensions() {
        return {
            width: this.canvas.width,
            height: this.canvas.height,
        };
    }

    public getCanvasCenterPoint(): Coordinates {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
        };
    }

    public getCanvasCoordinates(coordinates: Coordinates): Coordinates {
        const rect = this.canvas.getBoundingClientRect();
        const x = coordinates.x - rect.left;
        const y = coordinates.y - rect.top;
        return { x, y };
    }

    public getPixelColor(coordinates: Coordinates): string {
        const pixelData = this.context.getImageData(coordinates.x, coordinates.y, 1, 1).data;
        if (pixelData.length < 4) return 'rgb(0,0,0)';
        const [red, green, blue] = pixelData;
        return `rgb(${red}, ${green}, ${blue})`;
    }

    public drawPoint(coordinates: Coordinates, color: string = 'red', size: number = 5): void {
        const { x, y } = this.getCanvasCoordinates(coordinates);

        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
    }
}
