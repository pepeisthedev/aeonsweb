export interface TraitAttribute {
    trait_type: string;
    traits: Array<[string, number, string]>;
}

export interface AvailableTraits {
    attributes: TraitAttribute[];
}