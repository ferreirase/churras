const bcrypt = require("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "usuarios",
      [
        {
          nome: "Administrador",
          email: "admin@gmail.com",
          ativo: true, 
          professor: false, 
          admin: true, 
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};