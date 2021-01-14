import {Observable} from 'rxjs';
import {CredentialData} from '../../data/credential.data';
import {AuthorizationData} from '../../data/authorization.data';
import {ProviderModel} from '../../model/provider.model';

export abstract class BasePlatformController {

    // Controller ID
    private ctrlId: string;
    // Health Platform Infomation
    protected credentialData: CredentialData;
    protected authorizationData: AuthorizationData;

    // Sync Targer Provider
    protected syncProvider: ProviderModel = null;

    // ------------------------------------------------------------------------------------
    // Abstract function
    // ------------------------------------------------------------------------------------
    // Health Platform Authorization
    public abstract authorization(): Observable<any>;
    // Data sync
    public abstract synchronization(providerModel: ProviderModel): Observable<any>;    

    // ------------------------------------------------------------------------------------
    // function
    // ------------------------------------------------------------------------------------
    /**
     * Fitbit,Misfit Client info Check
     */
    protected validCredential() {        
        let valid = '';
        if (this.credentialData == null) {
            valid = 'Invalid credentialData';
        } else if (this.credentialData.clientId == null) {
            valid = 'Invalid clientId';
        } else if (this.credentialData.appSecret == null) {
            valid = 'Invalid appSecret';
        }
        return valid;
    }

    // ------------------------------------------------------------------------------------
    // Set/Get
    // ------------------------------------------------------------------------------------
    // Controller ID    
    public getCtrlId(): string {
        return this.ctrlId;
    }

    // Health Platform Creadential Data
    public setCreadential(credentialData: CredentialData) {
        this.credentialData = credentialData;
    }
    public getCreadential(){
        return this.credentialData;
    }

    // Health Platform Authorization Data
    public setAuthorization(authorizationData: AuthorizationData) {        
        this.authorizationData = authorizationData;
    }
    public getAuthorization() {        
        return this.authorizationData;
    }
    public removeAuthorization() {
        this.authorizationData = null;        
    }

    // ------------------------------------------------------------------------------------
    // Common Function
    // ------------------------------------------------------------------------------------
    public isSynchronization(){
        return this.syncProvider != null;
    }
}
