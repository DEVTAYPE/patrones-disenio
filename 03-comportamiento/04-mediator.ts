/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

class User {
  constructor(
    private userName: string,
    private chatRoom: ChatRoom,
  ) {
    chatRoom.addUser(this);
  }

  sendMessage(message: string) {
    console.log(`${this.userName} sends: ${message}`);
    this.chatRoom.sendMessage(message, this);
  }

  receiveMessage(message: string, sender: User) {
    console.log(
      `${this.userName} receives from ${sender.userName}: ${message}`,
    );
  }
}

class ChatRoom {
  private users: User[] = [];
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(message: string, sender: User) {
    const usersToSend = this.users.filter((user) => user !== sender);

    usersToSend.forEach((user) => {
      user.receiveMessage(message, sender);
    });
  }
}

// Uso del patrón mediator
function main() {
  const chatRoom = new ChatRoom("Grupo trabajo");

  const user1 = new User("Alice", chatRoom);
  const user2 = new User("Bob", chatRoom);
  const user3 = new User("Charlie", chatRoom);

  chatRoom.addUser(user1);
  chatRoom.addUser(user2);
  chatRoom.addUser(user3);

  user1.sendMessage("Hola a todos!");
  // user2.sendMessage("¡Hola Alice!");
  // user3.sendMessage("¡Hola Alice y Bob!");
}

main();
