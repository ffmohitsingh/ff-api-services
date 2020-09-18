import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Flowdsl } from '@flowfact/node-flowdsl';

export type InquiryStatus = 'active' | 'pinned' | 'done';

export interface Inquiry {
    id: string;
    iexSendAt: number;
    iexOpenedAt: number;
    contact: string;
    estate: string;
    portalId: string;
    inquiryText: string;
    status: InquiryStatus;
    isSendingIEXAutomaticallyEnabled: true;
    realEstateAgent: string;
    inquiryRecipient: string;
    created: number;
}

export interface InquiryAutomation {
    id: string;
    companyId: string;
    isActive: boolean;
}

export class InquiryService extends APIClient {
    constructor() {
        super(APIMapping.inquiryService);
    }

    /**
     * Fetches all inquiries with pagination support
     * @param {number} page - Number of times the result will be offset by given size.
     * @param {number} size - Number of entities to fetch.
     */
    fetchAll(page: number = 1, size: number = 100): Promise<AxiosResponse<Array<Inquiry>>> {
        return this.invokeApi(`/inquiry?page=${page}&size=${size}`, 'GET');
    }

    /**
     * Fetches all inquiries with pagination support
     * @param {Flowdsl} flowDsl - Search what you like.
     * @param {number} page - Number of times the result will be offset by given size.
     * @param {number} size - Number of entities to fetch.
     */
    fetchWithFlowDsl(flowDsl: Flowdsl, page: number = 1, size: number = 100): Promise<AxiosResponse<Array<Inquiry>>> {
        return this.invokeApi(`/inquiry?page=${page}&size=${size}`, 'POST', flowDsl);
    }

    /**
     * Use this method to link an estate with given ID to an inquiry with given ID, that has no estate linked yet.
     * @param {string} inquiryId - ID of the inquiry that will be updated.
     * @param {string} estateId - ID of the estate that will be linked to the inquiry.
     * @returns the updated inquiry
     */
    linkEstateAndStartAutomation(inquiryId: string, estateId: string): Promise<AxiosResponse<Inquiry>> {
        return this.invokeApi(`/inquiry/${inquiryId}/setEstate/${estateId}`, 'POST');
    }

    isInquiryAutomationActive(companyId: string): Promise<AxiosResponse<InquiryAutomation>> {
        return this.invokeApi(`/inquiry/automation/${companyId}`, 'GET');
    }

    toggleAutomation(companyId: string): Promise<AxiosResponse<InquiryAutomation>> {
        return this.invokeApi(`/inquiry/automation/${companyId}`, 'POST');
    }
}

export default new InquiryService();
