package com.esc.rtserver.utilities;

public class EmailChecker {

    public boolean checkEmail(String email){
        if (email.contains("@ecobank.com")){
            return true;
        }
        return false;
    }
}
