package com.example.ledes.dominio;

public enum TipoPapel{

    GERENTE,
    DESIGNER,
    FRONTEND,
    BACKEND;
    
    public static TipoPapel toEnum(String tipoPapel) {
        try{
            return valueOf(tipoPapel);

        }catch(IllegalArgumentException ex){
            throw new RuntimeException("Não foi encontrado");
        }      
    }
                
}




