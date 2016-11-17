package com.dujin.firebasenotificate;

import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.iid.FirebaseInstanceId;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    WebView mWebview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (android.os.Build.VERSION.SDK_INT > 9) {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }
        String token = FirebaseInstanceId.getInstance().getToken();

        MongoClient mongoClient = null;
        try{
            mongoClient = new MongoClient("121.135.150.5");
            WriteConcern w = new WriteConcern(1,2000);//쓰게 락 갯수, 연결 시간 2000 //쓰레드 쓰게되면 2개 동시에 쓸 경우도 생기니까
            mongoClient.setWriteConcern(w);
            //데이터베이스 연결
            DB db = mongoClient.getDB("hackathon_db");
            //컬렉션 가져오기
            DBCollection coll = db.getCollection("users");

            //user 테이블에 데이터삽입
            DBObject doc = new BasicDBObject();

            doc.put("token", token);



            BasicDBObject query = new BasicDBObject("token", token);
            DBCursor cursor = coll.find(query);
            if(cursor.count() > 0){

            }else{
                coll.insert(doc);
            }

            //coll.update(doc, doc);
            //Toast.makeText(MainActivity.this, token, Toast.LENGTH_SHORT).show();
        }catch(Exception e){
            System.out.println(e.getMessage());
            Toast.makeText(MainActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
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

        mWebview  = new WebView(this);
        mWebview.setWebViewClient(new WebViewClient());
        mWebview.getSettings().setJavaScriptEnabled(true); // enable javascript

        mWebview .loadUrl("http://121.135.150.5:12111/");
        setContentView(mWebview);

    }
}
