package androm.dujin.webview;

import android.app.IntentService;
import android.content.Intent;
import android.util.Log;

import com.google.android.gms.gcm.GoogleCloudMessaging;
import com.google.android.gms.iid.InstanceID;

/**
 * Created by jingyu on 16. 6. 25..
 */
public class RegistrationIntentService extends IntentService {
    private static final String TAG = "MyInstanceIDService";

    public RegistrationIntentService()    {
        super(TAG);
        Log.d(TAG, "RegistrationIntentService()");
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        try {
            // [START register_for_gcm]
            // Initially this call goes out to the network to retrieve the token, subsequent calls
            // are local.
            // R.string.gcm_defaultSenderId (the Sender ID) is typically derived from google-services.json.
            // See https://developers.google.com/cloud-messaging/android/start for details on this file.
            // [START get_token]
            //app폴더 밑에 저장한 google-services.json 파일에 있는 클라이언트 키값으로 토큰을 만든다.
            InstanceID instanceID = InstanceID.getInstance(this);
            String token = instanceID.getToken(getString(R.string.gcm_defaultSenderId),
                    GoogleCloudMessaging.INSTANCE_ID_SCOPE, null);
            // [END get_token]

            //TODO server로 token 전송
            Log.i(TAG, "token: " + token);
        }
        catch (Exception e) {
            Log.d(TAG, "Failed to complete token refresh", e);
        }
    }
}