export * from "./navbar";
export * from "./category";
export * from "./products";
export * from "./brand";
export * from "./team";
export * from "./post";
export * from "./campaigns";
export * from "./users";
export * from "./supplier";
export * from "./vendor";
export * from "./purchase-order";
export * from "./cart";
export * from "./product-returns";

export interface ApiResponse<T> {
    status: "success" | "error";
    message: string;
    data: T | null;
    meta?: any;
}

export interface PaginationMeta {
    page: number;
    pages: number;
    per_page: number;
    total: number;
}

export interface ErrorData {
    errors?: Record<string, string[]>;
}

export type ActionState<T> = {
    status: "success" | "error";
    message: string;
    data: T | null;
};

// locations
export interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}

export interface Translations {
    kr: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    cn: string;
}

export interface City {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
}

export interface State {
    id: number;
    name: string;
    state_code: string;
    latitude: string;
    longitude: string;
    cities: City[];
}

export interface Country {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    subregion: string;
    timezones: Timezone[];
    translations: Translations;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
    states: State[];
}
