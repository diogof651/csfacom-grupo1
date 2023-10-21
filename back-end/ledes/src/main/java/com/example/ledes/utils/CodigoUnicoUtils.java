package com.example.ledes.utils;

import java.util.Random;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;

public class CodigoUnicoUtils {
    public static String gerarCodigo(UsuarioRepositorio usuarioRepositorio) {
        String codigo;
        Usuario usuario = null;
        do {
            codigo = gerarCodigoAleatorio();
            usuario = usuarioRepositorio.findByCodigoUnico(codigo);
        } while (usuario != null);

        return codigo;
    }

    private static String gerarCodigoAleatorio() {
        Random random = new Random();
        String alfabeto = "ABCDEFGHJKLMNPRSTUVWXYZ";
        String codigo = "";

        codigo += alfabeto.charAt(random.nextInt(alfabeto.length()));

        for (int i = 0; i < 2; i++) {
            codigo += alfabeto.charAt(random.nextInt(alfabeto.length()));
        }

        for (int i = 0; i < 2; i++) {
            codigo += random.nextInt(10);
        }

        codigo += alfabeto.charAt(random.nextInt(alfabeto.length()));
        return codigo;
    }
}
