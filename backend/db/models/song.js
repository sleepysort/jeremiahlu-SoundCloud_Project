"use strict";
const { Data } = require("@react-google-maps/api");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(models.Comment, {
        foreignKey: "songId",
        onDelete: "CASCADE",
      });
      Song.belongsTo(models.User, { as: "Artist", foreignKey: "userId" });
      Song.belongsToMany(models.Playlist, {
        through: models.PlaylistSong,
        hooks: true,
        foreignKey: "songId",
      });
      Song.belongsTo(models.Album, { foreignKey: "albumId" });
    }
  }
  Song.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: DataTypes.STRING,
      url: {
        type: DataTypes.STRING,
      },
      previewImage: DataTypes.STRING,
      genre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Song",
      // freezeTableName: true,

      // defaultScope: {
      //   attributes: {
      //     exclude: [ "playlistSong", "createdAt", "updatedAt" ]
      //   }
      // },
    }
  );
  return Song;
};
