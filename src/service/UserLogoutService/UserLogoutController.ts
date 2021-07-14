import { APIClient, APIMapping } from '../../http';
import {UserLogoutTypes} from './UserLogoutService.Types';
import { JSONPatch } from '../DocumentTemplateService';

export class UserLogoutController extends APIClient {
    constructor() {
        super(APIMapping.userLogout);
    }

    /**
     * Creates and schedules a logout policy based on cron and reminder time
     * @param trigger
     * @param reminderNotificationMinutes
     * @param userId
     */
    async postLogoutDataForUser(
        trigger: UserLogoutTypes.UserLogoutPolicyRequestCronTrigger | UserLogoutTypes.UserLogoutPolicyRequestStringTimeTrigger,
        reminderNotificationMinutes: number,
        userId: string
    ) {
        return this.invokeApiWithErrorHandling<UserLogoutTypes.UserLogoutData>('/user-logout-policy', 'POST', {
            trigger,
            reminderNotificationMinutes,
            userId,
        });
    }


    /**
     * Get the logout data for specific user
     * @param id
     */
    async fetchLogoutData(id: string) {
        return this.invokeApiWithErrorHandling<UserLogoutTypes.UserLogoutInformation>(`/user-logout-policy/${id}`, 'GET');
    }

    /**
     * Updates a logout policy by JSON patch method
     * @param id
     * @param operations
     */
    async patchLogoutPolicy(id: string, operations: JSONPatch[]) {
        return this.invokeApiWithErrorHandling<UserLogoutTypes.UserLogoutInformation>(`/user-logout-policy/${id}`, 'PATCH', operations, {
            headers: { 'Content-Type': 'application/json-patch+json' },
        });
    }

    /**
     * Deletes the logout policy and all it's scheduled triggers/events
     * @param id
     */
    async deleteLogoutData(id: string) {
        return this.invokeApiWithErrorHandling(`/user-logout-policy/${id}`, 'DELETE');
    }

    /**
     * Get the logout data from users
     * @param id
     */
    async fetchLogoutDataFromUsers(id: string) {
        return this.invokeApiWithErrorHandling<UserLogoutTypes.UserLogoutData>(`/user-logout-policy/users/${id}`, 'GET');
    }
}
