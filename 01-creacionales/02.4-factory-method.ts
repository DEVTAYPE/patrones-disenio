/* 
Ejercicio 2: Sistema de Pagos (Intermedio)

📝 Enunciado
Debes crear un sistema que procese pagos con:

- Tarjeta
- PayPal
- Cripto

Cada uno tiene lógica distinta:

- processPayment(amount)

🎯 Objetivo
- const payment = PaymentFactory.create("paypal");
- payment.processPayment(100);

⚠️ Requisitos extra
- Validar tipos no soportados
- Cada método debe simular comportamiento distinto
- Evitar if fuera de la factory

🧠 Mejora (opcional)

Haz que cada método tenga:

- comisión diferente
- validaciones propias
*/

interface IPayment {
  processTransaction(amount: number): void;
}

class CardPayment implements IPayment {
  processTransaction(amount: number): void {
    console.log(`Procesando pago con tarjeta por $${amount}`);
  }
}

class PayPalPayment implements IPayment {
  processTransaction(amount: number): void {
    console.log(`Procesando pago con PayPal por $${amount}`);
  }
}

class CryptoPayment implements IPayment {
  processTransaction(amount: number): void {
    console.log(`Procesando pago con Cripto por $${amount}`);
  }
}

class PaymentFactory {
  static create(type: "card" | "paypal" | "crypto"): IPayment {
    switch (type) {
      case "card":
        return new CardPayment();
      case "paypal":
        return new PayPalPayment();
      case "crypto":
        return new CryptoPayment();
      default:
        throw new Error("Tipo de pago no soportado");
    }
  }
}

function main() {
  const type = prompt("Ingrese el tipo de pago (card/paypal/crypto)");

  console.log({
    type,
  });

  const payment = PaymentFactory.create(type as any);
  payment.processTransaction(100);
}

main();
