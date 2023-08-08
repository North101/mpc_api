interface UnpickInfo {
    SortNo: number;
    X: number;
    Y: number;
    Width: number;
    Height: number;
    Rotate: number;
    Alpha: number;
    TipX: number;
    TipY: number;
    TipWidth: number;
    Resolution: number;
    AllowEdit: string;
    AllowMove: string;
    AutoDirection: string;
    ApplyMask: string;
    RealX: number;
    RealY: number;
    RealWidth: number;
    RealHeight: number;
}
interface PixelInfo {
    ProductWidth: number;
    ProductHeight: number;
    ProductPadding: number;
    PaddingLeft: number;
    PaddingTop: number;
    PaddingRight: number;
    PaddingBottom: number;
    SafeLeft: number;
    SafeTop: number;
    SafeRight: number;
    SafeBottom: number;
    Radius: number;
    IsUnpick: string;
    IsLapped: string;
    IsPartImage: string;
    LappedType: string;
    LappedRow: number;
    LappedCol: number;
    Resolution: number;
    AllowDesign: string;
    PreviewWidth: number;
    PreviewHeight: number;
    Filter: string;
    AllowEditFilter: string;
    ImageMode: string;
    IsTextZoom: string;
}
export interface CardSettings {
    url: string;
    unit: string;
    product: string;
    frontDesign: string;
    backDesign: string;
    width: number;
    height: number;
    dpi: number;
    filter: string;
    auto: boolean;
    scale: number;
    sortNo: number;
    applyMask: boolean;
}
export interface Settings extends CardSettings {
    name?: string;
    cardStock: string;
    printType: string;
    finish: string;
    packaging: string;
    maxCards: number;
}
export interface UploadedImage {
    count: number;
    front?: CompressedImageData;
    back?: CompressedImageData;
}
export interface CompressedImageData {
    Name?: string;
    ID: string;
    SourceID: string;
    Exp: string;
    Width: number;
    Height: number;
}
export declare const initProject: (settings: Settings, cards: UploadedImage[]) => Promise<string>;
export declare const saveFrontSettings: (projectId: string, settings: Settings, cards: UploadedImage[]) => Promise<Response>;
export declare const saveBackSettings: (projectId: string, settings: Settings, cards: UploadedImage[]) => Promise<Response>;
export declare const saveFrontImageStep: (projectId: string, settings: Settings) => Promise<{
    pixelInfo: PixelInfo;
    unpickInfo: UnpickInfo;
}>;
export declare const saveFrontTextStep: (projectId: string, settings: Settings) => Promise<void>;
export declare const saveBackImageStep: (projectId: string, settings: Settings) => Promise<void>;
export declare const saveBackTextStep: (projectId: string, settings: Settings) => Promise<void>;
export declare const uncompressImageData: (settings: Settings, data: CompressedImageData) => {
    ID: string;
    Exp: string;
    Owner: string;
    Path: string;
    Width: number;
    Height: number;
    imageName: string;
};
export declare const uncompressCropData: (data: CompressedImageData, pixelInfo: PixelInfo, unpickInfo: UnpickInfo) => {
    ID: string;
    SourceID: string;
    Exp: string;
    X: number;
    Y: number;
    Width: number;
    Height: number;
    CropX: number;
    CropY: number;
    CropWidth: number;
    CropHeight: number;
    CropRotate: number;
    Rotate: number;
    Zoom: number;
    Scale: number;
    FlipHorizontal: string;
    FlipVertical: string;
    Sharpen: string;
    Filter: string;
    Brightness: number;
    ThumbnailScale: number;
    AllowEdit: string;
    AllowMove: string;
    Alpha: number;
    Resolution: number;
    Index: number;
    Quality: string;
    AutoDirection: string;
    ApplyMask: string;
    IsEmpty: boolean;
}[];
export declare const saveSession: (projectId: string, settings: Settings, cards: UploadedImage[], pixelInfo: PixelInfo, unpickInfo: UnpickInfo) => Promise<Response>;
export declare const saveProject: (projectId: string, settings: Settings) => Promise<Response | undefined>;
export declare const createProject: (settings: Settings, cards: UploadedImage[]) => Promise<string>;
export declare const createAutoSplitProject: (settings: Settings, cards: UploadedImage[]) => Promise<string[]>;
export declare const uploadImage: (settings: CardSettings, side: string, image: File) => Promise<any>;
export declare const analysisImage: (settings: CardSettings, side: string, index: number, value: any) => Promise<any>;
export declare const compressImageData: (analysedImage: any, uploadedImage: any) => CompressedImageData;
export {};
