
export interface MetaData {
    id: string;
    rarity: number;
    google_drive_id: string;
    meta: {
        name: string;
        attributes: Array<{
            trait_type: string;
            value: string;
        }>;
    };
}

export interface TraitsData {
    [key: string]: string[];
}
