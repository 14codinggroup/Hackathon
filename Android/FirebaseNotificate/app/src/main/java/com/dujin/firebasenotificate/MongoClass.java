package com.dujin.firebasenotificate;


import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;

public class MongoClass {

    public static boolean AddToken(String token) {
        MongoClient mongoClient = null;
        try{
            //mongoClient = new MongoClient("http://121.135.150.5/");

            /*http://121.135.150.5:12111/

            */
            return true;

        }catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
}

//user의 모든 데이터 가져오기
            /*DBCursor cursor = coll.find();
            while(cursor.hasNext()){
                //커서의 이름중에 _id인 컬럼 값만 출력
                System.out.println(cursor.next().get("_id"));
            }*/

//특정 조건에 맞는 데이터 출력
            /*DBObject o = new BasicDBObject();
            o.put("id","root");
            DBCursor cursor = coll.find(o);
            while(cursor.hasNext()){
                System.out.println(cursor.next().toString());
            }*/

//업데이트
            /*DBObject origin = new BasicDBObject("id","user01");
            DBObject set = new BasicDBObject("$set",new BasicDBObject("password","22kkkk"));
            coll.update(origin, set);//앞이 조건 뒤에가 바뀌는 데이터*/



//데이터 선택 삭제
//coll.remove(new BasicDBObject("id","강감찬")); //강감찬 삭제

