'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('medidas', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: "users",
                        key: 'id'
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                redondo: {
                    type: Sequelize.FLOAT
                },
                patilla_a_patilla: {
                    type: Sequelize.FLOAT
                },
                largo_de_frente: {
                    type: Sequelize.FLOAT
                },
                sien_a_sien: {
                    type: Sequelize.FLOAT
                },
                oreja_a_oreja_por_encima: {
                    type: Sequelize.FLOAT
                },
                anchura_del_cuello_superiror: {
                    type: Sequelize.FLOAT
                },
                oreja_a_oreja_por_nacimiento_pelo: {
                    type: Sequelize.FLOAT
                },
                anchura_cuello_inferior: {
                    type: Sequelize.FLOAT
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn("NOW")
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn("NOW")
                }
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('medidas');
        });
    }
};
