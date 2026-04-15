/* 
Ejercicio 3: Sistema de Base de Datos (Avanzado 🔥)

📝 Enunciado
Debes soportar múltiples bases de datos:

- MySQL
- PostgreSQL
- MongoDB

Cada familia debe crear:

- Connection
- QueryBuilder
- Repository

🎯 Objetivo

- const factory = new PostgresFactory();

- const connection = factory.createConnection();
- const queryBuilder = factory.createQueryBuilder();
- const repo = factory.createRepository();

⚠️ Requisitos importantes

Cada DB tiene implementación distinta

Todo debe ser intercambiable sin romper código
No usar if en el cliente

💡 Ejemplo
repo.findAll();

👉 Debe funcionar diferente según la DB
🔥 Nivel PRO (muy recomendado)

- Que el QueryBuilder sea distinto (SQL vs NoSQL)
- Que el Repository use internamente el QueryBuilder
*/

// ==================
// CONTRATOS
// ==================

interface IConnection {
  connect(): void;
}

interface IQueryBuilder {
  buildFindAll(table: string): string | object;
}

interface IRepository {
  findAll(): any[];
}

// ==================
// IMPLEMENTACIONES MYSQL
// ==================

class MySQLConnection implements IConnection {
  connect(): void {
    console.log("Conectando a MySQL...");
  }
}

class MySQLQueryBuilder implements IQueryBuilder {
  buildFindAll(table: string): string {
    return `SELECT * FROM ${table}`;
  }
}

class MySQLRepository implements IRepository {
  constructor(
    private connection: IConnection,
    private qb: IQueryBuilder,
  ) {}

  findAll(): any[] {
    this.connection.connect();
    const query = this.qb.buildFindAll("users");
    console.log("MySQL ejecutando:", query);
    return [];
  }
}

// ==================
// IMPLEMENTACIONES POSTGRES
// ==================

class PostgresConnection implements IConnection {
  connect(): void {
    console.log("Conectando a PostgreSQL...");
  }
}

class PostgresQueryBuilder implements IQueryBuilder {
  buildFindAll(table: string): string {
    return `SELECT * FROM "${table}"`;
  }
}

class PostgresRepository implements IRepository {
  constructor(
    private connection: IConnection,
    private qb: IQueryBuilder,
  ) {}

  findAll(): any[] {
    this.connection.connect();
    const query = this.qb.buildFindAll("users");
    console.log("PostgreSQL ejecutando:", query);
    return [];
  }
}

// ==================
// IMPLEMENTACIONES MONGODB
// ==================

class MongoDBConnection implements IConnection {
  connect(): void {
    console.log("Conectando a MongoDB...");
  }
}

class MongoDBQueryBuilder implements IQueryBuilder {
  buildFindAll(collection: string): object {
    return { find: collection };
  }
}

class MongoDBRepository implements IRepository {
  constructor(
    private connection: IConnection,
    private qb: IQueryBuilder,
  ) {}

  findAll(): any[] {
    this.connection.connect();
    const query = this.qb.buildFindAll("users");
    console.log("MongoDB ejecutando:", query);
    return [];
  }
}

// ==================
// ABSTRACT FACTORY
// ==================

interface IDatabaseFactory {
  createConnection(): IConnection;
  createQueryBuilder(): IQueryBuilder;
  createRepository(): IRepository;
}

// ==================
// FACTORIES CON COMPOSICIÓN REAL
// ==================

class MySQLFactory implements IDatabaseFactory {
  createConnection(): IConnection {
    return new MySQLConnection();
  }

  createQueryBuilder(): IQueryBuilder {
    return new MySQLQueryBuilder();
  }

  createRepository(): IRepository {
    const connection = this.createConnection();
    const qb = this.createQueryBuilder();
    return new MySQLRepository(connection, qb);
  }
}

class PostgresFactory implements IDatabaseFactory {
  createConnection(): IConnection {
    return new PostgresConnection();
  }

  createQueryBuilder(): IQueryBuilder {
    return new PostgresQueryBuilder();
  }

  createRepository(): IRepository {
    const connection = this.createConnection();
    const qb = this.createQueryBuilder();
    return new PostgresRepository(connection, qb);
  }
}

class MongoDBFactory implements IDatabaseFactory {
  createConnection(): IConnection {
    return new MongoDBConnection();
  }

  createQueryBuilder(): IQueryBuilder {
    return new MongoDBQueryBuilder();
  }

  createRepository(): IRepository {
    const connection = this.createConnection();
    const qb = this.createQueryBuilder();
    return new MongoDBRepository(connection, qb);
  }
}

// ==================
// CLIENTE (TOTALMENTE DESACOPLADO)
// ==================

function main(factory: IDatabaseFactory) {
  const repo = factory.createRepository();
  repo.findAll();
}

// ==================
// USO
// ==================

console.log("=== MySQL ===");
main(new MySQLFactory());

console.log("\n=== PostgreSQL ===");
main(new PostgresFactory());

console.log("\n=== MongoDB ===");
main(new MongoDBFactory());
