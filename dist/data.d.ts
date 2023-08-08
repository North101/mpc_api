type SiteData = Site[];
export interface Site {
    code: string;
    name: string;
    urls: string[];
}
export type UnitData = {
    [key: string]: Unit[];
};
export type Unit = {
    applyMask: boolean;
    auto: boolean;
    backDesignCode: string;
    code: string;
    curated: any;
    dpi: number;
    filter: string;
    frontDesignCode: string;
    height: number;
    lappedType: string;
    maxCards: number;
    name: string;
    options: UnitOption[];
    padding: number;
    productCode: string;
    productHeight: number;
    productPadding: number;
    productWidth: number;
    safe: number;
    scale: number;
    sortNo: number;
    unpick: boolean;
    width: number;
    x: number;
    y: number;
};
export type UnitOption = {
    cardStockCode: string;
    finishCodes: string[];
    packagingCodes: string[];
    printTypeCodes: string[];
};
export type CardStockData = {
    [key: string]: CardStock[];
};
export type CardStock = {
    code: string;
    name: string;
};
export type FinishData = {
    [key: string]: Finish[];
};
export type Finish = {
    code: string;
    name: string;
};
export type PackagingData = {
    [key: string]: Packaging[];
};
export type Packaging = {
    code: string;
    name: string;
};
export type PrintTypeData = {
    [key: string]: PrintType[];
};
export type PrintType = {
    code: string;
    name: string;
};
interface Data {
    units: UnitData;
    sites: SiteData;
    printTypes: PrintTypeData;
    finishes: FinishData;
    cardStocks: CardStockData;
    packagings: PackagingData;
}
declare const data: Data;
export default data;
