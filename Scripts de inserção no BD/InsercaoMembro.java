import java.util.Random;

public class MembroDataGenerator {
    public static void main(String[] args) {
        Random random = new Random();

        String[] nomes = {"Lucca", "Diogo", "Camila", "Geff", "Junior", "Prof Ricardo"};
        String[] extensoesFoto = {"jpg", "png", "jpeg"};

        System.out.println("INSERT INTO Membro (nome, foto, ativo) VALUES");

        for (int i = 1; i <= 20; i++) {
            String nomeAleatorio = nomes[random.nextInt(nomes.length)];
            String fotoAleatoria = "foto" + i + "." + extensoesFoto[random.nextInt(extensoesFoto.length)];
            
            boolean ativo = random.nextBoolean();
            
            System.out.printf("('%s', '%s', %b)", nomeAleatorio, fotoAleatoria, ativo);
            
            if (i < 20) {
                System.out.print(",");
            }
            
            System.out.println();
        }
    }
}