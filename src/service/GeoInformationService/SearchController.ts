import { APIClient, APIMapping } from '../../http';
import { GeoInformationsServiceTypes } from './GeoInformationService.Types';
import FindPolygonResponse = GeoInformationsServiceTypes.FindPolygonResponse;
import GeoInformationValue = GeoInformationsServiceTypes.GeoInformationValue;
import GeoInformationMetadataOnly = GeoInformationsServiceTypes.GeoInformationMetadataOnly;

export class SearchController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * free text search for polygons based on captions
     * @param query
     * @param countryCode
     */
    async findPolygon(query: string, countryCode = GeoInformationsServiceTypes.CountryCode.GERMANY) {
        return this.invokeApiWithErrorHandling<FindPolygonResponse>(`/polygons/search?q=${query}&country=${countryCode}`, 'GET');
    }

    async findPolygons(names: string[]) {
        return this.invokeApiWithErrorHandling<FindPolygonResponse>(`/polygons/search/list?names=${names}`, 'GET');
    }

    /**
     * fetch polygons by names
     * @param names
     */
    async fetchPolygonDetails(names: string[]) {
        return this.invokeApiWithErrorHandling<GeoInformationValue[]>(`/polygons/list?names=${names}&onlyMetadata=false`, 'GET');
    }
    /**
     * fetch polygons metadata by names
     * @param names
     */
    async fetchPolygonsMetadata(names: string[]) {
        return this.invokeApiWithErrorHandling<GeoInformationMetadataOnly[]>(`/polygons/list?names=${names}&onlyMetadata=true`, 'GET');
    }
}
