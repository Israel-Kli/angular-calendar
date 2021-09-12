export interface Machzor {
    start?: Date;
    end?: Date;

    hebStartDay: number;
    hebStartMonth: number;
    hebStartYear: number;
    
    hebEndDay?: number;
    hebEndMonth?: number;
    hebEndYear?: number;
}