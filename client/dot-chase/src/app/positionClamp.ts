export class PositionClamp
{
    constructor(
        private maxX: number,
        private minX: number,
        private maxY: number, 
        private minY: number){

    }

    getCenterPosition(): number{
        return this.maxX / 2;
    }

    clampX(x: number): number{
        if(x >= this.maxX)
        {
            return this.maxX;
        }

        if(x <= this.minX)
        {
            return this.minX;
        }

        return x;
    }

    clampY(y: number): number{
        if(y >= this.maxY)
        {
            return this.maxY;
        }

        if(y <= this.minY)
        {
            return this.minY;
        }

        return y;
    }

}