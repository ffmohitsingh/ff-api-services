import { Extension, SchemaItems, SchemaV2, SchemaV2Response } from '@flowfact/types';
import { APIClient, APIMapping } from '../http';

const v2Header = { headers: { 'x-ff-version': 2 } };

export class SchemaServiceV2 extends APIClient {
    constructor() {
        super(APIMapping.schemaService);
    }

    /**
     * Creates a schema. Also needed groups are created if not existent.
     * @param schema - The schema that should be created
     */
    createSchema = async (schema: SchemaV2) => {
        return this.invokeApiWithErrorHandling<SchemaV2>('/v2/schemas', 'POST', schema);
    };

    /**
     * Returns all schemas
     * @param group - Filters all schemas for given group name.
     * @param size - Page size of the response.
     * @param page - Page number of the response.
     * @param extensions - Extensions that should be added to the schema
     */
    fetchAllSchemas = async (group?: string, size?: number, page?: number, extensions?: string) => {
        let queryParams: any = {};
        if (group) {
            queryParams.group = group;
        }
        if (size) {
            queryParams.size = size;
        }
        if (page) {
            queryParams.page = page;
        }
        if (extensions) {
            queryParams.extensions = extensions;
        }
        return this.invokeApiWithErrorHandling<SchemaV2Response>(`/v2/schemas`, 'GET', undefined, { queryParams });
    };

    /**
     * Deletes a schema
     * @param schemaId - A schema's id or schemaname
     */
    deleteSchema = async (schemaId: string) => {
        return this.invokeApiWithErrorHandling(`/v2/schemas/${schemaId}`, 'DELETE');
    };

    /**
     * Updates a schema. Also needed groups are created if not existent.
     * @param schema - The schema to be updated
     */
    updateSchema = async (schema: SchemaV2) => {
        return this.invokeApiWithErrorHandling<SchemaV2>(`/v2/schemas/${schema.id}`, 'PUT', schema);
    };

    /**
     * Import fields from sourceSchema to targetSchema
     *
     * @param targetSchemaName - name of schema to import to
     * @param sourceSchemaName - name of schema to import from
     * @param fields - array of field names to import from the source schema
     * @returns updated schema
     */
    fieldImport = async (targetSchemaName: string, sourceSchemaName: string, fields: string[]) => {
        return this.invokeApiWithErrorHandling<SchemaV2>(`/schemas/${targetSchemaName}/field-import`, 'POST', {
            sourceSchema: sourceSchemaName,
            fields: fields,
        });
    };

    /**
     * Duplicates a schema
     * @param sourceSchemaName
     * @param targetSchemaName
     */
    duplicateSchema = async (sourceSchemaName: string, targetSchemaName: string) => {
        let queryParams: any = {};
        queryParams.sourceSchemaName = sourceSchemaName;
        queryParams.targetSchemaName = targetSchemaName;

        return this.invokeApiWithErrorHandling<SchemaV2>(`/v2/schemas`, 'POST', undefined, { queryParams });
    };

    /**
     * @typedef {Object} FetchSchemaByIdOrNameQueryParam
     * @property {boolean} resolveGroup
     */

    /**
     * Returns a schema
     * @param schemaIdOrName - The schema's id or schema name
     * @param {FetchSchemaByIdOrNameQueryParam} queryParams - resolves groups, like estates, to hist children - Default value : false
     */
    fetchSchemaByIdOrName = async (schemaIdOrName: string, queryParams: { resolveGroup?: boolean; extensions?: string } = { extensions: 'all' }) => {
        return this.invokeApiWithErrorHandling<SchemaV2>(`/v2/schemas/${schemaIdOrName}`, 'GET', undefined, { queryParams });
    };

    /**
     * Checks if schema exists, returns id if so
     * @param schemaName - The schema's name
     */
    exists = async (schemaName: string) => {
        return this.invokeApiWithErrorHandling<string>(`/v2/schemas/${schemaName}/exists`, 'GET');
    };

    /**
     * Adds a value to schema
     * @param schemaName - Identifies the schema
     * @param fieldName - Identifies the field name
     * @param value - The value that should be added
     * @deprecated - look at PossibleValuesController
     */
    addPossibleValues = async (schemaName: string, fieldName: string, value: any) => {
        return this.invokeApiWithErrorHandling(`/v2/schemas/${schemaName}/fields/${fieldName}/possiblevalues`, 'POST', value);
    };

    /**
     * Deletes all schemas in current company scope
     * @param key - if you are sure you want delete all schemas then set key = DELETE
     */
    deleteAllSchema = async (key: string) => {
        if (!key || key !== 'DELETE') {
            return Promise.reject('you need to set key = DELETE if you are sure you want delete all schemas');
        }
        return this.invokeApiWithErrorHandling(`/v2/schemas/deleteAll?key=${key}`, 'DELETE');
    };

