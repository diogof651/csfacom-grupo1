package com.example.ledes.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.codec.digest.DigestUtils;

public class HashUtils {
    public static String gerarHash(String nome, Date dataAcesso) {
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dataFormatada = formato.format(dataAcesso);

        String sha256Hash = DigestUtils.sha256Hex(nome + dataFormatada);

        return sha256Hash;
    }
}