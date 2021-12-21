import { Captions } from '@flowfact/types';
import { TranslatableText } from '../common/types/TranslatableText';

export namespace GeoInformationsServiceTypes {
    export interface LocationPlace {
        id: string;
        description: string;
        importance: number;
        title: string;
    }

    export interface AutocompleteResults {
        places: LocationPlace[];
    }

    export interface MatchResult extends LocationPlace, Coordinates {
        address: LocationAddress;
    }

    export interface GeoInformationValue {
        captions: TranslatableText;
        companyId: string;
        createdTimestamp: number;
        geometry: Geometry;
        id: string;
        isGlobal: boolean;

        // for global polygons is always true
        // for local polygons (isGlobal===false) hasGlobal says if we have global (isGlobal===true) polygon with same name,
        // so we can revert local to global one
        hasGlobal:boolean;

        metadata: object;
        name: string;
        parent?: string;
    }

    export interface GeoInformationMetadataOnly extends Omit<GeoInformationValue, "geometry">{
        hasGeometry: boolean;
    }

    export type Latitude = number;

    export type Longitude = number;

    export type GeoPoint = [Longitude, Latitude];

    // https://en.wikipedia.org/wiki/GeoJSON
    export interface PolygonGeometry {
        type: 'Polygon';
        coordinates: GeoPoint[][];
    }
    export interface MultiPolygonGeometry {
        type: 'MultiPolygon';
        coordinates: GeoPoint[][][];
    }
    export type Geometry = PolygonGeometry | MultiPolygonGeometry;

    export interface ListResponse<T> {
        size: number;
        values: T[];
    }

    export type ListOfPolygons = ListResponse<GeoInformationValue>;

    export interface LinkedPolygon {
        polygonName: string;
        entityId: string;
    }

    export interface FindPolygonResponse {
        size: number;
        values: GeoInformation[];
    }

    export interface GeoInformation {
        global: boolean;
        labels: Captions;
        name: string;
        parent: string;
    }

    export interface LocationAddress {
        city: string;
        street: string;
        zipcode: string;
        country: string;
        [key: string]: string;
    }

    export interface Coordinates {
        lat: number;
        lon: number;
    }

    export interface CreateGeoInformationRequest {
        captions: TranslatableText;
        name: string;

        parent?: string;
        geometry?: Geometry;
        metadata?: object;
    }

    export enum CountryCode {
        GERMANY = 'DE',
        SWITZERLAND = 'CH'
    }
}
