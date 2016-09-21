package com.ciandt.gardenito.backend.services.util;

/**
 * Created by fprado on 7/7/16.
 */
public class Params {
    private static Params ourInstance = new Params();

    public static Params getInstance() {
        return ourInstance;
    }

    private Params() {
    }

    public String getOneSignalKey() {
        return "YWJlYmU3MTktMDMwZi00OGQwLWI3NTktM2I0ZmQzODg4MzFj";
    }

//    public String getOneSignalTag(String carteirinha) {
//        return "{\"key\": \"username\", \"relation\": \"=\", \"value\": \"" + carteirinha + "\"}";
//    }

    public String getOneSignalAppId() {
        return "\"af02f37e-7adb-48cb-b15f-c76cca4fb49c\"";
    }

    public String getMensagemParametros () {
        return "Parabéns! Esta é uma mensagem de PushNotification enviada para informar que foram recebidos dados do sensor do Gardenito.";
    }
}
