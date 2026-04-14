class User {
  name: string = "";
  email: string = "";
  age: number | null = null;
  phone: string | null = null;
  isAdmin: boolean = false;

  buildJSON(): string {
    return JSON.stringify({
      name: this.name,
      email: this.email,
      age: this.age,
      phone: this.phone,
      isAdmin: this.isAdmin,
    });
  }

  displayInfo(): void {
    console.log(`%c${this.buildJSON()}`, "color: blue; font-weight: bold;");
  }
}

class UserBuilder {
  private user: User;

  constructor(userName: string, userEmail: string) {
    this.user = new User();
    this.user.name = userName;
    this.user.email = userEmail;
  }

  setAge(age: number): UserBuilder {
    this.user.age = age;
    return this;
  }

  setPhone(phone: string): UserBuilder {
    this.user.phone = phone;
    return this;
  }

  setAdmin(isAdmin: boolean): UserBuilder {
    this.user.isAdmin = isAdmin;
    return this;
  }

  build(): User {
    return this.user;
  }
}

function main() {
  const user1 = new UserBuilder("Alice", "alice@example.com")
    // .setAge(30)
    // .setPhone("123-456-7890")
    .setAdmin(true)
    .build();

  user1.displayInfo();
}

main();
