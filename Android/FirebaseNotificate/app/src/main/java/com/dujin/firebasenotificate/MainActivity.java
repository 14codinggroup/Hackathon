package com.dujin.firebasenotificate;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.iid.FirebaseInstanceId;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    WebView mWebview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        mWebview  = new WebView(this);
        mWebview.setWebViewClient(new WebViewClient());
        mWebview.getSettings().setJavaScriptEnabled(true); // enable javascript

        mWebview .loadUrl("http://121.135.150.5:12111/");
        setContentView(mWebview );

        /*
        Button btnShowToken = (Button)findViewById(R.id.button_show_token);
        btnShowToken.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    //Get the token
                    String token = FirebaseInstanceId.getInstance().getToken();
                    Log.d(TAG, "Token: " + token);
                    Toast.makeText(MainActivity.this, token, Toast.LENGTH_SHORT).show();
                }
            }
        );
        */
    }
}
