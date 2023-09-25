package com.example.ledes.dominio;

public enum TipoVinculo{

        ATIVIDADESORIENTADASENSINO,
        DOUTOURADO,
        TCC,
        MESTRADO,
        BOLSISTA,
        ESTAGIARIO,
        DOCENTE,
        VOLUNTARIO;

        public static TipoVinculo toEnum(String tipoVinculo) {
            try{
                return valueOf(tipoVinculo);
        
            }catch(IllegalArgumentException ex){
                throw new RuntimeException("Não foi encontrado");
         }      
    }
}




