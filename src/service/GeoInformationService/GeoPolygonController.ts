import { APIClient, APIMapping } from '../../http';
import { GeoInformationsServiceTypes } from './GeoInformationService.Types';
import ListOfPolygons = GeoInformationsServiceTypes.ListOfPolygons;
import GeoInformationValue = GeoInformationsServiceTypes.GeoInformationValue;
import CreateGeoInformationRequest = GeoInformationsServiceTypes.CreateGeoInformationRequest;

export class GeoPolygonController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * fetch list of all the polygons
     */
    async fetchAll() {
        return this.invokeApiWithErrorHandling<ListOfPolygons>('/polygons', 'GET');
    }

    /**
     * create new geoInformation
     */
    async create(request: CreateGeoInformationRequest) {
        return this.invokeApiWithErrorHandling<GeoInformationValue>('/polygons', 'POST', request);
    }

    /**
     * fetch polygon by name
     * @param name
     */
    async fetchByName(name: string) {
        return this.invokeApiWithErrorHandling<GeoInformationValue>(`/polygons/${name}`, 'GET');
    }

    /**
     * update polygon by name
     * @param geoInformation
     */
    async updateByName(geoInformation: GeoInformationValue) {
        return this.invokeApiWithErrorHandling<GeoInformationValue>(`/polygons/${geoInformation.name}`, 'PUT', geoInformation);
    }

    /**
     * delete polygon by name
     * @param name
     */
    async deleteByName(name: string) {
        return this.invokeApiWithErrorHandling<ListOfPolygons>(`/polygons/${name}`, 'DELETE');
    }
}