    /**
     * Resolves all indices for a given identifier
     * @param identifier - Id for groups and schemas
     */
    resolveIndices = async (identifier: string) => {
        return this.invokeApiWithErrorHandling<string[]>(`/v2/schemas/resolveIndices?identifier=${identifier}`, 'GET');
    };

    /**
     * Resolves the given name
     * @param schemaName - A name of a schema
     */
    resolveName = async (schemaName: string) => {
        return this.invokeApiWithErrorHandling<string>(`/v2/schemas/resolveName?name=${schemaName}`, 'GET');
    };

    /* -- Schema groups */

    /**
     * Returns all groups
     */
    getAllGroups = async () => {
        return this.invokeApiWithErrorHandling<SchemaItems>(`/groups/`, 'GET', undefined, v2Header);
    };

    /**
     * Creates a schema group
     * @param group - The group that should be created
     */
    createGroup = async (group: SchemaV2) => {
        return this.invokeApiWithErrorHandling<string>(`/groups/`, 'POST', group, v2Header);
    };

    /**
     * Updates a schema group
     * @param group - The group that should be updated
     */
    updateGroup = async (group: SchemaV2) => {
        return this.invokeApiWithErrorHandling<SchemaV2>(`/groups/${group.id}`, 'PUT', group, v2Header);
    };

    /**
     * Retrieves a schema group by it's identifier (id or name)
     * @param identifier - The schema groups identifier (id or name)
     */
    fetchGroupByIdentifier = async (identifier: string) => {
        return this.invokeApiWithErrorHandling<SchemaV2>(`/groups/${identifier}`, 'GET', undefined, v2Header);
    };

    /**
     * Deletes a schema group by it's identifier (id or name)
     * @param identifier - The schema groups identifier (id or name)
     */
    deleteGroupById = async (identifier: string) => {
        return this.invokeApiWithErrorHandling(`/groups/${identifier}`, 'DELETE', undefined, v2Header);
    };

    /**
     * Tells you if the given identifier belongs to a group
     * @param identifier - The schema groups identifier (id or name)
     */
    isGroup = async (identifier: string) => {
        return this.invokeApiWithErrorHandling(`/groups/${identifier}/is-group`, 'GET', undefined, v2Header);
    };

    // Extension Controller
    /**
     * Fetches all extensions.
     */
    fetchExtensions = async () => {
        return this.invokeApiWithErrorHandling(`/extensions`, 'GET', undefined, v2Header);
    };

    /**
     * Fetches extension by name.
     * @param name - The extenion's name.
     */
    fetchExtension = async (name: string) => {
        return this.invokeApiWithErrorHandling(`/extensions/${name}`, 'GET', undefined, v2Header);
    };

    /**
     * Create or Updates extension by name.
     * @param name - The extension's name.
     * @param extension - The extension object, that should be created or updated.
     */
    createOrUpdateExtension = async (name: string, extension: Extension) => {
        return this.invokeApiWithErrorHandling(`/extensions/${name}`, 'PUT', extension, v2Header);
    };

    /**
     * Create extension.
     * @param extension - The extension object, that should be created or updated.
     * Throws http status code: CONFLICT(409) if an extension with the same name already exists
     */
    createExtension = async (extension: Extension) => {
        return this.invokeApiWithErrorHandling<Extension>(`/extensions`, 'POST', extension, v2Header);
    };


    /**
     * Deletes extension by name.
     * @param name - The extension's name.
     */
    deleteExtension = async (name: string) => {
        return this.invokeApiWithErrorHandling(`/extensions/${name}`, 'DELETE', undefined, v2Header);
    };

    /**
     * Fetches all extensions for a specific combination of schema and company.
     * @param schemaName - The schema name
     */
    fetchExtensionsBySchema = async (schemaName: string) => {
        return this.invokeApiWithErrorHandling(`/extensions/schemas/${schemaName}`, 'GET', undefined, v2Header);
    };

    // Extension-Assignment-Controller
    /**
     * Fetches stats overs all assigned extensions.
     */
    fetchExtensionAssignments = async () => {
        return this.invokeApiWithErrorHandling(`/extensions/assignments`, 'GET', undefined, v2Header);
    };

    /**
     * Assigns extension by name of a extension.
     * It will be assigned to the schemas, which are mentioned within the extension and nowhere else.
     * @Param name - The extension's name.
     */
    addExtensionAssignment = async (name: string) => {
        return this.invokeApiWithErrorHandling(`/extensions/assignments/${name}`, 'POST', undefined, v2Header);
    };

    /**
     * Revokes assignment of an extension by its name.
     * @Param name - The extension's name.
     */
    removeExtensionAssignment = async (name: string) => {
        return this.invokeApiWithErrorHandling(`/extensions/assignments/${name}`, 'DELETE', undefined, v2Header);
    };

    /**
     * Fetches all complex data types
     */
    async fetchDataTypes() {
        return this.invokeApiWithErrorHandling('/datatypes/alltypes', 'GET', undefined, v2Header);
    }
}

export default new SchemaServiceV2();
