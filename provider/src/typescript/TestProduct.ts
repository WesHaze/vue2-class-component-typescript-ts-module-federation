class TestProduct {
    protected weight!: number;
    protected width!: number;
    protected height!: number;
    protected name!: string;

    constructor(weight: number, width: number, height: number, name: string) {
        this.weight = weight;
        this.width = width;
        this.height = height;
        this.name = name;
    }

    logWeight(): void {
        console.log(this.weight);
    }

    logWidth(): void {
        console.log(this.width);
    }

    logHeight(): void {
        console.log(this.height);
    }

    logName(): void {
        console.log(this.name);
    }
}