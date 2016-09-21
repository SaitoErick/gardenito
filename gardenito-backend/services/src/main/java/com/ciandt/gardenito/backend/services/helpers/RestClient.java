package com.ciandt.gardenito.backend.services.helpers;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by rodrigosclosa on 05/01/16.
 */
public class RestClient {

    public RestClient() {
    }

    public String Post(String URL, String data, String contentType, String apiKEY) {

        StringBuilder output = new StringBuilder();

        try {

            URL url = new URL(URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", contentType); //"Content-Type", "application/json"

            if(apiKEY != null && !apiKEY.isEmpty()) {
                String basicAuth = "Basic " + apiKEY;
                conn.setRequestProperty ("Authorization", basicAuth);
            }

            if(data != null && !data.isEmpty()) {
                //OutputStream os = conn.getOutputStream();
                //os.write(data.getBytes());
                //os.flush();
                DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(wr, "UTF-8"));
                writer.write(data);
                writer.close();
                //wr.close();
            }

            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

            System.out.println("Output from Server .... \n");

//            output = br.readLine();
//            System.out.println(output);

            String retorno = "";

            while ((retorno = br.readLine()) != null) {
                System.out.println(retorno);
                output.append(retorno);
            }

            conn.disconnect();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return output.toString();
    }

    public String Get(String URL, String data, String acceptType) {

        StringBuilder output = new StringBuilder();

        try {
            URL url = new URL(URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", acceptType);

            if(data != null && !data.isEmpty()) {
//                OutputStream os = conn.getOutputStream();
//                os.write(data.getBytes());
//                os.flush();
                DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(wr, "UTF-8"));
                writer.write(data);
                writer.close();
                //wr.close();
            }

            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }

            //BufferedReader br = new BufferedReader(new InputStreamReader(
            //        (conn.getInputStream())));
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

            System.out.println("Output from Server .... \n");

//            output = br.readLine();
//            System.out.println(output);

            String retorno = "";

            while ((retorno = br.readLine()) != null) {
                System.out.println(retorno);
                output.append(retorno);
            }

            conn.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return output.toString();
    }

}
