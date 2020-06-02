package com.esc.rtserver.utilities;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*/

/**
 *
 * @author CMOMODU
 */

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;
import javax.crypto.*;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;


@Component
public class Cryptography {

    private static Logger logger = Logger.getLogger(Cryptography.class);
    private static String charsetName = "UTF-8";
    private static String algorithm = "AES/CBC/PKCS5PADDING";
    private static final String KEY = "ECO*&^58FRHEC#!$@O654RDS03245ifnUIYDSDF< )czxmv*&*(MYzxcdp9uvhoibv0q374tsbv kjzx v&$&^9zxcv87xvmzxvcv!@#$!#$@!~%#$^&^%**(&";
    private static MessageDigest md;
    private static byte[] hash;
    public static String tokenAlgorithm = "DES";
    public static String tokenKey = "ECO654RDS033FGV1";

    static {

        try {

            md = MessageDigest.getInstance("SHA-512");
            hash = md.digest(KEY.getBytes());

        } catch (NoSuchAlgorithmException ex) {

            logger.info("NoSuchAlgorithmException generating hash from KEY: " + ex.getMessage());
            logger.debug("Exception " + Arrays.toString(ex.getStackTrace()).replaceAll(", ", "\n"));

        }

    }

    public static String PBEncrypt(String data) {

        if (KEY == null || data == "") {

            return "";

        }

        try {

            final byte[] keyByte = new byte[16];
            final byte[] iv = new byte[16];
            System.arraycopy(hash, 0, keyByte, 0, 16);
            System.arraycopy(hash, 16, keyByte, 0, 16);
            SecretKey secretKey = new SecretKeySpec(keyByte, "AES");
            byte[] dataBytes = data.getBytes(charsetName);
            Cipher cipher = Cipher.getInstance(algorithm);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, new IvParameterSpec(iv));
            String s = new String(Base64.getEncoder().encode(cipher.doFinal(dataBytes)));

            return s;

        } catch (Throwable e) {

            logger.info("Exception In connection : " + e.getMessage());
            logger.debug("Exception " + Arrays.toString(e.getStackTrace()).replaceAll(", ", "\n"));

            return null;

        }

    }

    public static String PBDecrypt(String data) {

        if (KEY == null || data == "") {

            return "";

        }

        try {

            byte[] dataBytes = Base64.getDecoder().decode(data.getBytes());
            final byte[] keyByte = new byte[16];
            final byte[] iv = new byte[16];
            System.arraycopy(hash, 0, keyByte, 0, 16);
            System.arraycopy(hash, 16, keyByte, 0, 16);
            SecretKey secretKey = new SecretKeySpec(keyByte, "AES");
            Cipher cipher = Cipher.getInstance(algorithm);
            cipher.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(iv));
            byte[] byteDecryptedText = cipher.doFinal(dataBytes);

            return new String(byteDecryptedText);

        } catch (Exception e) {

            logger.info("Exception In connection : " + e.getMessage());
            logger.info("Exception " + Arrays.toString(e.getStackTrace()).replaceAll(", ", "\n"));

            return null;

        }

    }

    public static String encryptInternal(String data) {

        if (KEY == null || data == null) {

            return null;

        }

        try {

            final byte[] keyByte = new byte[16];

            final byte[] iv = new byte[16];

            System.arraycopy(hash, 0, keyByte, 0, 16);

            System.arraycopy(hash, 16, keyByte, 0, 16);

            SecretKey secretKey = new SecretKeySpec(keyByte, "AES");

            byte[] dataBytes = data.getBytes(charsetName);

            Cipher cipher = Cipher.getInstance(algorithm);

            cipher.init(Cipher.ENCRYPT_MODE, secretKey, new IvParameterSpec(iv));

            String s = new String(Base64.getEncoder().encode(cipher.doFinal(dataBytes)));

            return s;

        } catch (Throwable e) {

            logger.info("Exception In connection : " + e.getMessage());

            logger.debug("Exception " + Arrays.toString(e.getStackTrace()).replaceAll(", ", "\n"));

            return null;

        }

    }

    public static String decryptInternal(String data) {

        if (KEY == null || data == null) {

            return null;

        }

        try {

            byte[] dataBytes = Base64.getDecoder().decode(data.getBytes());

            final byte[] keyByte = new byte[16];

            final byte[] iv = new byte[16];

            System.arraycopy(hash, 0, keyByte, 0, 16);

            System.arraycopy(hash, 16, keyByte, 0, 16);

            SecretKey secretKey = new SecretKeySpec(keyByte, "AES");

            Cipher cipher = Cipher.getInstance(algorithm);

            cipher.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(iv));

            byte[] byteDecryptedText = cipher.doFinal(dataBytes);

            return new String(byteDecryptedText);

        } catch (Exception e) {

            //e.printStackTrace();
            logger.info("Exception In connection : " + e.getMessage());

            logger.debug("Exception " + Arrays.toString(e.getStackTrace()).replaceAll(", ", "\n"));

            return null;

        }

    }

    public static String encryptToken(String data) throws NoSuchPaddingException,
            NoSuchAlgorithmException, InvalidKeyException, BadPaddingException,
            IllegalBlockSizeException {

        if (data == null) {
            return null;
        }

        try {

            DESKeySpec desKeySpec = new DESKeySpec(tokenKey.getBytes(charsetName));

            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(tokenAlgorithm);

            SecretKey secretKey = secretKeyFactory.generateSecret(desKeySpec);

            byte[] dataBytes = data.getBytes(charsetName);

            Cipher cipher = Cipher.getInstance(tokenAlgorithm);

            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

            String s = new String(Base64.getEncoder().encode(cipher.doFinal(dataBytes)));

            return s;

        } catch (Exception e) {

            logger.info("Exception In connection : " + e.getMessage());

            logger.debug("Exception " + Arrays.toString(e.getStackTrace()).replaceAll(", ", "\n"));

            return null;

        }

    }

    public static String Hash512Msg(String data) {
        String isValid = "";
        try {

            MessageDigest digest = MessageDigest.getInstance("SHA-512");
            // ** NOTE all bytes that are retrieved from the data string must be done so using UTF-8 Character Set.
            byte[] hashBytes = data.getBytes("UTF-8");
            //Create the hash bytes from the data
            byte[] messageDigest = digest.digest(hashBytes);
            //Create a HEX string from the hashed data
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < messageDigest.length; i++) {
                String h = Integer.toHexString(0xFF & messageDigest[i]);
                while (h.length() < 2) {
                    h = "0" + h;
                }
                sb.append(h);
            }
            isValid = sb.toString();

        } catch (Exception ex) {
        }

        return isValid;

    }

    /**
     *

     *
     *
     *
     * @param data
     *
     * @return the string that was encrypted
     *
     * @throws NoSuchPaddingException
     *
     * @throws NoSuchAlgorithmException
     *
     * @throws InvalidKeyException
     *
     * @throws BadPaddingException
     *
     * @throws IllegalBlockSizeException
     *
     * @throws java.io.IOException
     *
     */
    public static String decryptToken(String data) throws NoSuchPaddingException,
            NoSuchAlgorithmException, InvalidKeyException, BadPaddingException,
            IllegalBlockSizeException, IOException {

        if (data == null) {

            return null;

        }

        try {

            byte[] dataBytes = Base64.getDecoder().decode((data.getBytes()));

            DESKeySpec desKeySpec = new DESKeySpec(tokenKey.getBytes(charsetName));

            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(tokenAlgorithm);

            SecretKey secretKey = secretKeyFactory.generateSecret(desKeySpec);

            Cipher cipher = Cipher.getInstance(tokenAlgorithm);

            cipher.init(Cipher.DECRYPT_MODE, secretKey);

            byte[] dataBytesDecrypted = (cipher.doFinal(dataBytes));

            String s = new String(dataBytesDecrypted);

            return s;

        } catch (Exception e) {

            logger.info("Exception In connection : " + e.getMessage());

            logger.debug("Exception " + Arrays.toString(e.getStackTrace()).replaceAll(", ", "\n"));

            return null;

        }

    }


    public static void main(String s[]) throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidKeyException, BadPaddingException, IllegalBlockSizeException, IOException {

        System.out.println(PBDecrypt("nkHCboxYzKNs4kuyLFPMag=="));
        System.out.println(PBEncrypt("1"));

    }

}
