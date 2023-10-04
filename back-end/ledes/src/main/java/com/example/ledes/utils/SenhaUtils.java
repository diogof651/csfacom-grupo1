package com.example.ledes.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SenhaUtils {

    public static String gerarSenhaCriptografada(String senhaOriginal) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(senhaOriginal);
    }

    public static boolean verificarSenha(String senhaOriginal, String senhaCriptografada) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(senhaOriginal, senhaCriptografada);
    }
}