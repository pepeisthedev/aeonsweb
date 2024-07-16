
export interface MetaData {
    id: string;
    rarity: number;
    external_url: number;
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
