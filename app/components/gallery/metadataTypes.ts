
export interface MetaData {
    name: string;
    description: string;
    external_url: string;
    image: string;
    attributes: Array<{
        trait_type: string;
        value: string;
    }>;
    compiler: string;
    rarity: number;
    inscriptionid: string;
}

export interface TraitsData {
    [key: string]: string[];
}