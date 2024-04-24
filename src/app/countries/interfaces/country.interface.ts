
export interface Country {
    altSpellings: string[];
    area:         number;
    borders?:     string[];
    capital:      string[];
    capitalInfo:  CapitalInfo;
    car:          Car;
    cca2:         string;
    cca3:         string;
    ccn3?:        string;
    cioc?:        string;
    coatOfArms:   CoatOfArms;
    continents:   Region[];
    currencies:   Currencies;
    demonyms:     Demonyms;
    fifa?:        string;
    flag:         string;
    flags:        Flags;
    gini?:        { [key: string]: number };
    idd:          Idd;
    independent?: boolean;
    landlocked:   boolean;
    languages:    { [key: string]: string };
    latlng:       number[];
    maps:         Maps;
    name:         Name;
    population:   number;
    postalCode?:  PostalCode;
    region:       Region;
    startOfWeek:  StartOfWeek;
    status:       Status;
    subregion:    Subregion;
    timezones:    string[];
    tld?:         string[];
    translations: { [key: string]: Translation };
    unMember:     boolean;
}

export interface SmallCountries {
    name:string,
    cca3:string,
    borders:string[],
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    side:  Side;
    signs: string[];
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export enum Region {
    Asia = "Asia",
    Africa = 'Africa',
    Americas = 'Americas',
    Europa = 'Europe',
    Oceania = 'Oceania',
}

export interface Currencies {
    MDL?: All;
    BGN?: All;
    EUR?: All;
    ALL?: All;
    SEK?: All;
    CZK?: All;
    GBP?: All;
    GIP?: All;
    RUB?: All;
    BYN?: All;
    CHF?: All;
    HUF?: All;
    ISK?: All;
    PLN?: All;
    MKD?: All;
    RSD?: All;
    DKK?: All;
    FOK?: All;
    UAH?: All;
    BAM?: BAM;
    GGP?: All;
    IMP?: All;
    NOK?: All;
    RON?: All;
    JEP?: All;
}

export interface All {
    name:   string;
    symbol: string;
}

export interface BAM {
    name: string;
}

export interface Demonyms {
    eng:  Eng;
    fra?: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    alt?: string;
    png:  string;
    svg:  string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    nativeName: { [key: string]: Translation };
    official:   string;
}

export interface Translation {
    common:   string;
    official: string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}

export enum StartOfWeek {
    Monday = "monday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
    UserAssigned = "user-assigned",
}

export enum Subregion {
    CentralEurope = "Central Europe",
    EasternEurope = "Eastern Europe",
    NorthernEurope = "Northern Europe",
    SoutheastEurope = "Southeast Europe",
    SouthernEurope = "Southern Europe",
    WesternEurope = "Western Europe",
}
