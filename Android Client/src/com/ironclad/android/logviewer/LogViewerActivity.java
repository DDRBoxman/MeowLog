package com.ironclad.android.logviewer;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class LogViewerActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        Intent intent = new Intent(this, LogcatService.class);
        this.startService(intent);
    }
}