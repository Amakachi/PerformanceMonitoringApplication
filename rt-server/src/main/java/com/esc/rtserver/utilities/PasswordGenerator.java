package com.esc.rtserver.utilities;

/**
 * @author AYAJIBADE
 */

import java.util.Random;

/**
 * Creates passwords that meet password character rule criteria.
 *
 * @author Sean C. Sullivan
 * @author Middleware Services
 */
public class PasswordGenerator {
    static String CHAR_L = "abcdefghijklmnopqrstuvwxyz";
    static String CHAR_U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static String NUM = "1234567890";
    static String CHAR_S = "!@#$%^&*()_=+";
    static final int PASSWORD_LENGTH = 8;

    public static void main(String[] args) {
        PasswordGenerator dd = new PasswordGenerator();
        System.out.println(" Password>>>>" + dd.generateRandomPassword() + "<<>>>");
    }

    public String generateRandomPassword() {
        StringBuffer randPass = new StringBuffer();
        char ch;
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            if (randPass.length() < PASSWORD_LENGTH) {
                ch = CHAR_L.charAt(getRandomNumber(CHAR_L.length()));
                randPass.append(ch);
            }
            if (randPass.length() < PASSWORD_LENGTH) {
                ch = CHAR_U.charAt(getRandomNumber(CHAR_U.length()));
                randPass.append(ch);
            }
            if (randPass.length() < PASSWORD_LENGTH) {
                ch = NUM.charAt(getRandomNumber(NUM.length()));
                randPass.append(ch);
            }
            if (randPass.length() < PASSWORD_LENGTH) {
                ch = CHAR_S.charAt(getRandomNumber(CHAR_S.length()));
                randPass.append(ch);
            }
        }
        return randPass.toString();
    }

    private int getRandomNumber(int index) {
        int randomInt = 0;
        Random randomGenerator = new Random();
        randomInt = randomGenerator.nextInt(index - 1);
        return randomInt;
    }

}